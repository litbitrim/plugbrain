import { useMemo, useState } from 'react'

interface FileNodeData {
  id: string
  path: string
  label: string
  lang?: string | null
  loc?: number
  agent?: { id: string; name: string; color: string } | null
}

interface ExplorerProps {
  workspaceName: string
  files: FileNodeData[]
  activePath?: string | null
  onSelectFile: (path: string) => void
}

interface TreeNode {
  name: string
  path: string
  isDir: boolean
  children: Map<string, TreeNode>
  file?: FileNodeData
}

function buildTree(files: FileNodeData[]): TreeNode {
  const root: TreeNode = {
    name: '',
    path: '',
    isDir: true,
    children: new Map(),
  }

  for (const file of files) {
    const parts = file.path.split(/[\\/]/).filter(Boolean)
    let current = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1

      if (isLast) {
        current.children.set(part, {
          name: part,
          path: file.path,
          isDir: false,
          children: new Map(),
          file,
        })
      } else {
        let dirNode = current.children.get(part)
        if (!dirNode) {
          dirNode = {
            name: part,
            path: parts.slice(0, i + 1).join('/'),
            isDir: true,
            children: new Map(),
          }
          current.children.set(part, dirNode)
        }
        current = dirNode
      }
    }
  }

  return root
}

export default function ExplorerView({
  workspaceName,
  files,
  activePath,
  onSelectFile,
}: ExplorerProps) {
  const [filter, setFilter] = useState('')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const tree = useMemo(() => buildTree(files), [files])

  const toggleDir = (dirPath: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(dirPath)) next.delete(dirPath)
      else next.add(dirPath)
      return next
    })
  }

  const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
    if (node.isDir) {
      const isCollapsed = collapsed.has(node.path)
      const sortedChildren = Array.from(node.children.values()).sort((a, b) => {
        if (a.isDir !== b.isDir) return a.isDir ? -1 : 1
        return a.name.localeCompare(b.name)
      })

      // If filter active, only show dir if some children match
      const filteredChildren = filter
        ? sortedChildren.filter(c => c.path.toLowerCase().includes(filter.toLowerCase()))
        : sortedChildren

      if (filter && filteredChildren.length === 0 && !node.name.toLowerCase().includes(filter.toLowerCase())) {
        return null
      }

      return (
        <div key={node.path || 'root'} className="tree-dir-group">
          {node.name && (
            <div
              className={`tree-item tree-item--dir ${depth === 0 ? 'tree-item--root' : ''}`}
              style={{ paddingLeft: `${depth * 14 + 10}px` }}
              onClick={() => toggleDir(node.path)}
            >
              <span className="tree-icon">{isCollapsed ? '📁' : '📂'}</span>
              <span className="tree-label">{node.name}</span>
              <span className="tree-badge tree-badge--count">{node.children.size}</span>
            </div>
          )}
          {(!isCollapsed || filter) && (
            <div className="tree-dir-children">
              {filteredChildren.map(c => renderNode(c, node.name ? depth + 1 : depth))}
            </div>
          )}
        </div>
      )
    }

    // File item
    const isActive = activePath === node.path
    if (filter && !node.path.toLowerCase().includes(filter.toLowerCase())) {
      return null
    }

    return (
      <div
        key={node.path}
        className={`tree-item tree-item--file ${isActive ? 'tree-item--active' : ''}`}
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
        onClick={() => onSelectFile(node.path)}
        title={node.path}
      >
        <span className="tree-icon">📄</span>
        <span className="tree-label mono">{node.name}</span>
        {node.file?.lang && (
          <span className="tree-badge tree-badge--lang">{node.file.lang}</span>
        )}
        {node.file?.loc !== undefined && (
          <span className="tree-badge tree-badge--loc">{node.file.loc} L</span>
        )}
        {node.file?.agent && (
          <span
            className="tree-agent-dot"
            style={{ background: node.file.agent.color }}
            title={`Owner: ${node.file.agent.name}`}
          />
        )}
      </div>
    )
  }

  return (
    <div className="explorer-view">
      <div className="explorer-header">
        <div className="explorer-title">
          <span className="explorer-title__icon">🗂️</span>
          <strong>{workspaceName || 'Workspace'} Explorer</strong>
        </div>
        <div className="explorer-stats">
          <span>{files.length} Dateien aus Brain</span>
        </div>
      </div>

      <div className="explorer-search">
        <input
          type="text"
          placeholder="Dateibaum filtern …"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="explorer-search__input"
        />
        {filter && (
          <button type="button" className="explorer-search__clear" onClick={() => setFilter('')}>
            ✕
          </button>
        )}
      </div>

      <div className="explorer-tree">
        {files.length === 0 ? (
          <div className="explorer-empty">Keine Dateien im Snapshot vorhanden.</div>
        ) : (
          renderNode(tree)
        )}
      </div>
    </div>
  )
}

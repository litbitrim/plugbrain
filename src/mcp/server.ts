/**
 * PlugBrain Model Context Protocol (MCP) Stdio Server (M4).
 * Exposes the 13 core tools over JSON-RPC 2.0 with schema validation and auth.
 */
import type { DatabaseSync } from 'node:sqlite'
import type { Readable, Writable } from 'node:stream'
import * as access from '../access.ts'
import { buildContextPack } from '../chronicle.ts'
import * as coord from '../coord/index.ts'
import * as intel from '../intel/index.ts'
import { createAwarenessPort } from '../projections/awareness.ts'
import { mcpProvenance } from './provenance.ts'
import { backlinksOf, queryNotes, readNote, searchNotesWithLines } from '../notes/vault.ts'
import { planTask, planView } from '../plan.ts'
import { askQuestion } from '../ask/index.ts'

export interface McpServerOptions {
  db: DatabaseSync
  workspaceId?: string
  authKey?: string | null
  inStream?: Readable
  outStream?: Writable
}

export const MCP_TOOLS = [
  {
    name: 'search',
    description: 'Full-text search for code and symbols across the workspace',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term' },
        workspaceId: { type: 'string', description: 'Workspace ID (optional if server bound to workspace)' },
        agentId: { type: 'string', description: 'Agent ID attributing the search' },
        limit: { type: 'number', description: 'Max results (default 40)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'read',
    description: 'Read a file through PlugBrain with full access logging and attribution',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Workspace-relative path to read' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
        agentId: { type: 'string', description: 'Agent ID reading the file' },
      },
      required: ['path'],
    },
  },
  {
    name: 'context_pack',
    description: 'Generate goal-oriented context pack with files, symbols, and dependencies',
    inputSchema: {
      type: 'object',
      properties: {
        goal: { type: 'string', description: 'Task goal or query' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
        agentId: { type: 'string', description: 'Agent ID' },
        missionId: { type: 'string', description: 'Optional mission ID' },
      },
      required: ['goal'],
    },
  },
  {
    name: 'ask',
    description: 'Ask the project a question in plain language (German or English) and get one readable sentence with sources. Try this FIRST: it routes the question to the right tool (definition, usage, impact, changes, overview, notes, search) without you having to pick one.',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'The question as a human would ask it, e.g. "where is the brain home resolved?" or "was bricht, wenn ich X ändere"' },
        workspaceId: { type: 'string', description: 'Workspace ID (optional if server bound to workspace)' },
        limit: { type: 'number', description: 'Max sources (default 5, max 25)' },
      },
      required: ['question'],
    },
  },
  {
    name: 'query',
    description: 'Concept search across symbols and notes (Code Intelligence)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Concept query (e.g. gateway owner, stop flow)' },
        repoId: { type: 'string', description: 'Optional repo ID' },
        checkoutId: { type: 'string', description: 'Optional checkout ID' },
        workspaceId: { type: 'string', description: 'Optional workspace ID for an explicit revision vector' },
        limit: { type: 'number', description: 'Max results' },
      },
      required: ['query'],
    },
  },
  {
    name: 'context',
    description: '360-degree context of a symbol (callers, callees, and execution flows)',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Symbol name' },
        file: { type: 'string', description: 'Optional file hint' },
        repoId: { type: 'string', description: 'Optional repository hint' },
        checkoutId: { type: 'string', description: 'Optional checkout hint' },
        workspaceId: { type: 'string', description: 'Optional workspace ID for an explicit revision vector' },
      },
      required: ['name'],
    },
  },
  {
    name: 'impact',
    description: 'Blast radius analysis for a symbol or file (upstream, downstream, or both)',
    inputSchema: {
      type: 'object',
      properties: {
        target: { type: 'string', description: 'Target symbol name or file path' },
        direction: { type: 'string', enum: ['upstream', 'downstream', 'both'], description: 'Analysis direction' },
        maxDepth: { type: 'number', description: 'Depth 1..5 (default 3)' },
        repoId: { type: 'string', description: 'Optional repo ID' },
        checkoutId: { type: 'string', description: 'Optional checkout ID' },
        workspaceId: { type: 'string', description: 'Optional workspace ID for an explicit revision vector' },
      },
      required: ['target'],
    },
  },
  {
    name: 'detect_changes',
    description: 'Map git diff hunks to affected symbols and execution flows',
    inputSchema: {
      type: 'object',
      properties: {
        workspaceId: { type: 'string', description: 'Workspace ID (required when the server is not bound to one)' },
        diffText: { type: 'string', description: 'Unified diff text to analyze' },
        checkoutId: { type: 'string', description: 'Optional checkout ID' },
        checkoutPath: { type: 'string', description: 'Optional checkout path on disk' },
      },
    },
  },
  {
    name: 'cypher',
    description: 'Run a bounded Cypher-like graph query inside one registered workspace',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Cypher-like query or JSON graph DSL' },
        workspaceId: { type: 'string', description: 'Workspace ID (required when the server is not bound to one)' },
        limit: { type: 'number', description: 'Maximum rows (default 50)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'rename_preview',
    description: 'Read-only preview of a symbol rename; it never writes files',
    inputSchema: {
      type: 'object',
      properties: {
        newName: { type: 'string', description: 'Replacement identifier' },
        symbolId: { type: 'number', description: 'Exact indexed symbol ID' },
        name: { type: 'string', description: 'Symbol name when it is unambiguous in the selected scope' },
        repoId: { type: 'string', description: 'Optional repository scope' },
        checkoutId: { type: 'string', description: 'Optional checkout scope' },
        workspaceId: { type: 'string', description: 'Optional workspace ID for an explicit revision vector' },
      },
      required: ['newName'],
    },
  },
  {
    name: 'claim',
    description: 'Acquire mutual exclusion lease on paths or symbols with TTL and fencing epoch',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: { type: 'string', description: 'Claiming agent ID' },
        taskId: { type: 'string', description: 'Task ID' },
        paths: { type: 'array', items: { type: 'string' }, description: 'Workspace-relative paths to claim' },
        symbols: { type: 'array', items: { type: 'string' }, description: 'Symbol names to claim' },
        mode: { type: 'string', enum: ['write', 'read'], description: 'Claim mode (default write)' },
        ttlMs: { type: 'number', description: 'Lease TTL in milliseconds' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['agentId', 'taskId'],
    },
  },
  {
    name: 'release',
    description: 'Release a held lease',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: { type: 'string', description: 'Holding agent ID' },
        leaseId: { type: 'string', description: 'Lease ID to release' },
        taskId: { type: 'string', description: 'Task ID' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['agentId'],
    },
  },
  {
    name: 'awareness',
    description: 'Task awareness pack checking live claims, conflicts, and dependency overlaps',
    inputSchema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', description: 'Task ID' },
        intendedPaths: { type: 'array', items: { type: 'string' }, description: 'Paths task intends to touch' },
        agentId: { type: 'string', description: 'Agent ID' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
        mode: { type: 'string', enum: ['write', 'read'], description: 'Mode' },
      },
      required: ['taskId'],
    },
  },
  {
    name: 'inbox_read',
    description: 'Read agent messages with optional long-polling wait',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: { type: 'string', description: 'Recipient agent ID' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
        channel: { type: 'string', description: 'Optional channel or topic filter' },
        missionId: { type: 'string', description: 'Optional mission filter' },
        unreadOnly: { type: 'boolean', description: 'Filter unread messages' },
        waitMs: { type: 'number', description: 'Long-polling wait in ms (0 = immediate)' },
      },
      required: ['agentId'],
    },
  },
  {
    name: 'message_send',
    description: 'Send message to an agent inbox or topic channel',
    inputSchema: {
      type: 'object',
      properties: {
        fromAgent: { type: 'string', description: 'Sender agent ID' },
        toAgent: { type: 'string', description: 'Recipient agent ID' },
        channel: { type: 'string', description: 'Topic/mission channel' },
        missionId: { type: 'string', description: 'Mission ID' },
        subject: { type: 'string', description: 'Subject line' },
        body: { type: 'string', description: 'Message body' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['fromAgent', 'body'],
    },
  },
  {
    name: 'heartbeat',
    description: 'Send agent heartbeat to maintain active presence and prevent lease expiration',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: { type: 'string', description: 'Agent ID' },
        taskId: { type: 'string', description: 'Current active task ID' },
      },
      required: ['agentId'],
    },
  },
  {
    name: 'swarm_turn',
    description: 'Check in at a turn boundary. Returns unread messages, the next or claimed task and host admission. '
      + 'Call with phase=start when a turn begins and phase=end with a state when it ends.',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: { type: 'string', description: 'Registered worker ID' },
        phase: { type: 'string', enum: ['start', 'end'], description: 'Turn boundary' },
        state: { type: 'string', enum: ['needs-task', 'awaiting-commit', 'blocked', 'paused'], description: 'Why the turn ended' },
        summary: { type: 'string', description: 'What the turn did, in one or two lines' },
        claimNext: { type: 'boolean', description: 'Claim the next task this worker may take' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['agentId', 'phase'],
    },
  },
  {
    name: 'swarm_board',
    description: 'The fleet board: every worker with surface, account, turn state, unread messages, task, leases, '
      + 'worktrees and attention flags, plus host resources',
    inputSchema: {
      type: 'object',
      properties: {
        workspaceId: { type: 'string', description: 'Workspace ID' },
        git: { type: 'boolean', description: 'Read branch, HEAD and uncommitted files of every registered worktree' },
      },
    },
  },
  {
    name: 'swarm_resources',
    description: 'Host disk, RAM and CPU, reported account quotas, and whether there is room for test, build, install or worktree work',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'plan',
    description: 'The master ledger joined with the brain queue: progress, startable master tasks, one task with '
      + 'dependencies, gates and queued work, or the gate list',
    inputSchema: {
      type: 'object',
      properties: {
        view: { type: 'string', enum: ['status', 'next', 'task', 'gates'], description: 'What to return (default status)' },
        id: { type: 'string', description: 'Master task id for view=task, e.g. M12' },
        status: { type: 'string', description: 'Gate status filter for view=gates, e.g. OPEN' },
        limit: { type: 'number', description: 'Max tasks for view=next (default 10)' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
    },
  },
  {
    name: 'notes_search',
    description: 'Search the prose of the vault notes (the Obsidian replacement); optionally with the matching line',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words to find' },
        lines: { type: 'boolean', description: 'Return the line of the first match per note' },
        limit: { type: 'number', description: 'Max notes (default 20)' },
        agentId: { type: 'string', description: 'Agent ID attributing the reads' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['query'],
    },
  },
  {
    name: 'notes_read',
    description: 'Read one note with its properties, outgoing links and backlinks',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Planet-relative note path, e.g. Roadmap/Gates/R7.md' },
        agentId: { type: 'string', description: 'Agent ID attributing the read' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['path'],
    },
  },
  {
    name: 'notes_query',
    description: 'Property query over the notes, e.g. "typ=gate UND stand=offen"',
    inputSchema: {
      type: 'object',
      properties: {
        filter: { type: 'string', description: 'Property filter' },
        limit: { type: 'number', description: 'Max notes (default 200)' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['filter'],
    },
  },
  {
    name: 'notes_backlinks',
    description: 'Every note that links to this one',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Planet-relative note path' },
        workspaceId: { type: 'string', description: 'Workspace ID' },
      },
      required: ['path'],
    },
  },
] as const

interface JsonRpcRequest {
  jsonrpc: string
  id?: string | number | null
  method: string
  params?: Record<string, unknown>
}

export class McpServer {
  private readonly db: DatabaseSync
  private defaultWorkspaceId?: string
  private readonly authKey?: string | null
  private readonly inStream: Readable
  private readonly outStream: Writable
  private buffer = ''

  constructor(options: McpServerOptions) {
    this.db = options.db
    this.defaultWorkspaceId = options.workspaceId
    this.authKey = options.authKey ?? process.env.PLUG_BRAIN_AUTH_KEY ?? null
    this.inStream = options.inStream ?? process.stdin
    this.outStream = options.outStream ?? process.stdout
  }

  start(): void {
    this.inStream.setEncoding('utf8')
    this.inStream.on('data', (chunk: string) => {
      this.buffer += chunk
      this.processBuffer()
    })
  }

  private processBuffer(): void {
    while (true) {
      // Support Content-Length header or line-delimited JSON
      if (this.buffer.startsWith('Content-Length:')) {
        const headerEnd = this.buffer.indexOf('\r\n\r\n')
        if (headerEnd === -1) return
        const lenMatch = this.buffer.match(/Content-Length:\s*(\d+)/i)
        if (!lenMatch) {
          this.buffer = this.buffer.slice(headerEnd + 4)
          continue
        }
        const length = parseInt(lenMatch[1], 10)
        const totalLen = headerEnd + 4 + length
        if (this.buffer.length < totalLen) return
        const payload = this.buffer.slice(headerEnd + 4, totalLen)
        this.buffer = this.buffer.slice(totalLen)
        void this.handleRawMessage(payload)
      } else {
        const newlineIdx = this.buffer.indexOf('\n')
        if (newlineIdx === -1) return
        const line = this.buffer.slice(0, newlineIdx).trim()
        this.buffer = this.buffer.slice(newlineIdx + 1)
        if (line.length > 0) {
          void this.handleRawMessage(line)
        }
      }
    }
  }

  private async handleRawMessage(raw: string): Promise<void> {
    let req: JsonRpcRequest
    try {
      req = JSON.parse(raw)
    } catch {
      this.sendError(null, -32700, 'Parse error')
      return
    }

    try {
      await this.handleRequest(req)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      this.sendError(req.id ?? null, -32603, message)
    }
  }

  private sendResponse(id: string | number | null, result: unknown): void {
    if (id === null || id === undefined) return
    const msg = JSON.stringify({ jsonrpc: '2.0', id, result })
    this.outStream.write(msg + '\n')
  }

  private sendError(id: string | number | null, code: number, message: string, data?: unknown): void {
    if (id === null || id === undefined) return
    const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message, ...(data !== undefined ? { data } : {}) } })
    this.outStream.write(msg + '\n')
  }

  private checkAuth(args?: Record<string, unknown>): void {
    if (!this.authKey) return
    const provided = (args?.authKey as string | undefined) ?? process.env.PLUG_BRAIN_AUTH_KEY
    if (!provided || provided !== this.authKey) {
      throw new Error('Authentication failed: valid authKey required')
    }
  }

  private getWorkspaceId(args?: Record<string, unknown>): string {
    const ws = (args?.workspaceId as string | undefined) ?? this.defaultWorkspaceId
    if (!ws) {
      const rows = this.db.prepare('SELECT id FROM workspaces ORDER BY created_at LIMIT 2').all() as
        Array<{ id: string }>
      if (rows.length !== 1) {
        throw new Error(
          rows.length === 0
            ? 'workspaceId is required: no workspace is registered'
            : 'workspaceId is required: multiple workspaces are registered')
      }
      this.defaultWorkspaceId = rows[0].id
      return rows[0].id
    }
    access.requireWorkspace(this.db, ws)
    return ws
  }

  async handleRequest(req: JsonRpcRequest): Promise<void> {
    const { id = null, method, params } = req

    switch (method) {
      case 'initialize': {
        this.sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'plugbrain', version: '1.0.0' },
        })
        return
      }

      case 'notifications/initialized':
      case 'initialized': {
        return
      }

      case 'tools/list': {
        this.sendResponse(id, { tools: MCP_TOOLS })
        return
      }

      case 'tools/call': {
        const toolName = params?.name as string | undefined
        const args = (params?.arguments as Record<string, unknown>) ?? {}
        if (!toolName) {
          this.sendError(id, -32602, 'Missing tool name in tools/call')
          return
        }

        const result = await this.executeTool(toolName, args)
        this.sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          isError: !result.ok,
        })
        return
      }

      default: {
        this.sendError(id, -32601, `Method not found: ${method}`)
        return
      }
    }
  }

  async executeTool(name: string, args: Record<string, unknown>): Promise<{ ok: boolean; [key: string]: unknown }> {
    try {
      switch (name) {
        case 'search': {
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? 'mcp-agent')
          const query = String(args.query ?? '')
          const limit = Number(args.limit ?? 40)
          access.ensureAgent(this.db, agentId)
          const hits = access.search(this.db, ws, agentId, query, limit)
          return { ok: true, hits }
        }

        case 'read': {
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? 'mcp-agent')
          const path = String(args.path ?? '')
          access.ensureAgent(this.db, agentId)
          const file = access.readFile(this.db, ws, agentId, path)
          return { ok: true, ...file }
        }

        case 'context_pack': {
          const ws = this.getWorkspaceId(args)
          const goal = String(args.goal ?? '')
          const agentId = args.agentId ? String(args.agentId) : undefined
          const missionId = args.missionId ? String(args.missionId) : undefined
          if (agentId) access.ensureAgent(this.db, agentId)
          const pack = buildContextPack(this.db, ws, goal, { agentId, missionId })
          return { ok: true, ...pack }
        }

        case 'ask': {
          const workspaceId = this.getWorkspaceId(args)
          const question = String(args.question ?? args.q ?? '').trim()
          if (!question) return { ok: false, error: 'question parameter required' }
          const limit = args.limit ? Number(args.limit) : 5
          return { ok: true, ...askQuestion(this.db, { workspaceId, question, limit }) }
        }

        case 'query': {
          const workspaceId = this.getWorkspaceId(args)
          const query = String(args.query ?? '')
          const repoId = args.repoId ? String(args.repoId) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const limit = args.limit ? Number(args.limit) : 25
          const result = intel.conceptSearch(this.db, query, { workspaceId, repoId, checkoutId, limit })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'context': {
          const workspaceId = this.getWorkspaceId(args)
          const symName = String(args.name ?? '')
          const file = args.file ? String(args.file) : undefined
          const repoId = args.repoId ? String(args.repoId) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const result = intel.getSymbolContext(this.db, symName, { workspaceId, file, repoId, checkoutId })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'impact': {
          const workspaceId = this.getWorkspaceId(args)
          const target = String(args.target ?? '')
          const direction = (args.direction as 'upstream' | 'downstream' | 'both') ?? 'both'
          const maxDepth = Number(args.maxDepth ?? 3)
          const repoId = args.repoId ? String(args.repoId) : undefined
          const result = intel.getBlastRadius(this.db, target, { workspaceId, direction, maxDepth, repoId })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'detect_changes': {
          const workspaceId = this.getWorkspaceId(args)
          const diffText = args.diffText ? String(args.diffText) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const checkoutPath = args.checkoutPath ? String(args.checkoutPath) : undefined
          const result = intel.detectChanges(this.db, {
            workspaceId, diffText, checkoutId, checkoutPath,
          })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'cypher': {
          const workspaceId = this.getWorkspaceId(args)
          const query = args.query as string | intel.JsonGraphQuery
          const limit = args.limit ? Number(args.limit) : undefined
          const result = intel.executeCypherQuery(this.db, query, { limit, workspaceId })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'rename_preview': {
          const workspaceId = this.getWorkspaceId(args)
          const newName = String(args.newName ?? '')
          const symbolId = typeof args.symbolId === 'number' ? args.symbolId : undefined
          const symbolName = args.name ? String(args.name) : undefined
          const repoId = args.repoId ? String(args.repoId) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const result = intel.previewRename(this.db, newName, { workspaceId, symbolId, name: symbolName, repoId, checkoutId })
          return { ok: true, result, provenance: mcpProvenance(this.db, name, { ...args, workspaceId }) }
        }

        case 'claim': {
          this.checkAuth(args)
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? '')
          if (agentId) access.ensureAgent(this.db, agentId)
          const taskId = String(args.taskId ?? `task-${agentId}`)
          const paths = Array.isArray(args.paths) ? args.paths.map(String) : []
          const symbols = Array.isArray(args.symbols) ? args.symbols.map(String) : []
          const mode = args.mode === 'read' ? 'read' : 'write'
          const ttlMs = typeof args.ttlMs === 'number' ? args.ttlMs : undefined

          const result = coord.acquireLease(this.db, ws, { agentId, taskId, paths, symbols, mode, ttlMs })
          if (!result.acquired && result.conflict) {
            return { ok: false, error: 'claim conflict', conflict: result.conflict }
          }
          return { ok: true, lease: result.lease }
        }

        case 'release': {
          this.checkAuth(args)
          const agentId = String(args.agentId ?? '')
          if (agentId) access.ensureAgent(this.db, agentId)
          const leaseId = args.leaseId ? String(args.leaseId) : undefined
          const taskId = args.taskId ? String(args.taskId) : undefined
          const ws = args.workspaceId ? String(args.workspaceId) : undefined
          const result = coord.releaseLease(this.db, { leaseId, agentId, taskId, workspaceId: ws })
          return { ok: true, ...result }
        }

        case 'awareness': {
          const ws = this.getWorkspaceId(args)
          const taskId = String(args.taskId ?? '')
          const agentId = args.agentId ? String(args.agentId) : undefined
          if (agentId) access.ensureAgent(this.db, agentId)
          const intendedPaths = Array.isArray(args.intendedPaths) ? args.intendedPaths.map(String) : []
          const mode = args.mode === 'read' ? 'read' : 'write'
          const port = createAwarenessPort(this.db)
          const pack = port({ workspaceId: ws, taskId, agentId, intendedPaths, mode })
          return { ok: true, pack }
        }

        case 'inbox_read': {
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? '')
          if (agentId) access.ensureAgent(this.db, agentId)
          const channel = args.channel ? String(args.channel) : undefined
          const missionId = args.missionId ? String(args.missionId) : undefined
          const unreadOnly = Boolean(args.unreadOnly)
          const waitMs = typeof args.waitMs === 'number' ? args.waitMs : 0
          const messages = await coord.readInbox(this.db, { workspaceId: ws, agentId, channel, missionId, unreadOnly, waitMs })
          return { ok: true, messages }
        }

        case 'message_send': {
          this.checkAuth(args)
          const ws = this.getWorkspaceId(args)
          const fromAgent = String(args.fromAgent ?? '')
          if (fromAgent) access.ensureAgent(this.db, fromAgent)
          const toAgent = args.toAgent ? String(args.toAgent) : null
          if (toAgent) access.ensureAgent(this.db, toAgent)
          const channel = args.channel ? String(args.channel) : null
          const missionId = args.missionId ? String(args.missionId) : null
          const subject = args.subject ? String(args.subject) : ''
          const body = String(args.body ?? '')
          const message = coord.sendMessage(this.db, { workspaceId: ws, fromAgent, toAgent, channel, missionId, subject, body })
          return { ok: true, message }
        }

        case 'heartbeat': {
          const agentId = String(args.agentId ?? '')
          if (agentId) access.ensureAgent(this.db, agentId)
          const taskId = args.taskId ? String(args.taskId) : undefined
          const hb = coord.heartbeatAgent(this.db, agentId, taskId)
          return { ok: true, ...hb }
        }

        case 'swarm_turn': {
          this.checkAuth(args)
          const phase = args.phase === 'end' ? 'end' : args.phase === 'start' ? 'start' : null
          if (phase === null) return { ok: false, error: 'phase must be start or end' }
          const ping = coord.recordTurn(this.db, {
            workspaceId: this.getWorkspaceId(args),
            agentId: String(args.agentId ?? ''),
            phase,
            state: args.state ? String(args.state) as coord.TurnEndState : undefined,
            summary: args.summary ? String(args.summary) : undefined,
            claimNext: args.claimNext === true,
          })
          return { ok: true, ping }
        }

        case 'swarm_board': {
          const board = coord.agentsBoard(this.db, this.getWorkspaceId(args), { gitStatus: args.git === true })
          return { ok: true, board }
        }

        case 'swarm_resources': {
          const host = coord.hostSnapshot()
          return {
            ok: true,
            host,
            quotas: coord.listQuotas(this.db),
            admission: coord.WORK_KINDS.map(kind => coord.admitWork(kind, host)),
          }
        }

        case 'plan': {
          const ws = this.getWorkspaceId(args)
          const view = String(args.view ?? 'status')
          if (view === 'task') return { ok: true, task: planTask(this.db, ws, String(args.id ?? '')) }
          const plan = planView(this.db, ws)
          if (view === 'next') return { ok: true, next: plan.next.slice(0, Number(args.limit ?? 10)) }
          if (view === 'gates') {
            const status = args.status === undefined ? null : String(args.status)
            return { ok: true, gates: status === null ? plan.gates : plan.gates.filter(gate => gate.status === status) }
          }
          // The status view drops the per-task detail; `task` and `next` carry it.
          return {
            ok: true,
            ledger: plan.ledger,
            progress: plan.progress,
            tasksByStatus: plan.tasksByStatus,
            gatesByStatus: plan.gatesByStatus,
            next: plan.next.slice(0, 10).map(task => ({ id: task.id, title: task.title, status: task.status, queue: task.queue })),
            openDecisions: plan.openDecisions,
            dimensions: plan.dimensions,
            unplanned: plan.unplanned,
          }
        }

        case 'notes_search': {
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? 'mcp-agent')
          access.ensureAgent(this.db, agentId)
          return {
            ok: true,
            ...searchNotesWithLines(this.db, ws, agentId, String(args.query ?? ''), {
              limit: Number(args.limit ?? 20), lines: args.lines === true,
            }),
          }
        }

        case 'notes_read': {
          const ws = this.getWorkspaceId(args)
          const agentId = String(args.agentId ?? 'mcp-agent')
          access.ensureAgent(this.db, agentId)
          return { ok: true, note: readNote(this.db, ws, agentId, String(args.path ?? '')) }
        }

        case 'notes_query': {
          const ws = this.getWorkspaceId(args)
          return { ok: true, ...queryNotes(this.db, ws, String(args.filter ?? ''), { limit: Number(args.limit ?? 200) }) }
        }

        case 'notes_backlinks': {
          const ws = this.getWorkspaceId(args)
          return { ok: true, backlinks: backlinksOf(this.db, ws, String(args.path ?? '')) }
        }

        default:
          return { ok: false, error: `Unknown tool: ${name}` }
      }
    } catch (err: unknown) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) }
    }
  }
}

export function startMcpServer(options: McpServerOptions): McpServer {
  const server = new McpServer(options)
  server.start()
  return server
}

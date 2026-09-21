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
    name: 'query',
    description: 'Concept search across symbols and notes (Code Intelligence)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Concept query (e.g. gateway owner, stop flow)' },
        repoId: { type: 'string', description: 'Optional repo ID' },
        checkoutId: { type: 'string', description: 'Optional checkout ID' },
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

        case 'query': {
          const query = String(args.query ?? '')
          const repoId = args.repoId ? String(args.repoId) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const limit = args.limit ? Number(args.limit) : 25
          const result = intel.conceptSearch(this.db, query, { repoId, checkoutId, limit })
          return { ok: true, result }
        }

        case 'context': {
          const symName = String(args.name ?? '')
          const file = args.file ? String(args.file) : undefined
          const repoId = args.repoId ? String(args.repoId) : undefined
          const result = intel.getSymbolContext(this.db, symName, { file, repoId })
          return { ok: true, result }
        }

        case 'impact': {
          const target = String(args.target ?? '')
          const direction = (args.direction as 'upstream' | 'downstream' | 'both') ?? 'both'
          const maxDepth = Number(args.maxDepth ?? 3)
          const repoId = args.repoId ? String(args.repoId) : undefined
          const result = intel.getBlastRadius(this.db, target, { direction, maxDepth, repoId })
          return { ok: true, result }
        }

        case 'detect_changes': {
          const workspaceId = this.getWorkspaceId(args)
          const diffText = args.diffText ? String(args.diffText) : undefined
          const checkoutId = args.checkoutId ? String(args.checkoutId) : undefined
          const checkoutPath = args.checkoutPath ? String(args.checkoutPath) : undefined
          const result = intel.detectChanges(this.db, {
            workspaceId, diffText, checkoutId, checkoutPath,
          })
          return { ok: true, result }
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

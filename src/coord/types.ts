/**
 * Types and contracts for Swarm Coordination (M4).
 */

export type PresenceState = 'active' | 'idle' | 'dead'

export interface AgentRegistration {
  id: string
  name: string
  color: string
  hue: number
  model?: string | null
  host?: string | null
  workspaceId: string
  checkoutId?: string | null
  taskId?: string | null
  missionId?: string | null
  lastHeartbeat: string
  heartbeatTtlMs: number
  presence: PresenceState
  isExpired: boolean
}

export interface Lease {
  id: string
  workspaceId: string
  agentId: string
  taskId: string
  paths: string[]
  symbols: string[]
  mode: 'write' | 'read'
  epoch: number
  createdAt: string
  expiresAt: string
  releasedAt: string | null
  ttlMs: number
  isExpired: boolean
}

export interface AcquireLeaseResult {
  acquired: boolean
  lease?: Lease
  conflict?: {
    holder: {
      agentId: string
      taskId: string
      claimedAt: string
      lastHeartbeat: string
    }
    path?: string
    symbol?: string
    reason: string
  }
}

export interface InboxMessage {
  id: string
  workspaceId: string
  fromAgent: string
  toAgent?: string | null
  channel?: string | null
  subject: string
  body: string
  createdAt: string
  deliveredAt: string | null
  readAt: string | null
}

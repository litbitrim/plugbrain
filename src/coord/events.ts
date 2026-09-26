/**
 * Real-time event bus for PlugBrain coordination (M4).
 * Powers SSE live stream (/api/live/events) and inbox long-polling.
 */
import { EventEmitter } from 'node:events'
import type { InboxMessage } from './types.ts'

export interface LiveEventPayload {
  type: string
  data: unknown
  timestamp: string
}

class CoordEventBus extends EventEmitter {
  constructor() {
    super()
    this.setMaxListeners(500)
  }

  emitLive(type: string, data: unknown): void {
    const payload: LiveEventPayload = {
      type,
      data,
      timestamp: new Date().toISOString(),
    }
    this.emit('live', payload)
    this.emit(`event:${type}`, payload)
  }

  onLive(listener: (event: LiveEventPayload) => void): () => void {
    this.on('live', listener)
    return () => this.off('live', listener)
  }

  notifyInbox(msg: InboxMessage): void {
    this.emitLive('message.sent', msg)
    if (msg.toAgent) {
      this.emit(`inbox:${msg.toAgent}`, msg)
    }
    if (msg.channel) {
      this.emit(`channel:${msg.channel}`, msg)
    }
  }

  waitForMessage(agentId: string, channel?: string | null, timeoutMs = 5000): Promise<InboxMessage | null> {
    if (timeoutMs <= 0) return Promise.resolve(null)

    return new Promise((resolve) => {
      let settled = false

      const cleanup = () => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        this.off(`inbox:${agentId}`, onMsg)
        if (channel) {
          this.off(`channel:${channel}`, onMsg)
        }
      }

      const onMsg = (msg: InboxMessage) => {
        cleanup()
        resolve(msg)
      }

      const timer = setTimeout(() => {
        cleanup()
        resolve(null)
      }, timeoutMs)

      this.once(`inbox:${agentId}`, onMsg)
      if (channel) {
        this.once(`channel:${channel}`, onMsg)
      }
    })
  }
}

export const coordEvents = new CoordEventBus()

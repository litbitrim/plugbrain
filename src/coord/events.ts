/**
 * Real-time event bus for PlugBrain coordination (M4).
 * Powers SSE live stream (/api/live/events) and inbox long-polling.
 *
 * Every event carries a monotonic `id` and the last few hundred stay in a
 * bounded replay buffer. A consumer that reconnects with `Last-Event-ID` (or a
 * fresh process that starts with a persisted cursor) replays what it missed
 * instead of silently sleeping through it.
 */
import { EventEmitter } from 'node:events'
import type { InboxMessage } from './types.ts'

export interface LiveEventPayload {
  id: number
  type: string
  data: unknown
  timestamp: string
}

/** How many recent events are kept for resume. Bounded so a busy brain cannot grow without limit. */
const REPLAY_LIMIT = 500

export class CoordEventBus extends EventEmitter {
  private sequence = 0
  private readonly replayBuffer: LiveEventPayload[] = []

  constructor() {
    super()
    this.setMaxListeners(500)
  }

  emitLive(type: string, data: unknown): LiveEventPayload {
    const payload: LiveEventPayload = {
      id: ++this.sequence,
      type,
      data,
      timestamp: new Date().toISOString(),
    }
    this.replayBuffer.push(payload)
    if (this.replayBuffer.length > REPLAY_LIMIT) {
      this.replayBuffer.splice(0, this.replayBuffer.length - REPLAY_LIMIT)
    }
    this.emit('live', payload)
    this.emit(`event:${type}`, payload)
    return payload
  }

  /** The most recent id handed out; a cursor can start here to watch only new events. */
  latestEventId(): number {
    return this.sequence
  }

  /**
   * Events still in the buffer after `lastEventId`. A missing or non-numeric
   * cursor replays the whole buffer; a stale cursor simply gets what is kept.
   */
  replaySince(lastEventId: string | number | null | undefined): LiveEventPayload[] {
    const since = typeof lastEventId === 'number' ? lastEventId : Number(lastEventId)
    if (!Number.isFinite(since)) return [...this.replayBuffer]
    return this.replayBuffer.filter(event => event.id > since)
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

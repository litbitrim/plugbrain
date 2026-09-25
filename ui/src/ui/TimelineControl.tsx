import { Icon, ICON } from './Icon'

/** Positions on the scrubber; the last one means "now". */
export const TIMELINE_STEPS = 60

export interface Timeline {
  playing: boolean
  /** 0..TIMELINE_STEPS position of the scrubber. */
  step: number
  label: string
  onTogglePlay(): void
  onScrub(step: number): void
}

/** Play the index's growth, or pin the views to a past moment. */
export function TimelineControl({ timeline }: { timeline: Timeline }) {
  return (
    <div className="pb-timeline">
      <button type="button" className="pb-tool pb-tool--icon" onClick={timeline.onTogglePlay}
        aria-label={timeline.playing ? 'Wachstum anhalten' : 'Wachstum abspielen'}
        title={timeline.playing ? 'Anhalten' : 'Wachstum abspielen'}>
        <Icon path={timeline.playing ? ICON.pause : ICON.play} />
      </button>
      <input type="range" min={0} max={TIMELINE_STEPS} step={1} value={timeline.step}
        aria-label="Zeitpunkt des Index" aria-valuetext={timeline.label}
        onChange={event => timeline.onScrub(Number(event.target.value))} />
      <span className="pb-timeline__label pb-num">{timeline.label}</span>
    </div>
  )
}

/**
 * The interface's one icon family: 16px grid, 1.5px stroke, round joins,
 * currentColor. Emoji were used before; they render differently per platform
 * and cannot follow the theme.
 */
export function Icon({ path, label }: { path: string; label?: string }) {
  return (
    <svg className="pb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden={label ? undefined : true} role={label ? 'img' : undefined}>
      {label && <title>{label}</title>}
      <path d={path} />
    </svg>
  )
}

export const ICON = {
  search: 'M7 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM10.5 10.5 14 14',
  fit: 'M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10',
  minus: 'M3.5 8h9',
  plus: 'M8 3.5v9M3.5 8h9',
  play: 'M5 3.5v9l7-4.5-7-4.5Z',
  pause: 'M5.5 3.5v9M10.5 3.5v9',
  close: 'M4 4l8 8M12 4l-8 8',
  open: 'M9 3h4v4M13 3 7.5 8.5M11.5 9.5V13H3V4.5h3.5',
  centre: 'M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  chevron: 'M4.5 6.5 8 10l3.5-3.5',
  keyboard: 'M2 4.5h12v7H2zM4.5 7h.01M7 7h.01M9.5 7h.01M12 7h.01M5 9.5h6',
  key: 'M10 6a3 3 0 1 1-2.1 5.1L2.5 16M5.5 13l1.5 1.5M4 14.5l1 1M10 6h.01',
  folder: 'M2 4.5h4l1.5 1.5H14v6.5H2z',
  refresh: 'M13 8a5 5 0 1 1-1.5-3.5M13 2.5v3h-3',
  burger: 'M2 4h12M2 8h12M2 12h12',
} as const

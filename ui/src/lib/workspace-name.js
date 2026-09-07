/**
 * One rule for turning a workspace name into something a human reads.
 *
 * A workspace's stored name should already be a folder name, but rows
 * registered before the separator fix carry their whole canonical path as the
 * name. Every surface that prints a workspace goes through here so the header
 * and the city district can never disagree about what a workspace is called.
 *
 * The separator class must contain the backslash: `[\/]` is a class of one
 * forward slash, so a Windows root splits on nothing and the full path
 * survives — the exact bug that put `C:\PLUG\ws-root\...` on screen twice.
 */
export function folderName(value) {
  if (typeof value !== 'string' || value === '') return value;
  const parts = value.split(/[\\/]/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : value;
}

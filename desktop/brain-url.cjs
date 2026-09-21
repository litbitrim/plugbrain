const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]', '::1']);

const DEFAULT_BRAIN_ENDPOINT = 'http://127.0.0.1:4310';

function localCoreOrigin(endpoint = DEFAULT_BRAIN_ENDPOINT) {
  const configured = new URL(endpoint);
  if (configured.protocol !== 'http:' || !LOOPBACK_HOSTS.has(configured.hostname)) {
    throw new Error('PlugBrain desktop may only load the local Core endpoint');
  }
  return configured.origin;
}

/**
 * Build the desktop's local Core URL without carrying credentials or a stale
 * workspace identity in the launcher source. The Core serves its own local
 * session bootstrap; this wrapper must never duplicate that credential in a
 * URL or renderer storage.
 */
function brainDesktopUrl({
  endpoint = DEFAULT_BRAIN_ENDPOINT,
  workspaceRoot = process.env.PLUGBRAIN_WORKSPACE_ROOT,
} = {}) {
  // Deliberately reconstruct the URL: query/hash/userinfo from any legacy
  // launcher configuration cannot leak a token into navigation history.
  const target = new URL(`${localCoreOrigin(endpoint)}/`);
  const root = typeof workspaceRoot === 'string' ? workspaceRoot.trim() : '';
  if (root !== '') target.searchParams.set('workspaceRoot', root);
  return target.toString();
}

/**
 * Electron must apply the local-Core boundary to redirects and link
 * navigation too, not only to the first loadURL call.
 */
function isAllowedBrainNavigation(candidate, { endpoint = DEFAULT_BRAIN_ENDPOINT } = {}) {
  try {
    const target = new URL(candidate);
    return target.username === '' && target.password === '' && target.origin === localCoreOrigin(endpoint);
  } catch {
    return false;
  }
}

/** Event adapter kept pure enough to verify Electron's deny path without Electron. */
function guardBrainNavigation(event, candidate, options) {
  const allowed = isAllowedBrainNavigation(candidate, options);
  if (!allowed) event.preventDefault();
  return allowed;
}

module.exports = {
  DEFAULT_BRAIN_ENDPOINT,
  brainDesktopUrl,
  guardBrainNavigation,
  isAllowedBrainNavigation,
};

const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { brainDesktopUrl, guardBrainNavigation, isAllowedBrainNavigation } = require('./brain-url.cjs');

test('desktop uses the local Core root without a credential in the URL', () => {
  assert.equal(brainDesktopUrl(), 'http://127.0.0.1:4310/');
});

test('desktop passes an explicit workspace root as a root, not a Core id', () => {
  const target = new URL(brainDesktopUrl({ workspaceRoot: 'C:\\PLUG\\plugpt' }));
  assert.equal(target.searchParams.get('workspaceRoot'), 'C:\\PLUG\\plugpt');
  assert.equal(target.searchParams.has('workspace'), false);
});

test('legacy endpoint query data is discarded before navigation', () => {
  const target = new URL(brainDesktopUrl({ endpoint: 'http://127.0.0.1:4310/atlas/?legacy=value#old' }));
  assert.equal(target.pathname, '/');
  assert.equal(target.search, '');
  assert.equal(target.hash, '');
});

test('desktop refuses a non-local Core endpoint', () => {
  assert.throws(
    () => brainDesktopUrl({ endpoint: 'https://example.invalid/brain' }),
    /local Core endpoint/,
  );
});

test('navigation remains confined to the configured local Core origin', () => {
  assert.equal(isAllowedBrainNavigation('http://127.0.0.1:4310/city'), true);
  assert.equal(isAllowedBrainNavigation('http://127.0.0.1:4311/'), false);
  assert.equal(isAllowedBrainNavigation('http://not-a-credential@127.0.0.1:4310/'), false);
  assert.equal(isAllowedBrainNavigation('https://example.invalid/'), false);
  assert.equal(isAllowedBrainNavigation('not a url'), false);
});

test('redirect and navigation handlers actively deny an external target', () => {
  let prevented = 0;
  const event = { preventDefault: () => { prevented += 1; } };
  assert.equal(guardBrainNavigation(event, 'https://example.invalid/'), false);
  assert.equal(prevented, 1);
  assert.equal(guardBrainNavigation(event, 'http://127.0.0.1:4310/atlas'), true);
  assert.equal(prevented, 1);
});

test('desktop launcher fails closed rather than adopting an unrelated Core', () => {
  const launcher = readFileSync(join(__dirname, 'launch.cmd'), 'utf8');
  assert.match(launcher, /dist\\plugbrain\.mjs/);
  assert.match(launcher, /dist\\node\.exe/);
  assert.doesNotMatch(launcher, /Get-Command node/);
  assert.match(launcher, /TcpListener/);
  assert.match(launcher, /PLUGBRAIN_CORE_PID/);
  assert.match(launcher, /OwningProcess -eq \$pid/);
  assert.match(launcher, /\[char\]34 \+ \$env:PLUGBRAIN_BUNDLE \+ \[char\]34/);
  assert.match(launcher, /http:\/\/127\.0\.0\.1:4310\//);
  assert.doesNotMatch(launcher, /serve %\*/);
  assert.doesNotMatch(launcher, /PlugPT-Shell|electron\\dist/i);
});

test('the launcher quoting form keeps a spaced Core bundle as one Node argument', () => {
  const expression = [
    "$bundle = 'C:\\Program Files\\PlugBrain\\dist\\plugbrain.mjs'",
    "$bundleArgument = [string][char]34 + $bundle + [char]34",
    "$bundleArgument",
  ].join('; ');
  const probe = spawnSync('powershell', ['-NoProfile', '-Command', expression], { encoding: 'utf8' });
  assert.equal(probe.status, 0, probe.stderr);
  assert.equal(probe.stdout.trim(), '"C:\\Program Files\\PlugBrain\\dist\\plugbrain.mjs"');
});

test('PowerShell Start-Process delivers the quoted spaced bundle as one actual Node argv entry', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-launcher-'));
  const probeScript = join(dir, 'argv-probe.cjs');
  const probeOutput = join(dir, 'argv.json');
  const bundle = 'C:\\Program Files\\PlugBrain\\dist\\plugbrain.mjs';
  const quoteForPowerShell = (value) => value.replaceAll("'", "''");
  writeFileSync(probeScript, 'process.stdout.write(JSON.stringify(process.argv.slice(2)));');
  const expression = [
    `$node = '${quoteForPowerShell(process.execPath)}'`,
    `$script = '${quoteForPowerShell(probeScript)}'`,
    `$output = '${quoteForPowerShell(probeOutput)}'`,
    `$bundle = '${quoteForPowerShell(bundle)}'`,
    '$bundleArgument = [string][char]34 + $bundle + [char]34',
    "$child = Start-Process -FilePath $node -ArgumentList @($script, $bundleArgument, 'serve') -NoNewWindow -PassThru -RedirectStandardOutput $output",
    '$child.WaitForExit()',
    'Get-Content -LiteralPath $output -Raw',
  ].join('; ');
  try {
    const probe = spawnSync('powershell', ['-NoProfile', '-Command', expression], { encoding: 'utf8' });
    assert.equal(probe.status, 0, probe.stderr);
    assert.deepEqual(JSON.parse(probe.stdout), [bundle, 'serve']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the NSIS source refuses arbitrary folders and never recursively removes them', () => {
  const nsis = readFileSync(join(__dirname, 'PlugBrain.nsi'), 'utf8');
  const packager = readFileSync(join(__dirname, '..', 'scripts', 'package-nsis.mjs'), 'utf8');
  assert.match(nsis, /Function \.onVerifyInstDir/);
  assert.match(nsis, /\.plugbrain-install\.marker/);
  assert.match(nsis, /Choose a new empty folder/);
  assert.match(nsis, /IfFileExists "\$INSTDIR\\\.plugbrain-install\.marker" 0 \+2/);
  assert.match(nsis, /IfFileExists "\$INSTDIR\\\*\.\*" 0 \+2/);
  assert.match(nsis, /Delete "\$INSTDIR\\dist\\node\.exe"/);
  assert.match(nsis, /IfFileExists "\$INSTDIR\\\.plugbrain-install\.marker" \+2 0/);
  assert.match(nsis, /IfFileExists "\$INSTDIR\\dist\\node\.exe" 0 \+2/);
  assert.match(nsis, /PlugBrain Core is still running or its runtime is locked/);
  assert.match(nsis, /!include "\.\.\\release\\PlugBrain-owned-files\.nsh"/);
  assert.doesNotMatch(nsis, /RMDir \/r/);
  assert.match(packager, /PlugBrain-owned-files\.nsh/);
  assert.match(packager, /\.provenance\.json/);
  assert.match(packager, /UNSIGNED_NOT_FOR_PUBLIC_RELEASE/);
  assert.match(packager, /captureSourceState/);
  assert.match(packager, /dirtyPorcelainSha256/);
  assert.match(packager, /node\.exe is deleted and verified separately/);
  assert.match(packager, /process\.arch !== 'x64'/);
  assert.match(
    readFileSync(join(__dirname, '..', 'scripts', 'build-standalone.mjs'), 'utf8'),
    /rmSync\(uiOut, \{ recursive: true, force: true \}\)/,
  );
});

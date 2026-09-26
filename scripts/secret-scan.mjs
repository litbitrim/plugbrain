#!/usr/bin/env node
/**
 * Secret scan over every git-tracked file in this repository.
 *
 * Fails (exit code 1) when any file content looks like a real credential:
 * API keys (OpenAI-style `sk-`, GitHub `ghp_`/`github_pat_`, NVIDIA `nvapi-`,
 * Google `AIza`, Slack `xox`), private key blocks, or typical `.env` content.
 * Comment lines in source files are skipped so detection patterns and docs
 * that legitimately name these prefixes do not cause false positives.
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const REPO_ROOT = process.cwd()

// Every tracked file, one per line. NUL-safe enough for plain repo paths.
const trackedFiles = execSync('git ls-files -z', { cwd: REPO_ROOT, maxBuffer: 64 * 1024 * 1024 })
  .toString('utf8')
  .split('\0')
  .filter(Boolean)

// File types that legitimately discuss credential prefixes (detection code,
// security docs). For these, comment lines starting with // or # are ignored.
const CODEISH = /\.(ts|tsx|js|mjs|cjs|json|md)$/i

const KEY_PATTERNS = [
  [/\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g, 'OpenAI-style key'],
  [/\bghp_[A-Za-z0-9]{36,}\b/g, 'GitHub personal access token'],
  [/\bgithub_pat_[A-Za-z0-9_]{20,}\b/g, 'GitHub fine-grained token'],
  [/\bnvapi-[A-Za-z0-9_-]{20,}\b/g, 'NVIDIA API key'],
  [/\bAIza[0-9A-Za-z_-]{35,}\b/g, 'Google API key'],
  [/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g, 'Slack token'],
  [/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, 'private key block'],
]

// Lines that obviously assign secrets in dotenv style, e.g. FOO=ghp_xxx
const ENV_LINE_PATTERN = /^\s*[A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Z0-9_]*\s*=\s*\S+/

// Comment lines: they name patterns instead of containing real credentials.
const COMMENT_LINE = /^\s*(?:\/\/|#|\*|\/\*)/

const findings = []

for (const file of trackedFiles) {
  let content
  try {
    content = readFileSync(`${REPO_ROOT}/${file}`, 'utf8')
  } catch {
    continue // deleted, binary or unreadable file: skip
  }

  const lines = content.split(/\r?\n/)
  lines.forEach((line, index) => {
    if (CODEISH.test(file) && COMMENT_LINE.test(line)) return

    for (const [pattern, label] of KEY_PATTERNS) {
      pattern.lastIndex = 0
      const match = pattern.exec(line)
      if (match) {
        findings.push(`${file}:${index + 1}: ${label} (${match[0].slice(0, 12)}...)`)
      }
    }

    if (CODEISH.test(file) && ENV_LINE_PATTERN.test(line)) {
      findings.push(`${file}:${index + 1}: .env-style secret assignment`)
    }
  })
}

if (findings.length > 0) {
  console.error(`secret-scan: ${findings.length} finding(s):`)
  for (const finding of findings) console.error(`  ${finding}`)
  process.exit(1)
}

console.log(`secret-scan: clean (${trackedFiles.length} tracked files scanned)`)

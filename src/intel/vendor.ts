/**
 * Vendor and Upstream code classifier.
 *
 * Requirement M3 §81:
 * "Das Brain unterscheidet eigenen Code von Vendor- und Upstream-Code
 * (Beispiel PlugHarness: DeepSeek-Harness-Basis 99f6f02)."
 */

export interface VendorClassification {
  isVendor: boolean
  vendorReason?: string
}

/**
 * Classifies whether a given file path belongs to vendor or upstream code.
 */
export function classifyVendor(filePath: string, repoName?: string | null): VendorClassification {
  const norm = filePath.replace(/\\/g, '/').toLowerCase()

  // 1. Generic vendor directories across any repository
  if (
    norm.includes('/vendor/') ||
    norm.startsWith('vendor/') ||
    norm.includes('/third_party/') ||
    norm.startsWith('third_party/') ||
    norm.includes('/node_modules/') ||
    norm.startsWith('node_modules/') ||
    norm.includes('/.gitnexus/') ||
    norm.startsWith('.gitnexus/') ||
    norm.includes('/deps/') ||
    norm.startsWith('deps/') ||
    norm.includes('/upstreams/') ||
    norm.startsWith('upstreams/') ||
    norm.includes('/external/') ||
    norm.startsWith('external/')
  ) {
    return {
      isVendor: true,
      vendorReason: 'vendor/third-party directory',
    }
  }

  // 2. Specific rule for PlugHarness:
  // - First-party native PLUG code: packages/plug, native, _foundation, patches, .plug, apps, scripts, docs
  // - Upstream DeepSeek-Harness code (base 99f6f02): other packages under packages/ (e.g. core, terminal, session, fs, etc.)
  const isPlugHarness =
    norm.includes('plugharness') ||
    (repoName !== undefined && repoName !== null && repoName.toLowerCase().includes('plugharness'))

  if (isPlugHarness) {
    const match = norm.match(/(?:code\/plugharness(?:--[^/]+)?\/|plugharness\/)?(.*)/)
    const rel = match ? match[1] : norm

    if (rel.startsWith('packages/plug/') || rel === 'packages/plug') {
      return { isVendor: false }
    }
    if (rel.startsWith('packages/')) {
      return {
        isVendor: true,
        vendorReason: 'upstream deepseek-harness (base 99f6f02)',
      }
    }
  }

  return { isVendor: false }
}

/**
 * Annotates a symbol object with vendor classification.
 */
export function annotateSymbolVendor<T extends { file: string; repoId?: string | null }>(
  symbol: T
): T & VendorClassification {
  const classification = classifyVendor(symbol.file, symbol.repoId)
  return {
    ...symbol,
    isVendor: classification.isVendor,
    ...(classification.vendorReason ? { vendorReason: classification.vendorReason } : {}),
  }
}

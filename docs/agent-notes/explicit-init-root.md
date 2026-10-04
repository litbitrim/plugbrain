# Explicit initialization roots

An explicit directory passed to `init` is the indexing root. Calling `init` without a directory discovers the enclosing Git root of the current directory. Both paths validate a real directory before registration. An explicit nested example or notes folder therefore cannot silently widen a scan to an unrelated parent checkout.

The CLI integration regression creates a parent Git repository and a nested folder, then checks the registered root and indexed file list. Parent source files and agent instruction files remain outside the explicit initialization. Dry-run and client configuration behavior retain their existing tests. This fixes initialization scope; it does not add a scan quota, change the parser or grant new filesystem rights.

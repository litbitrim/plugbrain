# Standalone notes workspace selection

Every notes command resolves one registered workspace. A single registered workspace can be selected implicitly; multiple workspaces require `--workspace <id>` or `--workspace=<id>`. Unknown, empty, missing and repeated selectors fail before any knowledge read or write. Selecting a workspace does not register a Planet or grant filesystem permissions. Existing note access checks and optimistic write versions continue to apply.

The CLI removes the selector and its value before parsing note text, paths and filters. A real-process integration test initializes two separate project folders, reads indexed Markdown without a Planet, checks each knowledge command, verifies explicit search isolation, writes and reads an allowed note, and rejects ambiguous or invalid selection. The test uses an isolated store and no client credentials.

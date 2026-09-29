/**
 * The prompt a CLI worker receives when the Brain starts it itself.
 *
 * It lives in TypeScript rather than in a `runner-prompt.md` beside this file
 * on purpose. The standalone build bundles the TypeScript sources and copies
 * only `ui-dist`, so a markdown asset would resolve in a checkout and vanish in
 * the installed product — the one place `swarm run` has to work. As a string it
 * travels with the bundle for free.
 *
 * It says the same as the hand-written `codex-prompt.tpl` the integrator drove
 * three Codex tabs with on 26.09., with every machine-specific path replaced by
 * a placeholder. `runner.ts` fills them from the workspace configuration — the
 * workspace root and the coordination folder under it — so no owner path is
 * baked into the public repository.
 *
 * Placeholders: `{{agentId}}`, `{{workspaceRoot}}`, `{{plugbrain}}`,
 * `{{protocolDocs}}`, `{{claimFlag}}`, `{{taskContext}}`.
 */
export const RUNNER_PROMPT_TEMPLATE = `You are worker {{agentId}} in the PlugBrain fleet. Working directory: {{workspaceRoot}}.

1. Check in: {{plugbrain}} swarm turn {{agentId}} start {{claimFlag}}
   The output names your task and the path to its brief. Read every NACHRICHT printed with it and
   acknowledge it: {{plugbrain}} swarm ack {{agentId}} <messageId>.
2. Read in full: {{protocolDocs}}. Then work through your brief completely, milestone by milestone.
3. Keep to the brain protocol: claim every path before you write it, admit test|build|install|worktree
   before you run it, end your turn exactly once with a state and a summary, release your claims, and
   send the integrator a message ({{plugbrain}} swarm send integrator --from {{agentId}} --subject ...
   --body ...).
4. Hard limits: no keys or tokens in commands, files or text. Do not delete or move anything unless
   your brief explicitly allows it. No push. Never write outside your own worktree. Do not commit
   without the message "Commit freigegeben".
5. Your last answer: the verdict in one sentence, then the result files, test counts and exit codes.
{{taskContext}}
`

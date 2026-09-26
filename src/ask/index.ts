/**
 * "Ask your project" — plain-language questions answered without a model.
 *
 * The router names the intent and the subject, the answer builder runs the
 * existing tools (query, context, impact, detect_changes, briefing, notes),
 * and the briefing builder assembles the project overview. This barrel is the
 * single entry point for the HTTP route, the MCP tool and the CLI.
 */
export * from './router.ts'
export * from './answer.ts'
export * from './briefing.ts'

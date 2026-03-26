---
description: Interactive option discovery command that gathers local context, standards, and external best practices, then recommends a direction.
---

# Ask

Use this command to explore and weigh implementation options before planning or
coding.

**Usage:** `/ask <decision or problem>`

**Arguments:** `$ARGUMENTS`

## Behavior

1. Frame the decision and success criteria.
2. Gather local context from relevant files and `standards/`.
3. Research external best practices (web or tools) when needed.
4. Present 2-4 options with tradeoffs, risks, and effort.
5. Recommend a default option based on repository constraints.
6. Continue interactive refinement through back-and-forth discussion.

## Output shape

Always structure responses as:

1. Decision
2. Context (local + standards + external)
3. Options (A/B/C with tradeoffs)
4. Recommendation
5. Next step

## Handoff

When the user asks to proceed:

- **Planning handoff**: delegate to `WorkflowDesigner` (or `TaskManager`) with
  selected option, scope, milestones, risks, and validation checks.
- **Building handoff**: delegate to `CoderAgent` with selected option,
  implementation brief, file targets, constraints, and acceptance criteria.

If `$ARGUMENTS` is empty, ask the user for the decision they want to make and
offer 2-3 example prompts.

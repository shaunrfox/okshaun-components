---
name: ask
description: Discover and weigh options using local context, standards, and external best practices, then recommend a direction and handoff to planning or implementation.
version: 1.0.0
---

# Ask

Ask is an interactive discovery skill for decision-making before implementation.
It combines repository context, canonical standards, and external best
practices to help choose the best path.

## Goals

1. Frame the decision and constraints.
2. Gather evidence from local files and `standards/`.
3. Research best-practice guidance from reliable external sources.
4. Present options with tradeoffs and a recommendation.
5. Support back-and-forth refinement.
6. Handoff cleanly to planning or building agents.

## Operating principles

- Anchor recommendations in this repository first.
- Treat `standards/` as canonical when conflicts appear.
- Separate facts, assumptions, and unknowns.
- Offer 2-4 realistic options; avoid false precision.
- Make recommendations explicit, including why alternatives lost.

## Step-by-step workflow

### 1) Decision framing

- Restate the decision in one sentence.
- Capture constraints: scope, risk tolerance, timeline, maintainability,
  compatibility, and performance/accessibility requirements.

### 2) Local discovery

- Inspect relevant implementation files.
- Pull standards from:
  - `standards/components/`
  - `standards/recipes/`
  - `standards/lint/`
  - `standards/index.yml`
- Note existing patterns to preserve consistency.

### 3) External discovery

- Research targeted best practices via web and available tools.
- Prefer high-signal sources (official docs, mature library docs,
  specification references).
- Bring back only information that changes decisions.

### 4) Options and recommendation

- Provide options as A/B/C.
- For each option include:
  - What it is
  - Benefits
  - Drawbacks and risks
  - Effort and complexity
  - Fit for this repo
- Recommend one option and justify against constraints.

### 5) Interactive refinement

- Accept follow-up constraints and reprioritize options.
- Update recommendation transparently when new evidence appears.

### 6) Handoff

When asked to proceed, generate one of:

- Planning handoff package:
  - selected option
  - scoped milestones
  - impacted files/modules
  - risks and mitigations
  - validation plan
- Building handoff package:
  - selected option
  - implementation brief
  - file-level change list
  - acceptance criteria
  - verification checklist

## Response template

Use this shape for concise, decision-friendly output:

1. Decision
2. Context (local + standards + external)
3. Options (A/B/C with tradeoffs)
4. Recommendation
5. Next step (continue discovery or handoff)

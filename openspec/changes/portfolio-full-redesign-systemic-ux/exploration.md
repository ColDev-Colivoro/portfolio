# Exploration: Portfolio Full Redesign Systemic UX

## Context

The portfolio already has strong identity and technical depth, but the user wants a full redesign focused on:
- tighter visual density (less oversized sections)
- stronger global transition language across views
- route-level atmosphere shifts with color identity
- better narrative structure on Home
- cleaner project storytelling and conversion rhythm

The project now follows root + local AGENTS policies:
- Mode B flow for this scope
- artifact_store.mode = openspec
- Engram-first mindset for anti-waste execution

## Current Pain Points

1. The page can feel oversized on desktop/laptop (section padding, hero scale, card height).
2. Home had too much section duplication against dedicated pages.
3. Motion and route transitions were not unified into one global system.
4. Project presentation can read as heavy blocks instead of a guided narrative.
5. Ongoing Chimubot experimentation can distract from core portfolio redesign scope.

## Option Analysis

### Option A (Recommended)
Home as compact narrative shell + dedicated depth routes.

Characteristics:
- Home sequence: Hero -> Featured -> Projects -> Capabilities -> Contact
- About/Certificates primarily live in their own pages
- global route transitions + route atmosphere tokens
- token-level density control in one place (`src/index.css`)

Pros:
- clear first impression in 5-10 seconds
- less cognitive overload
- easier to maintain and iterate
- preserves conversion intent

Cons:
- requires consistent copy discipline to avoid re-bloating Home

### Option B
Keep large one-page narrative with all major sections emphasized equally.

Pros:
- all content visible in one long scroll

Cons:
- weaker scannability
- repeated content against dedicated routes
- harder to keep rhythm and hierarchy clean

## Decision

Choose **Option A**.

This aligns with the user's stated goal (less oversized, more deliberate, more premium) and supports anti-dispersion execution by narrowing Home to high-impact storytelling.

## Scope Guardrails

In scope for this redesign track:
- global route atmosphere and transitions
- home hierarchy and density
- project narrative structure and compactness
- visual rhythm and readability on desktop + mobile

Out of scope for this track:
- deep Chimubot behavior redesign
- unrelated backend or infrastructure changes
- adding net-new product sections not tied to core portfolio narrative

## Risks and Mitigations

Risk 1: Over-compact UI can reduce perceived polish.
- Mitigation: tune by token increments and verify readability at 1366x768 + 1440p + mobile.

Risk 2: Motion may feel generic or too loud.
- Mitigation: keep one global easing language and limited motion families.

Risk 3: Home loses useful proof by removing sections.
- Mitigation: keep strongest proof in Featured/Projects and route users clearly to About/Projects pages.

## Success Criteria

1. Home communicates value and action path in 5-10 seconds.
2. Section density feels controlled; no "giant blocks" effect.
3. Route transitions and atmospheres feel intentional and consistent.
4. Project narrative feels curated and conversion-ready.
5. Desktop and mobile both preserve visual hierarchy and usability.

## Next Step

Proceed to `sdd-propose` for implementation contract, then `sdd-tasks` phased execution.

# Proposal: Portfolio Full Redesign Systemic UX

## Intent

Execute a systemic redesign of the portfolio to improve hierarchy, density, transitions, and conversion clarity while preserving ColDev visual identity.

## Chosen Direction

Option A from exploration:
- Compact Home as narrative shell
- Dedicated routes for depth content
- Global route motion + atmosphere system
- Token-driven density tuning

## Scope

### In Scope
- Route-level atmosphere and transition language
- Home section hierarchy and compact rhythm
- Typography/spacing token tuning
- Projects presentation compactness and narrative clarity
- Visual QA for desktop and mobile

### Out of Scope
- Deep Chimubot feature expansion
- Non-portfolio subsystem changes

## Affected Areas

| Area | Impact |
|------|--------|
| `src/App.jsx` | Route transitions and route-tone wiring |
| `src/index.css` | Density tokens + atmosphere layers |
| `src/pages/HomePage.jsx` | Narrative section order and trim |
| `src/components/Projects.jsx` | Card density and project rhythm |
| `src/components/FeaturedProject.jsx` | Featured hierarchy and readability |

## Rollout Plan

1. Lock global motion/atmosphere + density tokens
2. Stabilize Home narrative sequence
3. Compact project surfaces and featured block
4. Validate on desktop/mobile and polish

## Risk & Rollback

Risk:
- overly aggressive compacting can weaken premium feel

Rollback:
- token rollback in `src/index.css`
- home section rollback in `src/pages/HomePage.jsx`
- feature-level rollback via git for each phase commit

## Success Criteria

- Home clarity in <10 seconds
- No oversized block feeling on laptop/desktop
- Route transitions coherent and lightweight
- Projects scannable and conversion-oriented
- Build succeeds and manual visual checks pass

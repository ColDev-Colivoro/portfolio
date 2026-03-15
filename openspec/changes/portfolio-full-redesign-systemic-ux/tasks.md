# Tasks: Portfolio Full Redesign Systemic UX

## Phase 0: Design and Specs
- [x] 0.1 Establish route atmosphere and motion specs.
- [x] 0.2 Finalize Phase 3 Design document.

## Phase 1: Global Foundation (Motion + Atmosphere + Density)

- [x] 1.1 Implement route-tone aware atmosphere layers in `src/App.jsx` and `src/index.css`.
- [x] 1.2 Add coherent route transition wrapper in `src/App.jsx` with lightweight animation.
- [x] 1.3 Tune root density tokens in `src/index.css` (font-size, section spacing, hero scale, project media size).

## Phase 2: Home Narrative Recomposition

- [x] 2.1 Reorder Home sections to compact narrative shell in `src/pages/HomePage.jsx`.
- [x] 2.2 Remove redundant long-scroll emphasis for sections that already have dedicated routes.
- [ ] 2.3 Validate reading rhythm and CTA visibility in first viewport.

## Phase 2.5: Route-First Information Architecture

- [x] 2.5.1 Refactor primary navigation to route-first contract (`/`, `/proyectos`, `/about`, `/contact`) in `src/components/Navbar.jsx`.
- [x] 2.5.2 Ensure mobile navigation follows the same route contract and closes after route changes.
- [x] 2.5.3 Keep Home anchor jumps only for local CTAs, not for main menu ownership.

## Phase 3: Projects Surface Compactness

- [ ] 3.1 Refine `src/components/FeaturedProject.jsx` for tighter hierarchy and reduced vertical weight.
- [ ] 3.2 Refine `src/components/Projects.jsx` card density and scannability.
- [ ] 3.3 Confirm project order and prominence support conversion storytelling.

## Phase 4: Verification and Polish

- [x] 4.1 Run `npm run build` and resolve any regressions.
- [/] 4.2 Manual QA at 1366x768, 1440p, and mobile widths.
- [ ] 4.3 Verify transitions feel intentional (not generic, not heavy).
- [ ] 4.4 Final pass for readability and visual hierarchy consistency.

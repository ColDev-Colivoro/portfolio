# UI Specification: Portfolio Full Redesign Systemic UX

## Purpose

Define the expected behavior for the full portfolio redesign, with a route-first information architecture, compact narrative rhythm, and conversion-focused project storytelling while preserving ColDev visual identity.

## Requirements

### Requirement: Route-First Primary Navigation

The primary navigation MUST be route-first. Main menu actions MUST navigate to dedicated routes instead of relying on long-scroll behavior as the default model.

Route ownership:
- Home: `/`
- Projects: `/proyectos`
- Profile: `/about`
- Contact: `/contact`

Home-specific anchor jumps MAY exist for local CTAs, but they SHALL NOT replace dedicated route links in the primary menu.

#### Scenario: Desktop route navigation remains explicit
- GIVEN a visitor is currently on `/about`
- WHEN they activate `Proyectos` from the primary navigation
- THEN the application navigates to `/proyectos`
- AND the route tone updates to the projects atmosphere.

#### Scenario: Mobile menu uses the same route contract
- GIVEN a visitor opens the mobile navigation drawer
- WHEN they activate `Contacto`
- THEN the application navigates to `/contact`
- AND the drawer closes after navigation.

### Requirement: Home Uses Compact Narrative Ownership

The Home route MUST stay a compact narrative shell and MUST NOT duplicate long-form depth sections that belong to dedicated routes.

Home narrative sequence:
- Hero
- Featured case
- Projects grid
- Capabilities
- Contact entry

Dedicated route ownership:
- About depth and certificates SHALL live on `/about`
- Full project browsing SHALL live on `/proyectos`

#### Scenario: Home avoids duplicated depth sections
- GIVEN a visitor lands on `/`
- WHEN the page finishes initial render
- THEN they see the compact sequence in the defined order
- AND they do not see duplicated long-form profile or certificates blocks from `/about`.

### Requirement: Route Atmosphere and Transition Consistency

The app shell MUST keep one coherent transition and atmosphere system across routes.

- Route tones MUST be mapped by pathname.
- Route transitions SHALL use a shared motion language (timing + easing).
- Atmosphere layers SHOULD feel intentional and lightweight, not disruptive.

#### Scenario: Atmosphere changes by route
- GIVEN a visitor navigates from `/` to `/proyectos`
- WHEN the route transition runs
- THEN the route tone token changes from home to projects
- AND both atmosphere layers update consistently with the new tone.

### Requirement: First Viewport Conversion Clarity

The hero area MUST communicate value quickly and expose clear actions in the first viewport for common laptop resolutions.

- The value proposition MUST be visible without extra scrolling.
- At least one primary CTA and one secondary CTA MUST be visible in the first viewport on 1366x768 and above.
- Supporting copy SHOULD reinforce credibility and next action.

#### Scenario: Above-the-fold CTA clarity
- GIVEN a visitor loads `/` on a 1366x768 viewport
- WHEN the hero finishes rendering
- THEN the value proposition is visible
- AND the main action path to projects is immediately available without additional scrolling.

### Requirement: Featured Case Is Conversion-Ready and Data-Driven

The featured block MUST present one flagship case with explicit narrative proof and actionable next steps.

Required content units:
- domain/context tags
- title and subtitle
- concise summary
- problem statement
- impact statement
- open case action

The selected featured case MUST be controlled by data in `projectsData` so prominence can change without refactoring UI structure.

#### Scenario: Featured block opens the correct case context
- GIVEN the featured project is rendered from the catalog
- WHEN a visitor activates `Open case`
- THEN the case study modal opens
- [ ] the modal content corresponds only to the selected featured project.

### Requirement: Vertical Weight and Visual Density (Compactness)

The featured block MUST minimize vertical scrolling by optimizing internal gaps and paddings, especially for laptop-class viewports.

#### Scenario: Featured block respects density tokens
- GIVEN the featured project is rendered on a laptop viewport (1366x768)
- WHEN the visual hierarchy is inspected
- THEN internal padding of the main container is reduced compared to default sections
- AND the "Problem/Impact" cards use a condensed layout to save vertical space.

### Requirement: Projects Grid Stays Scannable and Filtered by Domain

The projects section MUST preserve fast scanning while supporting domain filtering.

- Only publicly visible projects MUST render.
- Domain filters MUST constrain projects by `project.domains`.
- Cards SHOULD stay compact and comparable in height and rhythm.
- Primary card action MUST open case study when available; otherwise it SHALL open the defined primary external link.

#### Scenario: Filtered listing reflects selected domain
- GIVEN the projects list is loaded
- WHEN a visitor chooses the `AI / Automation` filter
- THEN only projects tagged with that domain remain visible
- AND non-matching cards are excluded from the active grid.

### Requirement: Bilingual Copy Integrity and Conversion Framing

Critical UI copy MUST remain bilingual and resolved from centralized localized content.

- Main narrative areas MUST resolve text through locale-aware helpers.
- Spanish and English SHALL expose equivalent action intent.
- Conversion-critical sections SHOULD keep a pain -> approach -> outcome framing.

#### Scenario: Language switch preserves route context and action meaning
- GIVEN a visitor is on `/proyectos`
- WHEN they switch language from ES to EN
- THEN labels and CTAs are localized
- AND the route and action hierarchy remain unchanged.

### Requirement: Responsive Density and Visual Hierarchy

The redesign MUST be token-driven and responsive.

- Density controls MUST remain centralized in style tokens.
- Desktop and mobile SHALL preserve hierarchy without oversized empty blocks.
- Core interaction zones (nav, CTA, contact actions) MUST remain unobstructed.

#### Scenario: Mobile hierarchy remains usable
- GIVEN a visitor opens `/` on a mobile viewport
- WHEN they scroll through hero and project entry points
- THEN content order remains clear
- AND primary actions remain reachable without overlap or clipping.

### Requirement: Scope Guard for This Change Set

This redesign scope SHALL focus on portfolio IA, UX rhythm, and storytelling surfaces.

Chimubot animation internals and frame generation MUST NOT be expanded as part of this change unless explicitly requested in a separate change scope.

#### Scenario: Redesign changes remain in UX IA surface scope
- GIVEN this change set is reviewed
- WHEN modified files are inspected
- THEN edits are concentrated in navigation, pages, visual system, and project storytelling components
- AND no unrelated Chimubot expansion is included.

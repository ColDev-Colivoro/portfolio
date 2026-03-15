# UI Specification: Visual Flow and Assistive Interaction Polish

## Purpose
Address visual friction in the Assistant (Chatbot) entry flow and ensure Modal stability across viewports, aligning with the "premium and deliberate" goal of the portfolio.

## Requirements

### Requirement: Predicable Assistant Entry
The Assistant trigger (ChimubotAvatar) MUST be visible within the first 2 seconds of the page load or following the Hero entry animation, without requiring user scroll.

#### Scenario: Assistant appears without scroll
- GIVEN a visitor lands on the Home page
- WHEN the initial Hero animation completes
- THEN the Assistant trigger appears smoothly (fading or sliding in)
- AND it remains fixed in the bottom-right corner.

### Requirement: Modal Viewport Centering and Stability
The Case Study Modal MUST open centered in the viewport and MUST NOT be affected by document scroll position or footer boundaries.

#### Scenario: Modal ignores scroll position
- GIVEN a visitor is at any vertical scroll position
- WHEN they activate "Ver Caso de Estudio"
- THEN the modal opens centered in the viewport
- AND the background (body) scroll is locked.

#### Scenario: Modal preserves aspect ratio and content layout
- GIVEN the modal is open
- WHEN the view is inspected on different resolutions (Mobile vs Desktop)
- THEN the modal shell maintains a consistent boundary (e.g., 88vh height)
- AND content does not deform or "drift" towards the bottom of the page.

### Requirement: Smooth Interaction Transitions
Transitions for both the Chatbot window and the Case Study Modal MUST use the established motion language (duration ~0.6-0.8s, custom Bezier easing).

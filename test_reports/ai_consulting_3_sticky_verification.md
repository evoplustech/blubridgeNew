# Variant3 sticky intro verification — 2026-09-22

Scope: `/ai-consulting-3/` desktop left panel only, normal mobile scrolling, footer boundary, no content/form changes.

## Reproduction
At1920×800, the height<=850px override forced `position: static`. Intro moved from y180 to y−420 after600px page scroll.

## PASS
- Production build compiled.
- At1920×800, Other selected and textarea populated, intro stayed at y124 for page scroll450 and950.
- All three benefits remained visible below the CTA within the viewport.
- Clicking the pinned CTA returned to the form and focused Full Name.
- Near footer, panel released from sticky top; intro bottom302 <= footer top374, no footer overlap.
- At390×844, intro remained `position: static`;900px page scroll moved intro900px. Form accessible without fixed intro overlay.
- Desktop and mobile horizontal overflow arrays were empty.
- Only route-scoped CSS modified; shared and other-page sources untouched.

Screenshots and console output: `/root/.emergent/automation_output/20260922_080917/`.
No live submissions or backend changes in this CSS-only verification.
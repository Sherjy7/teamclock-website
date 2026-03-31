# TeamClock Preview Tour — Design Spec

## Overview

An interactive, scroll-driven guided tour page at `/preview` on the marketing site (`teamclock.ai`). Visitors scroll through 7 cinematic scenes that tell the story of a manager's week — from building a schedule to reviewing insights. Each scene has narration text, an animated mockup, and one light interactive moment ("try it").

## Navigation

- Add "Preview" link to the nav bar between "Features" and "About" (desktop and mobile drawer)
- Links to `/preview`
- Do NOT modify the hero section or "See How It Works" button — leave homepage untouched

## Page Structure

**Route:** `/preview`

**Layout:** Single long page with 7 full-viewport scenes (`min-height: 100vh` each).

**Scene layout (every scene):**
- Split two-column on desktop: narration left, mockup right
- Stacked on mobile: narration above, mockup below
- Background alternates `--tc-bg` and `--tc-bg-alt` for visual rhythm

**Scene narration side (left):**
- Scene number pill (e.g., "01")
- Headline — first-person narrative from a manager's perspective
- 1-2 sentence description
- "Try it →" pulsing badge pointing to the interactive moment

**Scene mockup side (right):**
- Large animated mockup (built with React components, not screenshots)
- Internal animations trigger when scene scrolls into view
- Contains 1 interactive element per scene

## Progress Indicator

- Thin vertical line (2px) on the left edge of the page, accent blue (`--tc-accent`)
- Grows from top to bottom as visitor scrolls
- Small dots at each scene position — filled (blue) when passed, hollow (border only) when upcoming
- Mobile: horizontal bar at top instead of vertical

## The 7 Scenes

### Scene 1 — Intro

**Narration:**
- Headline: "See TeamClock in action"
- Description: "Follow along as a manager builds their week — from scheduling to insights."
- No "try it" moment — just "Scroll to begin ↓"

**Mockup:**
- Animated TeamClock logo (clock icon) with a gentle pulse/glow
- Fades into a subtle preview montage of what's coming (small ghost images of calendars, phones, dashboards at low opacity)

**Background:** Hero-style gradient (`linear-gradient(135deg, #e0e7ff 0%, #f0f4f8 40%, #e0f2fe 100%)`) with dot grid overlay

### Scene 2 — Build the Schedule

**Narration:**
- Number: "01"
- Headline: "Monday morning. Time to build next week's schedule."
- Description: "Drag shifts onto the calendar. Color-coded by employee, conflict detection built in."
- Try it: "Drag a shift to a new slot"

**Mockup:**
- Weekly calendar (Mon–Sun) inside a BrowserFrame
- Shifts animate into slots with staggered pop-in when scene enters view
- One shift has a subtle drag handle indicator (pulsing outline)
- Interactive: visitor can drag that shift from one day to another — it snaps into the new slot with a smooth animation

**Auto-play fallback:** If no drag after 3 seconds, the shift auto-moves with an animation

### Scene 3 — AI Fills the Gaps

**Narration:**
- Number: "02"
- Headline: "Three gaps left. Let AI handle it."
- Description: "One click and the AI analyzes availability, overtime rules, and fairness to fill your schedule."
- Try it: "Click 'Fill with AI' to watch it work"

**Mockup:**
- Its own calendar component (independent from Scene 2) showing a week with 3 visibly empty slots (dashed borders, subtle pulse)
- A prominent "Fill with AI" button (purple gradient, AI sparkle icon)
- Interactive: clicking the button triggers:
  1. Button shows a loading spinner (0.5s)
  2. AI-generated shifts fly into the 3 empty slots one by one with a satisfying pop animation
  3. A small toast appears: "3 shifts filled by AI"

**Auto-play fallback:** If no click after 3 seconds, auto-triggers the fill animation

### Scene 4 — Clock In

**Narration:**
- Number: "03"
- Headline: "Tuesday 8:58 AM. Sarah arrives at work."
- Description: "One tap to clock in. GPS confirms she's at the right location."
- Try it: "Tap the Clock In button"

**Mockup:**
- Phone mockup (PhoneFrame) showing:
  - Location name: "Downtown Cafe"
  - Current time: "8:58 AM"
  - Large blue "Clock In" circle button
- Interactive: clicking the button triggers:
  1. Button morphs from blue to green with a checkmark
  2. Text changes to "Clocked In"
  3. GPS verification badge slides up: "GPS Verified — Within geofence"
  4. A small map snippet appears below with a pin dropping

**Auto-play fallback:** If no click after 3 seconds, auto-triggers the clock-in

### Scene 5 — Handle a Trade

**Narration:**
- Number: "04"
- Headline: "Wednesday. James can't make Thursday. Sarah can cover."
- Description: "Trade requests come in with all the context. One tap to approve."
- Try it: "Click Approve to complete the trade"

**Mockup:**
- Browser frame showing a trade request card:
  - "James K. wants to trade Thu 9a–5p"
  - "Sarah M. is available and has accepted"
  - No conflicts badge (green check)
  - Two buttons: "Approve" (blue) and "Decline" (outline)
- Interactive: clicking "Approve" triggers:
  1. Card flashes green briefly
  2. Status changes to "Approved ✓"
  3. Below, an animated visualization shows James's shift sliding to Sarah with a smooth swap animation
  4. Small notification: "Sarah notified via push"

**Auto-play fallback:** If no click after 3 seconds, auto-approves

### Scene 6 — Review the Week

**Narration:**
- Number: "05"
- Headline: "Friday. Let's see how the week went."
- Description: "Hours, costs, overtime risks, and an AI summary — all at a glance."
- Try it: "Hover over cards to see breakdowns"

**Mockup:**
- Browser frame showing a dashboard grid:
  - 4 stat cards: Hours (312 hrs), Labor Cost ($8,420), Coverage (94%), Overtime Risks (2)
  - Numbers count up when scene enters view
  - AI insight card below with typewriter text: "94% coverage this week. 2 overtime risks flagged — consider reducing James K. by one shift."
- Interactive: hovering a stat card expands it slightly and shows a mini breakdown (e.g., "Hours" card shows per-employee breakdown list)

**Auto-play fallback:** Cards auto-expand one by one after 3 seconds

### Scene 7 — CTA

**Narration:**
- Headline: "That's TeamClock. Ready to try it for real?"
- Description: "Get started in minutes. No credit card required."

**Mockup area:**
- No mockup — this is a full-width centered CTA scene
- Blue gradient background (`linear-gradient(135deg, #3b82f6, #2563eb)`)
- "Get Started Free" button (white, links to `app.teamclock.ai/signup`)
- "Back to Home" secondary link

## Animation & Scroll Behavior

**Scene transitions:**
- Each scene pinned at 100vh
- Scene enters view at ~30% threshold → narration fades/slides in from left, mockup animates in from right
- Framer Motion `whileInView` with `viewport: { once: true, amount: 0.3 }`
- Outgoing scene fades out naturally as it scrolls away

**Internal mockup animations:**
- Trigger once scene is in view (not on page load)
- Staggered pop-in for shift blocks, counting animation for numbers, typewriter for AI text
- Reuse existing animation primitives: `SectionReveal`, `AnimatedCounter`, `Typewriter`

**"Try it" interaction pattern:**
- Pulsing badge next to the interactive element: "Try it →"
- When visitor performs the action: micro-animation (checkmark/glow) + badge changes to "Nice! ✓"
- If no interaction after ~3 seconds: auto-play the animation so visitor still sees the result
- All interactions are optional — the tour works whether they click or not

## Mobile Responsiveness

- Stacked layout: narration above, mockup below
- Drag interactions become tap interactions
- Progress bar moves from vertical (left edge) to horizontal (top)
- All mockups scale down appropriately
- Phone mockup (Scene 4) centers in the viewport

## Technical Notes

- Reuse existing components where possible: `BrowserFrame`, `PhoneFrame`, `AnimatedCounter`, `Typewriter`, `SectionReveal`
- Each scene is its own component for isolation
- New interactive mockups will extend existing mockup patterns but add click/drag handlers
- No backend, no API calls — all interactions are client-side simulations
- Page metadata: title "Preview — TeamClock", description "See TeamClock in action. An interactive tour of AI-powered workforce management."

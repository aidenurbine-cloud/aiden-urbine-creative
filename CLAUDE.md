# CLAUDE.md — Aiden Urbine Creative

## Brand Identity
Name: Aiden Urbine Creative
Focus: Photo & Video — Outdoor, lifestyle, and gear brands
Location: Missoula, Montana
Aesthetic: Quiet, neutral, editorial. Cool grey gallery walls that let the photography carry all the color. Gritty and raw outdoor work. Minimal retouching. Photography leads; the UI recedes.

## Design Rules
- Light cool-neutral backgrounds (--bg #E9E9E7). No warm tint, never pure white, never dark as the page base. One rust-ember accent (#C84B2A), a whisper, used sparingly.
- Photo scrims stay dark and text OVER photographs stays light (--bone) for legibility — this is intentional and separate from the page palette.
- Typography: Bebas Neue (display), Cormorant Garamond (body), DM Mono (labels)
- Ember (#C84B2A) is the only accent color for CTAs and labels. Use sparingly.
- No border-radius above 2px. Sharp corners only.
- Animations should feel deliberate and slow — nothing bouncy or playful.
- Add grain/noise texture overlay to all hero sections.
- Images always take priority. Layouts serve the photography.

## Color Tokens (defined in app/globals.css :root)
--bg:      #E9E9E7   /* cool neutral paper — page background  */
--bg-2:    #F3F3F1   /* lighter surface / panels             */
--card:    #DCDCD9   /* grey — image placeholder / panel     */
--ink:     #1C1C1B   /* near-black — primary text            */
--muted:   #6E6E6A   /* neutral grey — secondary text        */
--border:  rgba(20,20,18,0.12)   /* neutral hairline         */
--ember:   #C84B2A   /* rust accent — a whisper, sparingly   */
--bone:    #F2F2F0   /* light text that sits OVER photos     */

## Fonts (loaded in app/layout.tsx, tokens in app/globals.css)
- Display: Bebas Neue — var(--font-display) — headlines, names, big type (condensed vintage caps)
- Editorial italic: Cormorant Garamond — var(--font-serif) — the statement line / quiet moments
- Body/UI: DM Sans 300/400 — var(--font-body) — bio, nav, small text
- Mono: DM Mono 300 — var(--font-mono) — labels, section eyebrows
- NOTE: Syne was tried and rejected ("feels bleh / generic"). Do not reintroduce it.

## Component Defaults
- Navigation: Fixed, minimal, transparent over hero. Logo left, links right.
- Buttons: No fill. Thin border in --bone. Hover fills with --ember.
- Section labels: DM Mono, 9px, 0.25em tracking, --ember color.
- Images: No rounded corners. Full-bleed. object-fit: cover always.
- Video: Autoplay, muted, loop for hero. No controls visible.

## Never Do This
- No purple or blue gradients
- No colored box shadows or glows
- No emoji in UI
- No generic stock photography
- No Inter, Roboto, or Arial fonts
- No border-radius above 2px

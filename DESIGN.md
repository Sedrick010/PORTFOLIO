# Design Direction: Sedrick James Camiguing Portfolio

> **Design Specification & Architectural Direction**  
> Established per antislop rule R-37 to provide explicit intent, tone, palette, and liveliness dials.

---

## 1. Identity & Character

* **Role:** Full-Stack Software Engineer & Systems Developer
* **Specialization:** Production-ready administrative platforms, multi-tenant relational schemas, clinical workflows, and high-concurrency architectures.
* **Tone & Persona:** Technical, architected, dependable, and understated. Clean typography and high legibility over flashy animations and neon gimmicks.
* **Core Question Test:** If the name were swapped, this portfolio feels like a serious software engineer's workstation: structured, organized, evidencing real systems and institutional projects.

---

## 2. Antislop Liveliness Dials

| Dial | Setting | Rationale |
| :--- | :---: | :--- |
| **ENERGY** | **2 (Balanced)** | Confident technical presence. High contrast, crisp surfaces, clear information hierarchy without neon gradients or glowing blobs. |
| **RHYTHM** | **2 (Mixed)** | Content-driven section structures. Alternates between wide hero split, structured asymmetrical about highlights, matrix tech grids, and a 3D carousel showcase. |
| **MOTION** | **1 (Calm / Purposeful)** | Zero perpetual looping animations. Motion is restricted to smooth transitions, user-initiated modals, and hover state responses. The developer's name and title remain steady and readable. |

---

## 3. Color Palette & Token Hierarchy

Limit active palette to 2 core neutrals + 1 primary accent + 1 status indicator (R-29):

* **Surface Base (Dark):** `#090d16` (Deep slate zinc for contrast and depth)
* **Surface Card:** `#0e1424` (Subtle elevation without blur overload)
* **Primary Brand Accent:** `#38bdf8` (Sky blue for links, key focal CTA, and active states)
* **Secondary Accent:** `#818cf8` (Indigo accent used sparingly for system tags)
* **Status Token:** `#10b981` (Emerald green for active availability)
* **Text Primary:** `#f8fafc` (Off-white, 15.8:1 contrast on dark surface)
* **Text Secondary:** `#94a3b8` (Slate gray, 7.58:1 contrast on dark surface, exceeds 4.5:1 WCAG AA)
* **Light Theme Surface Base:** `#f8fafc` with slate `#0f172a` text and `#0284c7` primary.

---

## 4. Typography Hierarchy

* **Headings:** Plus Jakarta Sans (600, 700, 800) — clean geometric clarity with tight tracking.
* **Body / UI:** Inter (400, 500, 600) — industry-standard readability and balanced legibility.
* **Code / Badges:** JetBrains Mono (400, 500, 700) — monospaced accuracy for architectural specs, database entities, and technical metadata.

---

## 5. Rationale for Visual Decisions (R-31)

1. **Why deep zinc instead of pure black?** Deep slate zinc (`#090d16`) provides softer eye comfort than harsh `#000000` while preserving 15:1+ text contrast.
2. **Why structured cards instead of open text?** The candidate specializes in modular enterprise systems; card surfaces mirror system component architecture.
3. **Why sky blue accent?** High contrast readability against dark substrates, conveying precision and technical clarity without harsh neon saturation.
4. **Why static typography over typewriter loops?** A recruiter or hiring manager scans in seconds; text should be instantly legible without waiting for animation cycles.
5. **Why capped glassmorphism?** Blur is reserved for floating chrome (navigation and modal backdrops) so that content cards maintain crisp boundary contrast and render performantly.

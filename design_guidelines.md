# IntelliHub AI Platform - Design Guidelines

## Design Approach

**Selected Approach**: Design System-Based (Utility-Focused Application)

**Rationale**: IntelliHub is a productivity-focused AI platform where efficiency, clarity, and usability take precedence over visual spectacle. Drawing inspiration from Linear's clean interface, Notion's content organization, and Material Design's interactive feedback patterns.

**Core Principles**:
- Function over form - every visual element serves a purpose
- Consistent, predictable interactions across all tools
- Clear information hierarchy for dense content
- Subtle visual feedback for AI processing states

---

## Color Palette

### Dark Mode (Primary Theme)
**Background Layers**:
- Primary Background: `220 13% 9%` (gray-900 equivalent)
- Elevated Surface: `220 13% 13%` with 60% opacity (gray-800/60)
- Borders: `220 13% 25%` with 50% opacity (gray-700/50)

**Brand Colors**:
- Primary Gradient Start: `270 70% 65%` (purple-400)
- Primary Gradient End: `173 58% 65%` (teal-400)
- Use gradient exclusively for branding elements (logo, hero text)

**Tool-Specific Accent Colors** (for visual categorization):
- Study Buddy: `217 91% 60%` (blue-500)
- Text Tools: `173 58% 55%` (teal-500)
- Code Helper: `270 70% 60%` (purple-500)
- Creative Corner: `330 81% 60%` (pink-500)
- Travel Planner: `25 95% 53%` (orange-500)
- Image Generator: `280 80% 65%` (violet-500)

**Interaction States**:
- Hover: Lighten accent by 10% (e.g., blue-600 → blue-500)
- Active/Selected: Use current accent at full opacity
- Focus Ring: Match tool's accent color at 50% opacity

**Text Hierarchy**:
- Primary Text: `220 9% 98%` (white/gray-50)
- Secondary Text: `220 9% 78%` (gray-300)
- Tertiary/Placeholder: `220 9% 58%` (gray-400)

---

## Typography

**Font Family**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Code/Monospace: 'JetBrains Mono', 'Courier New', monospace

**Type Scale**:
- Display (Dashboard Headlines): `text-4xl font-extrabold` (36px, 800 weight)
- H1 (View Titles): `text-3xl font-bold` (30px, 700 weight)
- H2 (Section Headers): `text-xl font-semibold` (20px, 600 weight)
- H3 (Card Titles): `text-lg font-semibold` (18px, 600 weight)
- Body: `text-base font-normal` (16px, 400 weight)
- Small/Labels: `text-sm font-medium` (14px, 500 weight)

**Line Height**:
- Headlines: `leading-tight` (1.25)
- Body Text: `leading-relaxed` (1.625)
- Code Output: `leading-loose` (1.7)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 10, 12** for consistent rhythm
- Component padding: `p-6` (24px) for cards, `p-4` (16px) for compact areas
- Section spacing: `mb-6` or `mb-8` between major sections
- Button padding: `py-3 px-4` or `py-2 px-5`
- Grid gaps: `gap-4` (16px) for tight grids, `gap-6` (24px) for card grids

**Container Strategy**:
- Sidebar: Fixed `w-64` (256px)
- Main content: `flex-1` with `p-6 md:p-10` responsive padding
- Max-width: None required - let content breathe within viewport

**Grid Patterns**:
- Dashboard cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Tool action buttons: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Form inputs: `grid-cols-1 md:grid-cols-2` for paired fields

---

## Component Library

### Navigation
**Sidebar**:
- Background: `bg-gray-800/50` with subtle border-right
- Logo area: Centered, gradient text treatment
- Nav items: 
  - Default: `text-gray-300 hover:bg-gray-700`
  - Active: `bg-gray-700 text-white`
  - Icons: 24px (1.5rem), stroke-width 2
  - Left-aligned with 12px spacing between icon and label

### Buttons
**Primary Actions**:
- Style: Solid color with tool-specific accent
- States: `hover:` lighten by 100, `active:` scale-95
- Border radius: `rounded-lg` (8px)
- Font: `font-semibold`

**Secondary Actions**: Use when needed with `border border-gray-600 bg-transparent`

### Input Fields
**Text Inputs & Textareas**:
- Background: `bg-gray-900`
- Border: `border border-gray-600`
- Focus: `focus:ring-2 focus:ring-[accent]` matching tool color
- Border radius: `rounded-lg`
- Padding: `p-3` for standard inputs

### Cards
**Dashboard & Content Cards**:
- Background: `bg-gray-800/60`
- Border: `border border-gray-700/50`
- Border radius: `rounded-xl` (12px)
- Padding: `p-6`
- Shadow: None (borders provide depth)

### Output Display
**AI Response Container**:
- Background: Slightly lighter than card (`bg-gray-700/40`)
- Font: Body text with `leading-relaxed`
- Code blocks: Use `code-output` class with monospace font
- Preserve formatting: `whitespace-pre-wrap`

### Loading States
**Spinner**:
- Size: 32px circular spinner
- Color: White border-top on transparent border
- Position: Centered within output container
- Animation: 1s linear infinite rotation

---

## Interaction Patterns

**View Switching**:
- Fade-in animation: 0.3s ease-in-out
- Transform: translateY(10px) → translateY(0)
- No page reload - JavaScript-driven single-page behavior

**Form Submission**:
1. Disable button, show spinner
2. Display loading state in output area
3. Stream or display complete AI response
4. Re-enable button, hide spinner

**Navigation**:
- Click sidebar item → switch view, update active state
- Dashboard cards link to relevant tools via onclick

---

## Responsive Behavior

**Breakpoints**:
- Mobile: Base styles (< 768px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)

**Adaptations**:
- Mobile: Consider collapsible sidebar or hamburger menu
- Tablet: Reduce grid columns (3 → 2)
- Desktop: Full multi-column layout with spacious padding

---

## Accessibility

**Focus Management**:
- Visible focus rings matching tool accent colors
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons

**Color Contrast**:
- Maintain WCAG AA standards (4.5:1 for body text)
- White text on dark backgrounds provides strong contrast
- Accent colors tested for readability on dark surfaces

**Dark Mode Consistency**:
- All inputs use dark backgrounds (`bg-gray-900`)
- No jarring light surfaces
- Consistent text colors across all views

---

## Special Considerations

**Multi-Tool Consistency**:
- Each tool uses the same layout structure (header + action area + output area)
- Consistent button styling across all tools
- Output formatting adapts to content type (prose, code, lists)

**AI-Specific UX**:
- Clear loading indicators during API calls
- Error states with retry options
- Success feedback (subtle, non-intrusive)

**Performance**:
- Minimal animations (only view transitions)
- No auto-playing media
- Efficient DOM updates for AI streaming responses
# Design System Documentation

This document outlines the design system extracted from the Figma design for the Campaigner application.

## Overview

The design system is based on the Figma design file: `Campaigner-Web-Cursor` and ensures consistency across all components and pages.

## Typography

### Font Families
- **Sans Serif**: Geist, Geist Fallback
- **Mono**: Geist Mono, Geist Mono Fallback

### Font Sizes
| Element | Size | Usage |
|---------|------|-------|
| Section Label | 27px | "BASED ON" labels |
| Heading | 27px | Main headings like "WHAT ARE WE LOOKING FOR TODAY?" |
| Section Title | 27px | "My Campaigns", "Case Studies", etc. |
| Campaign Title | 19px | Campaign card titles |
| Brand Name | 17px | Brand names on campaign cards |
| View More | 27px | "View More" links |
| Footer Text | 12px | Footer copyright text |
| Version | 17px | "V1.0" version text |

### Font Weights
- Normal: 400
- Semibold: 600
- Bold: 700
- Black: 900

### Letter Spacing
- Tight: -0.02em
- Normal: 0em
- Wide: 0.12em (used in "BASED ON" labels)

## Colors

### Primary Colors
- **White**: `#FFFFFF`
- **Black**: `#000000`

### Background
- **Primary**: `#000000` (Black)
- **Gradient**: From `#171a00` (Dark green-black) to `#000000` (Black)

### Text Colors
- **Primary**: `#FFFFFF` (White)
- **Secondary**: `rgba(255, 255, 255, 0.6)` (White at 60% opacity)
- **Muted**: `rgba(255, 255, 255, 0.4)` (White at 40% opacity)

### Accent Color
- **Primary**: `rgb(204, 237, 0)` / `#CCED00` (Lime green)

### Border Colors
- **Default**: `rgba(255, 255, 255, 0.2)` (White at 20% opacity)
- **Light**: `rgba(255, 255, 255, 0.1)` (White at 10% opacity)

### Overlay Colors
- **Dark**: `rgba(0, 0, 0, 0.7)` (Black at 70% opacity)
- **Medium**: `rgba(0, 0, 0, 0.25)` (Black at 25% opacity)
- **Light**: `rgba(0, 0, 0, 0.1)` (Black at 10% opacity)

## Spacing

### Container Spacing
- **Horizontal Padding**: 48px
- **Vertical Padding**: 48px

### Section Spacing
- **Title to Content**: 35px
- **Between Sections**: 64px

### Card Spacing
- **Campaign Cards Gap**: 24px
- **Category Tiles Gap**: 21px
- **Case Study Cards Gap**: 24px

### Component Spacing
- **Card Padding**: 4px
- **Category Label Margin**: 4px
- **Navbar Height**: 100px
- **Navbar Content Height**: 48px

## Layout

### Container
- **Max Width**: 1344px
- **Padding**: 48px (horizontal and vertical)

### Campaign Cards
- **Width**: 320px
- **Height**: 245px
  - Image: 199px
  - Text Area: 38px
    - Title: 19px
    - Brand: 17px
    - Gap: 2px

### Category Tiles
- **Small**: 320.25px × 220px
- **Large**: 320.25px × 464px
- **Wide**: 662px × 220px

### Case Study Cards
- **Width**: 318px
- **Height**: 443px

### Navbar
- **Height**: 100px
- **Content Height**: 48px
- **Logo**: 158px × 40px

### Footer
- **Height**: 406px
- **Social Icon Size**: 35px
- **Social Icon Inner**: 15px

## Shadows

- **Card Shadow**: `0 0 10px rgba(0, 0, 0, 0.1)`
- **Hover Shadow**: `0 4px 20px rgba(0, 0, 0, 0.2)`

## Border Radius

- **Small**: 4px (0.25rem)
- **Medium**: 8px (0.5rem)
- **Large**: 10px (0.625rem)
- **Extra Large**: 16px (1rem)
- **Full**: 9999px

## Transitions

### Duration
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms

### Easing
- **Default**: ease-in-out
- **Ease Out**: ease-out
- **Ease In**: ease-in

## Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Usage

### Importing the Design System

```typescript
import { designSystem, tailwindClasses } from "@/lib/design-system"

// Access specific tokens
const primaryColor = designSystem.colors.accent.primary
const cardWidth = designSystem.layout.campaignCard.width

// Use Tailwind class mappings
<div className={tailwindClasses.text.sectionTitle}>
  My Campaigns
</div>
```

### Using Tailwind Classes

The design system provides pre-mapped Tailwind classes for common patterns:

```tsx
// Section title
<h2 className={tailwindClasses.text.sectionTitle}>My Campaigns</h2>

// Campaign title
<h3 className={tailwindClasses.text.campaignTitle}>{title}</h3>

// Brand name
<p className={tailwindClasses.text.brandName}>{brand}</p>

// Container
<div className={tailwindClasses.layout.container}>
  {/* Content */}
</div>
```

## Component-Specific Styles

### Section Headers
- Font size: 27px
- Font weight: Bold (700)
- Color: White
- Margin bottom: 35px

### Campaign Cards
- Width: 320px
- Height: 245px
- Border radius: 10px (lg)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Box shadow: 0 0 10px rgba(0, 0, 0, 0.1)

### Category Tiles
- Border radius: 10px (lg)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Box shadow: 0 0 10px rgba(0, 0, 0, 0.1)

### View More Links
- Font size: 27px
- Color: White
- Display: flex
- Align items: center
- Gap: 4px

## Best Practices

1. **Always use design system tokens** instead of hardcoded values
2. **Use Tailwind class mappings** when available for consistency
3. **Reference this document** when creating new components
4. **Maintain spacing consistency** using the defined spacing scale
5. **Use the correct typography scale** for different text elements
6. **Follow the color palette** strictly to maintain brand consistency

## Updates

When updating the design system:
1. Update `lib/design-system.ts` with new tokens
2. Update this documentation
3. Update any affected components
4. Ensure all changes align with the Figma design


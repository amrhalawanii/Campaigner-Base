/**
 * Design System Tokens
 * Extracted from Figma design: Campaigner-Web-Cursor
 * 
 * This file contains all design tokens including typography, spacing, colors,
 * and component-specific measurements to ensure consistency across the application.
 */

// ============================================================================
// Typography
// ============================================================================

export const typography = {
  // Font Families
  fontSans: '"Geist", "Geist Fallback"',
  fontMono: '"Geist Mono", "Geist Mono Fallback"',

  // Font Sizes (from Figma measurements)
  sizes: {
    // Section labels (e.g., "BASED ON")
    sectionLabel: "27px", // height: 27px
    // Main headings (e.g., "WHAT ARE WE LOOKING FOR TODAY?")
    heading: "27px", // height: 27px
    // Section titles (e.g., "My Campaigns", "Case Studies")
    sectionTitle: "27px", // height: 27px
    // Campaign titles
    campaignTitle: "19px", // height: 19px
    // Brand names
    brandName: "17px", // height: 17px
    // View More text
    viewMore: "27px", // height: 27px
    // Footer text
    footer: "12px", // height: 12px
    // Version text (e.g., "V1.0")
    version: "17px", // height: 17px
  },

  // Font Weights
  weights: {
    normal: 400,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  // Letter Spacing
  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.12em", // Used in "BASED ON" label
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
} as const

// ============================================================================
// Spacing
// ============================================================================

export const spacing = {
  // Container padding
  container: {
    x: "48px", // Horizontal padding
    y: "48px", // Vertical padding
  },

  // Section spacing
  section: {
    titleToContent: "35px", // Space between section title and content
    betweenSections: "64px", // Space between major sections
  },

  // Card spacing
  cards: {
    gap: "24px", // Gap between campaign cards (344 - 320 = 24px)
    categoryGap: "21px", // Gap between category tiles
    caseStudyGap: "24px", // Gap between case study cards (342 - 318 = 24px)
  },

  // Component internal spacing
  components: {
    cardPadding: "4px", // Padding inside campaign card text area
    categoryLabelMargin: "4px", // Margin for category label
    navBarHeight: "100px", // Navbar height
    navBarContentHeight: "48px", // Navbar content height
  },
} as const

// ============================================================================
// Colors
// ============================================================================

export const colors = {
  // Primary colors
  white: "#FFFFFF",
  black: "#000000",

  // Background colors
  background: {
    primary: "#000000", // Black
    gradient: {
      from: "#171a00", // Dark green-black
      to: "#000000", // Black
    },
  },

  // Text colors
  text: {
    primary: "#FFFFFF", // White
    secondary: "rgba(255, 255, 255, 0.6)", // White at 60% opacity
    muted: "rgba(255, 255, 255, 0.4)", // White at 40% opacity
  },

  // Accent color (Lime green)
  accent: {
    primary: "rgb(204, 237, 0)", // #CCED00
    hex: "#CCED00",
  },

  // Border colors
  border: {
    default: "rgba(255, 255, 255, 0.2)", // White at 20% opacity
    light: "rgba(255, 255, 255, 0.1)", // White at 10% opacity
  },

  // Overlay colors
  overlay: {
    dark: "rgba(0, 0, 0, 0.7)", // Black at 70% opacity
    medium: "rgba(0, 0, 0, 0.25)", // Black at 25% opacity
    light: "rgba(0, 0, 0, 0.1)", // Black at 10% opacity
  },
} as const

// ============================================================================
// Layout
// ============================================================================

export const layout = {
  // Container
  container: {
    maxWidth: "1344px", // Maximum container width
    padding: spacing.container,
  },

  // Campaign Cards
  campaignCard: {
    width: "320px",
    height: "245px", // 199px image + 38px text + 8px gap
    imageHeight: "199px",
    textHeight: "38px", // 19px title + 17px brand + 2px gap
    titleHeight: "19px",
    brandHeight: "17px",
  },

  // Category Tiles
  categoryTile: {
    small: {
      width: "320.25px",
      height: "220px",
    },
    large: {
      width: "320.25px",
      height: "464px",
    },
    wide: {
      width: "662px",
      height: "220px",
    },
  },

  // Case Study Cards
  caseStudyCard: {
    width: "318px",
    height: "443px",
  },

  // Navbar
  navbar: {
    height: "100px",
    contentHeight: "48px",
    logoWidth: "158px",
    logoHeight: "40px",
  },

  // Footer
  footer: {
    height: "406px",
    socialIconSize: "35px",
    socialIconInner: "15px",
  },
} as const

// ============================================================================
// Shadows
// ============================================================================

export const shadows = {
  card: "0 0 10px rgba(0, 0, 0, 0.1)",
  hover: "0 4px 20px rgba(0, 0, 0, 0.2)",
} as const

// ============================================================================
// Border Radius
// ============================================================================

export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.625rem", // 10px
  xl: "1rem", // 16px
  full: "9999px",
} as const

// ============================================================================
// Transitions
// ============================================================================

export const transitions = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    default: "ease-in-out",
    easeOut: "ease-out",
    easeIn: "ease-in",
  },
} as const

// ============================================================================
// Breakpoints (for responsive design)
// ============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// ============================================================================
// Component-Specific Styles
// ============================================================================

export const componentStyles = {
  // Section Headers
  sectionHeader: {
    fontSize: typography.sizes.sectionTitle,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.section.titleToContent,
  },

  // Campaign Card
  campaignCard: {
    width: layout.campaignCard.width,
    height: layout.campaignCard.height,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border.default}`,
    boxShadow: shadows.card,
  },

  // Category Tile
  categoryTile: {
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border.default}`,
    boxShadow: shadows.card,
  },

  // View More Link
  viewMoreLink: {
    fontSize: typography.sizes.viewMore,
    color: colors.text.primary,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
} as const

// ============================================================================
// Tailwind CSS Class Mappings
// ============================================================================

/**
 * Utility object to map design tokens to Tailwind classes
 * Use these for consistent styling across components
 */
export const tailwindClasses = {
  // Typography
  text: {
    sectionLabel: "text-[27px] uppercase tracking-[0.12em]",
    heading: "text-[27px] font-black",
    sectionTitle: "text-[27px] font-bold",
    campaignTitle: "text-[19px] font-semibold",
    brandName: "text-[17px]",
    viewMore: "text-[27px]",
    footer: "text-[12px]",
    version: "text-[17px]",
  },

  // Spacing
  spacing: {
    container: "px-12", // 48px
    sectionGap: "mb-16", // 64px
    cardGap: "gap-6", // 24px
    categoryGap: "gap-[21px]",
  },

  // Colors
  colors: {
    textPrimary: "text-white",
    textSecondary: "text-white/60",
    textMuted: "text-white/40",
    accent: "text-[#CCED00]",
    bgGradient: "bg-gradient-to-b from-[#171a00] to-black",
  },

  // Layout
  layout: {
    container: "max-w-[1344px] mx-auto px-12",
    campaignCard: "w-[320px] h-[245px]",
    categoryTileSmall: "w-[320.25px] h-[220px]",
    categoryTileLarge: "w-[320.25px] h-[464px]",
  },
} as const

// ============================================================================
// Export all tokens
// ============================================================================

export const designSystem = {
  typography,
  spacing,
  colors,
  layout,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
  componentStyles,
  tailwindClasses,
} as const

export default designSystem


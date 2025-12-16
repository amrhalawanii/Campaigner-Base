// Route Paths
export const ROUTES = {
  HOME: "/",
  CAMPAIGNS: "/campaigns",
  BRANDS: "/brands",
  AGENCIES: "/agencies",
  CASE_STUDIES: "/case-studies",
  PRODUCT: "/product",
  INDUSTRY: "/industry",
  CHANNEL: "/channel",
  TIME: "/time",
  PROFILE: "/profile",
  MY_CAMPAIGNS: "/my-campaigns",
  SAVED_CAMPAIGNS: "/saved-campaigns",
  TRENDING_CAMPAIGNS: "/trending-campaigns",
  YOU_MIGHT_LIKE: "/you-might-like",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  RECOVER_PASSWORD: "/recover-password",
  LANGUAGE: "/language",
} as const

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  CAMPAIGNS: "/api/campaigns",
  BRANDS: "/api/brands",
  AGENCIES: "/api/agencies",
  SEARCH: "/api/search",
} as const

// App Configuration
export const APP_CONFIG = {
  NAME: "Campaigner",
  VERSION: "V1.0.0",
  DESCRIPTION: "A visual-first marketing inspiration platform for marketers",
} as const

// UI Constants
export const UI_CONSTANTS = {
  MOBILE_BREAKPOINT: 768,
  TOAST_LIMIT: 1,
  TOAST_REMOVE_DELAY: 1000000,
} as const

// Search Constants
export const SEARCH_CONSTANTS = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
} as const


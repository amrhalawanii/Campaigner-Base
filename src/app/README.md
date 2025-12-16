# App Directory Structure

This directory follows Next.js App Router conventions. Here's how it's organized:

## Route Structure

### Dynamic Routes (`[id]`)
Folders with `[id]` are **dynamic route segments** in Next.js. This is the correct pattern for pages that need dynamic parameters:
- `/campaigns/[id]` → `/campaigns/1`, `/campaigns/2`, etc.
- `/brands/[id]` → `/brands/nike`, `/brands/adidas`, etc.
- `/agencies/[id]` → `/agencies/agency-name`, etc.

This is **not** unorganized - it's the standard Next.js pattern for dynamic routes.

## Current Organization

### Content Routes (Browse/Discover)
- `/campaigns` - List all campaigns
- `/campaigns/[id]` - Individual campaign detail
- `/brands` - List all brands
- `/brands/[id]` - Brand detail page
- `/agencies` - List all agencies
- `/agencies/[id]` - Agency detail page
- `/case-studies` - List case studies
- `/case-studies/[id]` - Case study detail
- `/industry/[id]` - Industry filter
- `/channel/[id]` - Channel filter
- `/product/[id]` - Product filter

### User Routes
- `/profile` - User profile page
- `/my-campaigns` - User's saved campaigns
- `/saved-campaigns` - User's saved campaigns (alternative)
- `/trending-campaigns` - Trending campaigns
- `/you-might-like` - Recommended campaigns

### Auth Routes
- `/sign-in` - Sign in page
- `/register` - Registration page
- `/recover-password` - Password recovery

### Utility Routes
- `/language` - Language settings
- `/time` - Time filter settings

## Best Practices Applied

1. ✅ **Consistent naming**: All routes use plural forms (campaigns, brands, agencies)
2. ✅ **No duplicates**: Removed duplicate `/campaign/[id]` route (now only `/campaigns/[id]`)
3. ✅ **Dynamic routes**: Using `[id]` pattern correctly for parameterized routes
4. ✅ **Server components**: Detail pages use async server components for better performance

## Notes

- The `[id]` folder structure is **required** for Next.js dynamic routes
- Each route folder contains a `page.tsx` file (required by Next.js)
- Route groups `(group-name)` can be used for organization without affecting URLs


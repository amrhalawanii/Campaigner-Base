# Campaign Data Structure Documentation

## Overview

This document describes the complete structure of campaign data in the application, including both API response format and frontend component format.

---

## API Campaign Structure

### TypeScript Interface (`lib/types/api.types.ts`)

```typescript
interface Campaign {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  launch_date: string;
  brand: Brand;
  agency: Agency;
  location: Location;
  media: Media[];
  is_saved?: boolean;
  my_campaigns_folder_saved?: number[];
  bookmarks_lists_saved?: number[];
}

interface Brand {
  id: number;
  name: string;
  logo: string | null;
}

interface Agency {
  id: number;
  name: string;
  logo: string | null;
}

interface Location {
  country: string;
  region: string;
}

interface Media {
  id: number;
  url: string;
  type: string;
  description?: string;
  views: number;
}
```

### Complete API Response Example

```json
{
  "id": 2503,
  "title": "UWC: Trapped by Uncertainty",
  "description": "A comprehensive campaign description that explains the campaign's purpose, target audience, and key messaging. This can be a long text describing all aspects of the campaign.",
  "cover_image": "https://lightsteelblue-walrus-768466.hostingersite.com/assets/images/campaigns_media/media_682b7e55ce447.png",
  "launch_date": "2024-01-15 10:00:00",
  "brand": {
    "id": 1,
    "name": "Boehringer Ingelheim",
    "logo": "https://example.com/brand-logo.png"
  },
  "agency": {
    "id": 1,
    "name": "Area 23",
    "logo": "https://example.com/agency-logo.png"
  },
  "location": {
    "country": "United States",
    "region": "North America"
  },
  "media": [
    {
      "id": 1,
      "url": "https://example.com/media1.jpg",
      "type": "image",
      "description": "Campaign image showing the main visual",
      "views": 1500
    },
    {
      "id": 2,
      "url": "https://example.com/video1.mp4",
      "type": "video",
      "description": "Campaign video advertisement",
      "views": 3200
    },
    {
      "id": 3,
      "url": "https://example.com/media2.jpg",
      "type": "image",
      "description": "Secondary campaign image",
      "views": 890
    }
  ],
  "is_saved": true,
  "my_campaigns_folder_saved": [1, 2],
  "bookmarks_lists_saved": [3, 5]
}
```

### Alternative API Format (Flat Structure)

The API may also return campaigns in a flat format:

```json
{
  "id": 2503,
  "title": "UWC: Trapped by Uncertainty",
  "description": "Campaign description",
  "cover_image": "https://example.com/image.jpg",
  "launch_date": "2024-01-15 10:00:00",
  "brand_name": "Boehringer Ingelheim",
  "agency_name": "Area 23",
  "country": "United States",
  "region": "North America",
  "is_saved": 1,
  "tags": ["healthcare", "pharmaceutical", "awareness"]
}
```

---

## Frontend Component Campaign Structure

### TypeScript Interface (Used in Components)

```typescript
interface Campaign {
  id: number;
  title: string;
  brand: string;              // Brand name as string (extracted from API)
  image: string;              // Cover image URL
  description: string;
  saved: boolean;             // Bookmark status
  agency?: string;            // Agency name (optional)
  year?: number;              // Extracted from launch_date
  tags?: string[];            // Campaign tags/categories
}
```

### Complete Frontend Campaign Example

```json
{
  "id": 2503,
  "title": "UWC: Trapped by Uncertainty",
  "brand": "Boehringer Ingelheim",
  "image": "https://lightsteelblue-walrus-768466.hostingersite.com/assets/images/campaigns_media/media_682b7e55ce447.png",
  "description": "A comprehensive campaign description...",
  "saved": true,
  "agency": "Area 23",
  "year": 2024,
  "tags": ["healthcare", "pharmaceutical", "awareness"]
}
```

---

## Field Descriptions

### Core Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | `number` | Unique campaign identifier | ✅ Yes |
| `title` | `string` | Campaign title/name | ✅ Yes |
| `description` | `string` | Full campaign description | ⚠️ Optional |
| `cover_image` | `string` | URL to campaign cover image | ⚠️ Optional |
| `launch_date` | `string` | Campaign launch date (format: "YYYY-MM-DD HH:MM:SS") | ⚠️ Optional |

### Brand Information

| Field | Type | Description | Format |
|-------|------|-------------|--------|
| `brand` | `object \| string` | Brand information | API: `{id, name, logo}` or `brand_name` string |
| `brand.id` | `number` | Brand ID | API only |
| `brand.name` | `string` | Brand name | API: `brand.name` or `brand_name` |
| `brand.logo` | `string \| null` | Brand logo URL | API only |

### Agency Information

| Field | Type | Description | Format |
|-------|------|-------------|--------|
| `agency` | `object \| string` | Agency information | API: `{id, name, logo}` or `agency_name` string |
| `agency.id` | `number` | Agency ID | API only |
| `agency.name` | `string` | Agency name | API: `agency.name` or `agency_name` |
| `agency.logo` | `string \| null` | Agency logo URL | API only |

### Location Information

| Field | Type | Description | Format |
|-------|------|-------------|--------|
| `location` | `object` | Location information | API: `{country, region}` |
| `location.country` | `string` | Country name | Example: "United States" |
| `location.region` | `string` | Region/state | Example: "North America" |

### Media Array

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `media` | `Media[]` | Array of media items | ⚠️ Optional |
| `media[].id` | `number` | Media item ID | ✅ Yes |
| `media[].url` | `string` | Media file URL | ✅ Yes |
| `media[].type` | `string` | Media type ("image" or "video") | ✅ Yes |
| `media[].description` | `string` | Media description | ⚠️ Optional |
| `media[].views` | `number` | View count | ⚠️ Optional |

### Bookmark/Save Fields

| Field | Type | Description | Format |
|-------|------|-------------|--------|
| `is_saved` | `boolean \| number` | Whether campaign is bookmarked | `true`/`false` or `1`/`0` |
| `saved` | `boolean` | Frontend bookmark status | `true`/`false` |
| `my_campaigns_folder_saved` | `number[]` | Folder IDs where campaign is saved | Array of folder IDs |
| `bookmarks_lists_saved` | `number[]` | Bookmark list IDs | Array of list IDs |

### Additional Fields

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `year` | `number` | Year extracted from `launch_date` | Frontend only (derived) |
| `tags` | `string[]` | Campaign tags/categories | API or frontend |

---

## Data Transformation

### API → Frontend Transformation

The `transformCampaign()` function converts API format to frontend format:

```typescript
function transformCampaign(apiCampaign: any): Campaign {
  // Handles:
  // - Nested brand/agency objects → strings
  // - Flat brand_name/agency_name → strings
  // - is_saved (boolean/number) → saved (boolean)
  // - launch_date → year (number)
  // - cover_image → image
  // - ID type conversion (string → number)
}
```

### Transformation Rules

1. **Brand/Agency**: 
   - API: `brand: {name: "..."}` → Frontend: `brand: "..."`
   - API: `brand_name: "..."` → Frontend: `brand: "..."`
   - API: `brand: "..."` (string) → Frontend: `brand: "..."`

2. **Image**:
   - API: `cover_image` → Frontend: `image`
   - Relative paths get leading slash added

3. **Saved Status**:
   - API: `is_saved: true` or `is_saved: 1` → Frontend: `saved: true`
   - API: `is_saved: false` or `is_saved: 0` → Frontend: `saved: false`

4. **Year**:
   - API: `launch_date: "2024-01-15 10:00:00"` → Frontend: `year: 2024`
   - Invalid dates → `year: undefined`

5. **ID**:
   - API: `id: "2503"` (string) → Frontend: `id: 2503` (number)
   - API: `id: 2503` (number) → Frontend: `id: 2503` (number)

---

## Real-World Example

### From API Response (Raw)
```json
{
  "id": "2503",
  "title": "UWC: Trapped by Uncertainty",
  "description": "Campaign about healthcare awareness",
  "cover_image": "assets/images/campaigns_media/media_682b7e55ce447.png",
  "launch_date": "2024-01-15 10:00:00",
  "brand": {
    "id": 1,
    "name": "Boehringer Ingelheim",
    "logo": "https://example.com/logo.png"
  },
  "agency": {
    "id": 1,
    "name": "Area 23",
    "logo": null
  },
  "location": {
    "country": "United States",
    "region": "North America"
  },
  "media": [
    {
      "id": 1,
      "url": "https://example.com/image.jpg",
      "type": "image",
      "description": "Main campaign image",
      "views": 1500
    }
  ],
  "is_saved": 1
}
```

### After Transformation (Frontend)
```json
{
  "id": 2503,
  "title": "UWC: Trapped by Uncertainty",
  "brand": "Boehringer Ingelheim",
  "image": "/assets/images/campaigns_media/media_682b7e55ce447.png",
  "description": "Campaign about healthcare awareness",
  "saved": true,
  "agency": "Area 23",
  "year": 2024
}
```

---

## Campaign Collections

Campaigns can be organized in different collections:

### 1. My Campaigns
- Campaigns created by or assigned to the user
- Source: `my_campaigns` from `/get_home_page_data.php`

### 2. You Might Like
- Recommended campaigns based on user preferences
- Source: `you_might_like` from `/get_home_page_data.php`

### 3. Trending Campaigns
- Currently popular/trending campaigns
- Source: `trending_campaigns` from `/get_home_page_data.php`

### 4. Saved Campaigns
- User's bookmarked campaigns
- Source: `saved_campaigns` from `/get_home_page_data.php`

### 5. All Campaigns
- Complete list of all campaigns
- Source: `/get_all_campaigns.php`

---

## Usage in Components

### CampaignCard Component
```typescript
<CampaignCard
  id={campaign.id}
  title={campaign.title}
  brand={campaign.brand}
  image={campaign.image}
  saved={campaign.saved}
/>
```

### Campaign Detail Page
Uses full API campaign structure with:
- All media items
- Full description
- Brand/agency logos
- Location details
- Related campaigns

---

## Notes

1. **Flexible Structure**: The API may return data in different formats (nested objects vs flat strings)
2. **Type Safety**: Frontend uses TypeScript interfaces for type checking
3. **Transformation**: All API data is transformed to frontend format before use
4. **Null Handling**: Missing fields are handled gracefully with fallback values
5. **Date Format**: Dates are in MySQL datetime format: "YYYY-MM-DD HH:MM:SS"
6. **Image URLs**: Can be relative paths or full URLs
7. **Boolean Values**: `is_saved` can be boolean or number (1/0)

---

**Last Updated**: January 2025  
**API Base URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`


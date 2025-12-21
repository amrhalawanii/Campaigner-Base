# Campaigns Data Source Explanation

## Where Campaigns Data Comes From

### API Base URL
**Location**: `lib/config/api.config.ts`

Currently configured as:
```typescript
BASE_URL: 'http://localhost:3000'
```

This can be overridden with environment variable:
```env
NEXT_PUBLIC_API_BASE_URL=your-api-url
```

### API Endpoints Used

The home page fetches campaigns from **two API endpoints**:

#### 1. Get All Campaigns
**Endpoint**: `/get_all_campaigns.php`
**Full URL**: `http://localhost:3000/get_all_campaigns.php`
**Method**: GET
**Parameters**: 
- `user_id` (optional) - If user is logged in

**Service Method**: `campaignService.getAllCampaigns(userId)`

**What it returns**:
- All campaigns from the database
- Can be an array directly or nested in response object

#### 2. Get Home Page Data
**Endpoint**: `/get_home_page_data.php`
**Full URL**: `http://localhost:3000/get_home_page_data.php`
**Method**: GET
**Parameters**:
- `user_id` - User ID (0 if not authenticated)

**Service Method**: `campaignService.getHomePageData(userId)`

**What it returns**:
- Categorized campaigns:
  - `my_campaigns` - User's campaigns
  - `you_might_like` - Recommended campaigns
  - `trending_campaigns` - Trending campaigns
  - `saved_campaigns` - Saved campaigns
  - `case_studies` - Case studies

## Data Flow

```
Home Page (src/app/page.tsx)
    ↓
useEffect hook triggers on mount
    ↓
Tries to fetch from TWO endpoints:
    ↓
1. getAllCampaigns() → /get_all_campaigns.php
    ↓
2. getHomePageData() → /get_home_page_data.php
    ↓
Both responses are combined and deduplicated
    ↓
Data is transformed to component format
    ↓
Displayed in carousel sections
```

## Current Implementation

### Home Page Logic (`src/app/page.tsx`)

1. **First Attempt**: Tries to get all campaigns
   ```typescript
   await campaignService.getAllCampaigns(userId)
   ```
   - Fetches from: `http://localhost:3000/get_all_campaigns.php?user_id=X`

2. **Second Attempt**: Tries to get categorized data
   ```typescript
   await campaignService.getHomePageData(userId || 0)
   ```
   - Fetches from: `http://localhost:3000/get_home_page_data.php?user_id=X`

3. **Data Combination**: 
   - Merges both responses
   - Removes duplicates
   - Distributes across sections if needed

### Campaign Service (`lib/services/campaign.service.ts`)

All API calls go through:
- `apiService.get()` - Base HTTP GET method
- Which uses Axios with base URL: `http://localhost:3000`
- Adds authentication token if user is logged in

## How to Verify Data Source

### Method 1: Check Network Tab

1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Filter by "XHR" or "Fetch"
4. Navigate to home page
5. Look for requests:
   - `get_all_campaigns.php`
   - `get_home_page_data.php`
6. Click on each request to see:
   - **Request URL**: Full URL being called
   - **Request Headers**: Including auth token
   - **Response**: Actual data returned

### Method 2: Check Console Logs

On the home page, console will show:
```
All campaigns API response: { success: true, data: [...] }
Home page API response: { success: true, data: {...} }
```

### Method 3: Use Test Page

1. Go to `/test-services`
2. Click "Test Get All Campaigns"
3. Click "View Details" to see:
   - Full API response
   - Request URL
   - Response structure

## Important Notes

### API Base URL
- **Current**: `http://localhost:3000`
- **This assumes**: Your API server is running on localhost:3000
- **If different**: Update `lib/config/api.config.ts` or set `NEXT_PUBLIC_API_BASE_URL` env variable

### Endpoint Requirements
- `/get_all_campaigns.php` - May work without authentication
- `/get_home_page_data.php` - Uses `user_id=0` if not authenticated

### Data Structure Expected

**From `/get_all_campaigns.php`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Campaign Title",
      "cover_image": "image.jpg",
      "brand": { "name": "Brand Name" },
      ...
    }
  ]
}
```

**From `/get_home_page_data.php`:**
```json
{
  "success": true,
  "data": {
    "my_campaigns": [...],
    "you_might_like": [...],
    "trending_campaigns": [...],
    "saved_campaigns": [...],
    "case_studies": [...]
  }
}
```

## Troubleshooting

### If No Data Appears:

1. **Check API Base URL**
   - Verify in `lib/config/api.config.ts`
   - Should match your API server URL

2. **Check API Endpoints Exist**
   - Verify `/get_all_campaigns.php` exists on your API server
   - Verify `/get_home_page_data.php` exists on your API server

3. **Check Network Requests**
   - Open DevTools → Network tab
   - See if requests are being made
   - Check response status codes
   - Check response data

4. **Check Console for Errors**
   - Look for error messages
   - Check API response structure

## Summary

**Campaigns are retrieved from:**
- **API Server**: `http://localhost:3000` (configurable)
- **Endpoints**: 
  - `/get_all_campaigns.php` - All campaigns
  - `/get_home_page_data.php` - Categorized campaigns
- **Method**: HTTP GET requests via Axios
- **Authentication**: Token added automatically if user is logged in

**To change the data source:**
1. Update `API_CONFIG.BASE_URL` in `lib/config/api.config.ts`
2. Or set `NEXT_PUBLIC_API_BASE_URL` environment variable
3. Ensure your API server has the required endpoints


# API Configuration Update

## ✅ Changes Made

### 1. Updated API Base URL
**File**: `lib/config/api.config.ts`

**Changed from**: `http://localhost:3000`
**Changed to**: `https://lightsteelblue-walrus-768466.hostingersite.com`

This matches the actual API server from the Postman collection.

## 📋 API Endpoints from Postman Collection

Based on the Postman Collection, here are the available endpoints:

### Campaign Endpoints:
1. **`/get_all_campaigns.php`** ✅ Already implemented
   - Method: GET
   - Parameters: `user_id` (optional)
   - Returns: All campaigns

2. **`/get_home_page_data.php`** ✅ Already implemented
   - Method: GET
   - Parameters: `user_id` (required)
   - Returns: Categorized campaigns (my_campaigns, you_might_like, trending_campaigns, saved_campaigns, case_studies)

3. **`/get_campaign.php`** ✅ Already implemented
   - Method: GET
   - Parameters: `campaign_id`, `user_id` (optional)
   - Returns: Single campaign details

4. **`/search.php`** ⚠️ Not yet implemented
   - Method: GET
   - Parameters: `query`, `user_id` (optional)
   - Returns: Search results

5. **`/get_my_space.php`** ⚠️ Not yet implemented
   - Method: GET
   - Parameters: `user_id` (required)
   - Returns: User's space (My Campaigns, Bookmarks, History, Notes)

### User Endpoints:
1. **`/signup.php`** ✅ Already implemented
2. **`/login.php`** ✅ Already implemented
3. **`/logout.php`** ✅ Already implemented
4. **`/get_user_data.php`** ✅ Already implemented
5. **`/update_user_data.php`** ✅ Already implemented
6. **`/send_signup_verification_code.php`** ✅ Already implemented
7. **`/reset_password.php`** ✅ Already implemented
8. **`/delete_user_account.php`** ✅ Already implemented

## 🔍 API Response Structure

Based on the Postman collection examples:

### Search Response Example:
```json
{
  "success": true,
  "message": "Search results loaded successfully.",
  "data": {
    "search_found": true,
    "campaigns": [
      {
        "id": "3",
        "title": "Hot Movies with hot wings",
        "description": "...",
        "cover_image": "https://lightsteelblue-walrus-768466.hostingersite.com/assets/images/campaigns_media/media_682b7e55ce447.png",
        "launch_date": "0000-00-00 00:00:00",
        "brand_name": "KFC",
        "is_saved": 1
      }
    ],
    "videos": []
  }
}
```

**Note**: Some responses use `brand_name` (string) instead of nested `brand` object. Our transform function handles this.

## ✅ Current Implementation Status

### Campaign Service (`lib/services/campaign.service.ts`)
- ✅ `getAllCampaigns()` - Fetches all campaigns
- ✅ `getHomePageData()` - Fetches categorized campaigns
- ✅ `getCampaign()` - Fetches single campaign
- ✅ `getMedia()` - Fetches media

### Home Page (`src/app/page.tsx`)
- ✅ Fetches from `/get_all_campaigns.php`
- ✅ Fetches from `/get_home_page_data.php`
- ✅ Handles different response structures
- ✅ Transforms API data to component format
- ✅ Error handling with ErrorHandler

## 🧪 Testing

To test if campaigns are being retrieved:

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Go to test page**:
   ```
   http://localhost:3000/test-services
   ```

3. **Click "Test Get All Campaigns"**:
   - Should show campaigns from the API
   - Check "View Details" for full response

4. **Check home page**:
   ```
   http://localhost:3000
   ```
   - Should display campaigns in carousels
   - Check browser console for API responses

5. **Check Network tab**:
   - Open DevTools (F12)
   - Go to Network tab
   - Look for requests to:
     - `get_all_campaigns.php`
     - `get_home_page_data.php`
   - Verify they're going to: `https://lightsteelblue-walrus-768466.hostingersite.com`

## 🔧 Configuration

### Environment Variable (Optional)
You can override the base URL using:
```env
NEXT_PUBLIC_API_BASE_URL=https://lightsteelblue-walrus-768466.hostingersite.com
```

### Current Configuration
```typescript
// lib/config/api.config.ts
BASE_URL: 'https://lightsteelblue-walrus-768466.hostingersite.com'
```

## 📝 Next Steps

1. ✅ API base URL updated
2. ✅ Endpoints verified
3. ⏳ Test campaign retrieval
4. ⏳ Verify response structure matches
5. ⏳ Add search functionality (optional)
6. ⏳ Add "My Space" functionality (optional)

## 🐛 Troubleshooting

### If campaigns don't load:

1. **Check API Base URL**:
   - Verify it's `https://lightsteelblue-walrus-768466.hostingersite.com`
   - Check Network tab to see actual requests

2. **Check CORS**:
   - API server should allow requests from your frontend domain
   - Check browser console for CORS errors

3. **Check Authentication**:
   - Some endpoints may require authentication
   - Check if token is being sent (Network tab → Headers)

4. **Check Response Structure**:
   - Use test page to see actual API response
   - Verify it matches expected structure
   - Update transform function if needed

5. **Check Console Logs**:
   - Look for error messages
   - Check API response logs
   - Verify data transformation


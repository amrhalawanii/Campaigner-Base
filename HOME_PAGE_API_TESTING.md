# Home Page API Testing Guide

## ✅ Enhanced Implementation

The home page has been enhanced with comprehensive logging and error handling to ensure campaigns are properly retrieved and displayed.

## 🔍 Testing Steps

### 1. Open Browser Console
- Press `F12` or right-click → Inspect → Console tab
- Look for logs starting with emojis (🏠, 📡, ✅, etc.)

### 2. Check API Calls
You should see these logs in order:

```
🏠 Home Page: Starting to fetch campaigns, userId: X
📡 Fetching all campaigns from API...
✅ All campaigns API response: {...}
📡 Fetching home page data from API...
✅ Home page API response: {...}
🎉 Final campaigns loaded: {...}
```

### 3. Verify Data Structure
Look for logs showing:
- `📦 Response data type: Array` or `Object`
- `📊 Found X campaigns in [collection]`
- `✅ Transformed X campaigns`
- `📋 Sample campaign: {...}`

### 4. Check Network Tab
- Open DevTools → Network tab
- Filter by "XHR" or "Fetch"
- Look for requests to:
  - `/get_all_campaigns.php`
  - `/get_home_page_data.php`
- Click each request to see:
  - Request URL (should be: `https://lightsteelblue-walrus-768466.hostingersite.com/api/get_home_page_data.php?user_id=X`)
  - Response status (200 = success)
  - Response data

## 📊 Expected Console Output

### Successful API Call:
```
🏠 Home Page: Starting to fetch campaigns, userId: 1
📡 Fetching all campaigns from API...
✅ All campaigns API response: {success: true, data: [...]}
📦 Response data type: Array
📊 Found 10 campaigns in array
✅ Transformed 10 campaigns
📡 Fetching home page data from API...
✅ Home page API response: {success: true, data: {...}}
📦 Home page data structure keys: ['my_campaigns', 'trending_campaigns', ...]
📊 Found 5 items in trending_campaigns
✅ Loaded 5 trending campaigns
🎉 Final campaigns loaded: {trending: 5, ...}
```

### If No Data:
```
⚠️ Home page API response not successful: [message]
⚠️ No trending_campaigns found or not an array
📊 Final fallback: Using all campaigns as trending
```

## 🐛 Troubleshooting

### Issue: No campaigns showing

**Check 1: API Base URL**
- Open `lib/config/api.config.ts`
- Verify: `BASE_URL: 'https://lightsteelblue-walrus-768466.hostingersite.com/api'`
- Check Network tab to see actual URL being called

**Check 2: CORS Error**
- Look for CORS error in console
- See `CORS_FIX_GUIDE.md` for solution
- API server needs to allow requests from your frontend

**Check 3: API Response Structure**
- Check console for "Home page API response"
- Verify the structure matches expected format
- Look for `success: true` and `data` object

**Check 4: Data Transformation**
- Check console for "Sample campaign"
- Verify campaign has required fields: `id`, `title`, `brand`, `image`
- Check for transformation errors

**Check 5: Empty Collections**
- Check console logs for collection counts
- If all are 0, API might be returning empty arrays
- Check Network tab → Response to see actual data

### Issue: Campaigns showing but wrong data

**Check 1: Transform Function**
- Look for "Error transforming campaign" in console
- Check sample campaign data structure
- Verify API response matches expected format

**Check 2: Image URLs**
- Check if images are loading
- Verify `cover_image` field in API response
- Check Network tab for failed image requests

## 🔧 Debug Features Added

### 1. Comprehensive Logging
- Every API call is logged
- Response structure is logged
- Collection counts are logged
- Sample data is logged

### 2. Error Handling
- Network errors are caught and logged
- API errors are caught and logged
- Transformation errors are caught with fallback
- Graceful degradation if API fails

### 3. Fallback Logic
- If categorized data not available, uses all campaigns
- If no data, distributes campaigns across sections
- Ensures at least trending campaigns are shown

### 4. Visual Debug Info
- In development mode, shows debug panel
- Displays campaign counts for each collection
- Helps identify which collections have data

## 📝 API Endpoints Used

### 1. Get All Campaigns
- **URL**: `/get_all_campaigns.php`
- **Method**: GET
- **Params**: `user_id` (optional)
- **Purpose**: Fallback source for campaigns

### 2. Get Home Page Data
- **URL**: `/get_home_page_data.php`
- **Method**: GET
- **Params**: `user_id` (required, defaults to 0)
- **Purpose**: Primary source for categorized collections

## ✅ Verification Checklist

- [ ] Console shows "🏠 Home Page: Starting to fetch campaigns"
- [ ] API requests appear in Network tab
- [ ] Response status is 200 (not 404, 500, etc.)
- [ ] Console shows "✅ Home page API response" with data
- [ ] Console shows collection counts > 0
- [ ] Console shows "🎉 Final campaigns loaded" with counts
- [ ] Campaign carousels appear on page
- [ ] Campaign cards show images and titles
- [ ] No CORS errors in console
- [ ] No transformation errors in console

## 🎯 Success Indicators

✅ **Campaigns are loading if:**
- Console shows collection counts > 0
- Carousels appear on the page
- Campaign cards are visible
- Images load (or show placeholder)
- No error messages in console

❌ **Campaigns are NOT loading if:**
- Console shows all counts as 0
- "No campaigns available" message appears
- Network requests show errors (404, 500, CORS)
- Console shows API errors

## 📞 Next Steps if Not Working

1. **Check API Base URL** - Verify it's correct
2. **Check CORS** - API server must allow your origin
3. **Check API Response** - Use Network tab to see actual response
4. **Check Console Logs** - Look for error messages
5. **Test API Directly** - Use Postman or curl to test endpoints
6. **Verify User ID** - Check if `user_id` parameter is correct

## 🔄 Testing Commands

### Test in Browser Console:
```javascript
// Check if campaigns are in state
// (This won't work directly, but you can check Network tab)

// Or test API directly:
fetch('https://lightsteelblue-walrus-768466.hostingersite.com/api/get_home_page_data.php?user_id=1')
  .then(r => r.json())
  .then(data => console.log('API Response:', data))
  .catch(err => console.error('API Error:', err))
```

## 📊 Current Implementation Status

✅ API integration complete
✅ Error handling comprehensive
✅ Logging extensive
✅ Fallback logic implemented
✅ Transform function robust
✅ Debug info available
✅ Multiple data source support

The home page is now fully instrumented for testing and debugging!


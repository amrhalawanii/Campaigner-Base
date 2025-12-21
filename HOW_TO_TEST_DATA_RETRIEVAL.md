# How to Test Data Retrieval

This guide explains how to test if campaigns and other data are being retrieved from your API.

## Quick Start

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Navigate to Test Page

Open your browser and go to:
```
http://localhost:3000/test-services
```

## Testing Campaign Retrieval

### Option 1: Using the Test Services Page (Recommended)

The test page provides visual feedback and detailed results.

#### Steps:

1. **Open Test Services Page**
   - Navigate to `http://localhost:3000/test-services`

2. **Check Authentication State**
   - Look at the "Current Authentication State" card
   - If not authenticated, you can still test, but some endpoints may require authentication
   - To test with authentication:
     - Enter your email and password in "Test Credentials"
     - Click "Test Login" under "Auth Context Tests"
     - Wait for successful login

3. **Test Campaign Retrieval**
   
   **Test Get All Campaigns:**
   - Click "Test Get All Campaigns" button under "Campaign Service Tests"
   - Check the results:
     - ✅ **SUCCESS** (Green) = Campaigns retrieved successfully
     - ❌ **ERROR** (Red) = Check error message
   - Click "View Details" to see:
     - Total number of campaigns
     - Sample campaign data (first 3 campaigns)
     - Full API response structure

   **Test Get Home Page Data:**
   - Click "Test Get Home Page Data" button
   - Check the results:
     - Shows counts for each section (My Campaigns, You Might Like, etc.)
     - Sample data from each section
   - This tests the endpoint used by the home page

   **Test Get Single Campaign:**
   - Click "Test Get Single Campaign" button
   - Tests retrieving a specific campaign (ID: 1)
   - Shows full campaign details if successful

4. **Review Test Results**
   - Each test shows:
     - Status (Success/Error)
     - Message
     - Timestamp
     - Expandable details with full data

### Option 2: Using Browser Console

1. **Open Browser Developer Tools**
   - Press `F12` or `Right-click → Inspect`
   - Go to "Console" tab

2. **Check Console Logs**
   - Navigate to home page: `http://localhost:3000`
   - Look for console logs:
     - "All campaigns API response:" - Shows raw API response
     - "Home page API response:" - Shows categorized data
     - "Final campaigns loaded:" - Shows counts per section
     - "Campaigns loaded:" - Detailed breakdown

3. **Check Network Tab**
   - Go to "Network" tab in DevTools
   - Filter by "XHR" or "Fetch"
   - Look for requests to:
     - `/get_all_campaigns.php`
     - `/get_home_page_data.php`
   - Click on each request to see:
     - Request URL and parameters
     - Response status code
     - Response data
     - Request/Response headers

### Option 3: Test on Home Page Directly

1. **Navigate to Home Page**
   - Go to `http://localhost:3000`

2. **What to Look For:**
   - **Loading State**: "Loading campaigns..." message
   - **Success**: Campaign cards appear in carousels
   - **Error**: "Error: [message]" with details
   - **Empty State**: "No campaigns available at the moment"

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for logs showing:
     - API responses
     - Campaign counts
     - Any errors

## Understanding Test Results

### Success Indicators

✅ **Green Status** = Test passed
- Campaigns retrieved successfully
- Data structure is correct
- API is responding

### Error Indicators

❌ **Red Status** = Test failed
- Check the error message:
  - **Network error** = API server not reachable or wrong URL
  - **401 Unauthorized** = Need to login first
  - **404 Not Found** = Endpoint doesn't exist
  - **500 Server Error** = API server issue

### What to Check in Details

When you click "View Details", look for:

1. **Response Structure:**
   ```json
   {
     "success": true,
     "message": "...",
     "data": [...]
   }
   ```

2. **Campaign Data:**
   - `id`: Campaign ID
   - `title`: Campaign title
   - `cover_image`: Image URL
   - `brand`: Brand object with name
   - `agency`: Agency object with name

3. **Counts:**
   - Total campaigns retrieved
   - Campaigns per section

## Common Issues & Solutions

### Issue: "Network error"
**Solution:**
- Check API base URL in `lib/config/api.config.ts`
- Verify API server is running
- Check CORS settings on API server
- Verify network connection

### Issue: "No campaigns found"
**Possible Causes:**
- Database is empty
- User not authenticated (some endpoints require auth)
- Wrong user_id parameter
- API endpoint returns empty array

**Solution:**
- Check if you're logged in
- Verify API endpoint is correct
- Check database has data
- Test with different user_id

### Issue: "Unexpected response structure"
**Solution:**
- Check "View Details" in test results
- Compare actual response with expected structure
- Update `transformCampaign` function if needed
- Check API documentation

### Issue: "401 Unauthorized"
**Solution:**
- Login first using test credentials
- Check if token is being sent (check Network tab)
- Verify token is valid
- Check API authentication requirements

## Testing Checklist

- [ ] Test page loads without errors
- [ ] Can see API base URL in test page
- [ ] Authentication state shows correctly
- [ ] "Test Get All Campaigns" returns data
- [ ] "Test Get Home Page Data" returns data
- [ ] Campaign data structure is correct
- [ ] Home page displays campaigns
- [ ] No console errors
- [ ] Network requests show 200 status
- [ ] Error handling works (test with wrong credentials)

## Advanced Testing

### Test with Different Users

1. Login with different user accounts
2. Test campaign retrieval for each user
3. Compare results (user-specific campaigns)

### Test Error Scenarios

1. **Disconnect Internet** → Should show network error
2. **Wrong API URL** → Should show connection error
3. **Invalid Credentials** → Should show auth error
4. **Non-existent Campaign ID** → Should show not found error

### Monitor Network Requests

1. Open DevTools → Network tab
2. Filter by "XHR"
3. Watch for:
   - Request URLs
   - Request parameters
   - Response status codes
   - Response data
   - Request timing

## Expected Results

### Successful Campaign Retrieval

**Console Output:**
```
All campaigns API response: { success: true, data: [...] }
Home page API response: { success: true, data: {...} }
Final campaigns loaded: { total: 10, myCampaigns: 2, ... }
```

**Test Results:**
- Status: SUCCESS
- Message: "Successfully retrieved X campaign(s)"
- Data: Shows campaign count and sample data

**Home Page:**
- Campaign cards appear in carousels
- Images load correctly
- No error messages

## Next Steps

If tests pass:
- ✅ Data retrieval is working
- ✅ API integration is successful
- ✅ Ready to use in production

If tests fail:
- Check error messages in test results
- Review console logs for details
- Verify API endpoint URLs
- Check API server status
- Review API documentation


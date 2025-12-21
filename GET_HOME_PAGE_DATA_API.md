# Get Home Page Data API Endpoint Documentation

## Endpoint Details

**URL**: `/get_home_page_data.php`  
**Method**: `GET`  
**Base URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`  
**Full URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api/get_home_page_data.php`

## Request Parameters

### Query Parameters
- `user_id` (required): The user's ID
  - Type: `number` or `string`
  - Example: `1`, `123`
  - Use `0` for unauthenticated users

### Example Request
```
GET /get_home_page_data.php?user_id=1
```

## Response Structure

### Success Response Format
```typescript
interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    my_campaigns?: CampaignCollection;
    you_might_like?: CampaignCollection;
    trending_campaigns?: CampaignCollection;
    saved_campaigns?: CampaignCollection;
    case_studies?: CaseStudy[];
  } | null;
}

interface CampaignCollection {
  items?: Campaign[];
  // OR the campaigns can be directly in an array
}

interface Campaign {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  launch_date: string;
  brand: Brand | string;
  agency: Agency | string;
  location: Location;
  media: Media[];
  is_saved?: boolean | number;
  // ... other campaign fields
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

## Example Response

### Structure 1: Object with `items` arrays (Most Common)
```json
{
  "success": true,
  "message": "Home page data retrieved successfully",
  "data": {
    "my_campaigns": {
      "items": [
        {
          "id": 2503,
          "title": "My Campaign Title",
          "description": "Campaign description here",
          "cover_image": "https://example.com/image.jpg",
          "launch_date": "2024-01-15 10:00:00",
          "brand": {
            "id": 1,
            "name": "Brand Name",
            "logo": "https://example.com/brand-logo.png"
          },
          "agency": {
            "id": 1,
            "name": "Agency Name",
            "logo": "https://example.com/agency-logo.png"
          },
          "location": {
            "country": "United States",
            "region": "California"
          },
          "media": [
            {
              "id": 1,
              "url": "https://example.com/media.jpg",
              "type": "image",
              "description": "Media description",
              "views": 1000
            }
          ],
          "is_saved": true
        }
      ]
    },
    "you_might_like": {
      "items": [
        {
          "id": 2504,
          "title": "Recommended Campaign",
          "description": "You might like this campaign",
          "cover_image": "https://example.com/image2.jpg",
          "launch_date": "2024-02-20 14:30:00",
          "brand": {
            "id": 2,
            "name": "Another Brand",
            "logo": null
          },
          "agency": {
            "id": 2,
            "name": "Another Agency",
            "logo": null
          },
          "location": {
            "country": "United Kingdom",
            "region": "London"
          },
          "media": [],
          "is_saved": false
        }
      ]
    },
    "trending_campaigns": {
      "items": [
        {
          "id": 2505,
          "title": "Trending Campaign",
          "description": "This is trending",
          "cover_image": "https://example.com/image3.jpg",
          "launch_date": "2024-03-10 09:00:00",
          "brand": {
            "id": 3,
            "name": "Trending Brand",
            "logo": "https://example.com/trending-logo.png"
          },
          "agency": {
            "id": 3,
            "name": "Trending Agency",
            "logo": null
          },
          "location": {
            "country": "Canada",
            "region": "Toronto"
          },
          "media": [
            {
              "id": 2,
              "url": "https://example.com/video.mp4",
              "type": "video",
              "description": "Video content",
              "views": 5000
            }
          ],
          "is_saved": 1
        }
      ]
    },
    "saved_campaigns": {
      "items": [
        {
          "id": 2506,
          "title": "Saved Campaign",
          "description": "This campaign is saved",
          "cover_image": "https://example.com/image4.jpg",
          "launch_date": "2024-04-05 16:45:00",
          "brand": {
            "id": 4,
            "name": "Saved Brand",
            "logo": null
          },
          "agency": {
            "id": 4,
            "name": "Saved Agency",
            "logo": null
          },
          "location": {
            "country": "Australia",
            "region": "Sydney"
          },
          "media": [],
          "is_saved": true
        }
      ]
    },
    "case_studies": [
      {
        "id": 1,
        "title": "Case Study Title",
        "description": "Case study description",
        "image": "https://example.com/case-study.jpg",
        "created_at": "2024-01-01 00:00:00"
      }
    ]
  }
}
```

### Structure 2: Direct Arrays (Alternative Format)
```json
{
  "success": true,
  "message": "Home page data retrieved successfully",
  "data": {
    "my_campaigns": [
      {
        "id": 2503,
        "title": "My Campaign",
        // ... campaign data
      }
    ],
    "trending_campaigns": [
      {
        "id": 2505,
        "title": "Trending Campaign",
        // ... campaign data
      }
    ],
    "you_might_like": [
      {
        "id": 2504,
        "title": "Recommended Campaign",
        // ... campaign data
      }
    ],
    "saved_campaigns": [
      {
        "id": 2506,
        "title": "Saved Campaign",
        // ... campaign data
      }
    ],
    "case_studies": [
      {
        "id": 1,
        "title": "Case Study",
        // ... case study data
      }
    ]
  }
}
```

### Structure 3: Flat Object (Alternative Format)
Some responses may have flat structure with `brand_name` instead of nested `brand` object:
```json
{
  "success": true,
  "message": "Home page data retrieved successfully",
  "data": {
    "trending_campaigns": {
      "items": [
        {
          "id": 2503,
          "title": "Campaign Title",
          "brand_name": "Brand Name",
          "agency_name": "Agency Name",
          "cover_image": "https://example.com/image.jpg",
          "is_saved": 1
        }
      ]
    }
  }
}
```

## Error Responses

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied",
  "data": null
}
```

**Possible Causes:**
1. **Missing Authentication**: The endpoint may require authentication
2. **Invalid User ID**: The `user_id` parameter might be invalid
3. **Server Configuration**: The server might be blocking the request
4. **CORS Issues**: Cross-origin requests might be blocked

**Solutions:**
1. **Check Authentication**: Ensure you're sending the authentication token
   - In Postman: Add `Authorization: Bearer {token}` header
   - Check if the user is logged in
2. **Verify User ID**: Ensure the `user_id` exists in the database
3. **Check Server Logs**: Review server-side logs for specific error messages
4. **Test with Different User ID**: Try with `user_id=0` for unauthenticated access

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access",
  "data": null
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Endpoint not found",
  "data": null
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "data": null
}
```

## Data Collections Explained

### 1. `my_campaigns`
- **Description**: Campaigns created by or assigned to the user
- **Structure**: Can be an array or object with `items` array
- **Use Case**: Display campaigns the user owns or manages

### 2. `you_might_like`
- **Description**: Recommended campaigns based on user preferences
- **Structure**: Can be an array or object with `items` array
- **Use Case**: Personalized recommendations for the user

### 3. `trending_campaigns`
- **Description**: Currently trending/popular campaigns
- **Structure**: Can be an array or object with `items` array
- **Use Case**: Show what's popular right now

### 4. `saved_campaigns`
- **Description**: Campaigns the user has bookmarked/saved
- **Structure**: Can be an array or object with `items` array
- **Use Case**: Display user's saved bookmarks

### 5. `case_studies`
- **Description**: Case study content (may have different structure)
- **Structure**: Usually a direct array
- **Use Case**: Educational or detailed campaign analysis

## How the Frontend Handles This Response

The frontend code in `src/app/page.tsx` handles multiple response structures:

1. **Checks if data is an array**: If `data` is directly an array, uses it as trending campaigns
2. **Checks for object structure**: If `data` is an object, extracts each collection
3. **Handles nested `items`**: Looks for `items` array within each collection object
4. **Handles direct arrays**: Uses collections directly if they're arrays
5. **Transforms data**: Converts API format to component format using `transformCampaign()`

## Testing in Postman

### Step 1: Set Up Request
1. Method: `GET`
2. URL: `{{base_url}}/get_home_page_data.php`
3. Add Query Parameter: `user_id` = `1`

### Step 2: Add Headers (if required)
```
Authorization: Bearer {your_token}
Content-Type: application/json
```

### Step 3: Send Request
Click "Send" button

### Step 4: Check Response
- **Status**: Should be `200 OK` for success
- **Body**: Should contain JSON with `success: true` and `data` object
- **Structure**: Check if collections have `items` arrays or are direct arrays

## Troubleshooting 403 Forbidden Error

### 1. Check Authentication
```bash
# In Postman Headers tab, add:
Authorization: Bearer {your_auth_token}
```

### 2. Verify User ID
- Ensure the `user_id` exists in the database
- Try with `user_id=0` for unauthenticated access
- Check if user has proper permissions

### 3. Check Server Configuration
- Verify the endpoint exists on the server
- Check server logs for specific error messages
- Ensure CORS is properly configured

### 4. Test with cURL
```bash
curl -X GET "https://lightsteelblue-walrus-768466.hostingersite.com/api/get_home_page_data.php?user_id=1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Check API Base URL
Ensure you're using the correct base URL:
- Production: `https://lightsteelblue-walrus-768466.hostingersite.com/api`
- The endpoint should be: `/get_home_page_data.php`

## Expected Response Fields

### Campaign Object Fields
- `id` (number): Unique campaign identifier
- `title` (string): Campaign title
- `description` (string): Campaign description
- `cover_image` (string): URL to cover image
- `launch_date` (string): Date in format "YYYY-MM-DD HH:MM:SS"
- `brand` (object | string): Brand information
  - If object: `{ id, name, logo }`
  - If string: Brand name directly
- `agency` (object | string): Agency information
  - If object: `{ id, name, logo }`
  - If string: Agency name directly
- `location` (object): Location information
  - `country` (string)
  - `region` (string)
- `media` (array): Media items array
- `is_saved` (boolean | number): Whether campaign is saved (true/false or 1/0)

## Notes

1. **Flexible Structure**: The API may return data in different formats (array vs object with items)
2. **Optional Collections**: Not all collections may be present in every response
3. **Null Handling**: Some fields may be `null` or `undefined`
4. **Date Format**: Dates are typically in "YYYY-MM-DD HH:MM:SS" format
5. **Image URLs**: May be relative paths or full URLs
6. **Boolean Values**: `is_saved` can be boolean (`true`/`false`) or number (`1`/`0`)

## Integration in Frontend

The frontend service method:
```typescript
// lib/services/campaign.service.ts
async getHomePageData(userId: number): Promise<ApiResponse<{
  my_campaigns?: Campaign[];
  you_might_like?: Campaign[];
  trending_campaigns?: Campaign[];
  saved_campaigns?: Campaign[];
  case_studies?: any[];
}>>
```

Usage:
```typescript
const response = await campaignService.getHomePageData(userId);
if (response.success && response.data) {
  const { my_campaigns, you_might_like, trending_campaigns, saved_campaigns, case_studies } = response.data;
  // Process each collection
}
```

---

**Last Updated**: January 2025  
**API Base URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`  
**Endpoint**: `/get_home_page_data.php`


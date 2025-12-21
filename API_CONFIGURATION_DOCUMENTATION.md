# API Configuration Documentation

## 📋 Table of Contents
1. [Base Configuration](#base-configuration)
2. [Registration & Authentication APIs](#registration--authentication-apis)
3. [Campaign APIs](#campaign-apis)
4. [Service Layer Architecture](#service-layer-architecture)
5. [Authentication Flow](#authentication-flow)
6. [Error Handling](#error-handling)
7. [Type Definitions](#type-definitions)

---

## Base Configuration

### API Base URL
**File**: `lib/config/api.config.ts`

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lightsteelblue-walrus-768466.hostingersite.com/api',
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
  }
} as const;
```

### Environment Variable
- **Variable Name**: `NEXT_PUBLIC_API_BASE_URL`
- **Default Value**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`
- **Usage**: Set in `.env.local` to override the default base URL

### Configuration Details
- **Base URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`
- **Timeout**: 30 seconds
- **Content-Type**: `application/json`
- **Authentication**: Bearer token (sent via `Authorization` header)

---

## Registration & Authentication APIs

### 1. User Registration (Signup)

**Endpoint**: `/signup.php`  
**Method**: `POST`  
**Service**: `UserService.signup()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```typescript
interface SignupRequest {
  email: string;                    // Required
  password: string;                  // Required (min 6 characters)
  signin_method: string;             // Required (e.g., "email")
  full_name?: string;                // Optional
  user_name?: string;                // Optional
  subscription_type?: string;        // Optional
  account_type?: string;             // Optional
  fcm_token?: string;                // Optional (Firebase Cloud Messaging)
  gender?: string;                   // Optional
}
```

#### Example Request
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "signin_method": "email",
  "full_name": "John Doe"
}
```

#### Response Format
```typescript
interface ApiResponse<User> {
  success: boolean;
  message: string;
  data: User | null;
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "user@example.com",
    "user_name": "johndoe",
    "signin_method": "email",
    "subscription_type": "free",
    "account_type": "basic",
    "status": 1,
    "created_at": "2025-01-01 00:00:00",
    "updated_at": "2025-01-01 00:00:00"
  }
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.signup({
  email: "user@example.com",
  password: "securepassword123",
  signin_method: "email",
  full_name: "John Doe"
});
```

---

### 2. User Login

**Endpoint**: `/login.php`  
**Method**: `POST`  
**Service**: `UserService.login()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```typescript
interface LoginRequest {
  email?: string;                   // Required for email login
  user_name?: string;                // Required for username login
  password: string;                  // Required
  signin_method: string;             // Required ("email" or "username")
  type?: string;                     // Optional (API may require this)
}
```

#### Email Login Example
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "signin_method": "email",
  "type": "email"
}
```

#### Username Login Example
```json
{
  "user_name": "johndoe",
  "password": "securepassword123",
  "signin_method": "username",
  "type": "username"
}
```

#### Response Format
```typescript
interface ApiResponse<User> {
  success: boolean;
  message: string;
  data: User | null;
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "user@example.com",
    "user_name": "johndoe",
    "signin_method": "email",
    "subscription_type": "premium",
    "account_type": "pro",
    "status": 1,
    "last_login_at": "2025-01-15 10:30:00",
    "created_at": "2025-01-01 00:00:00",
    "updated_at": "2025-01-15 10:30:00"
  }
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

// Email login
const response = await userService.login({
  email: "user@example.com",
  password: "securepassword123",
  signin_method: "email",
  type: "email"
});

// Username login
const response = await userService.login({
  user_name: "johndoe",
  password: "securepassword123",
  signin_method: "username",
  type: "username"
});
```

---

### 3. User Logout

**Endpoint**: `/logout.php`  
**Method**: `POST`  
**Service**: `UserService.logout()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```json
{
  "user_id": 1
}
```

#### Response Format
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.logout(userId);
```

---

### 4. Get User Data

**Endpoint**: `/get_user_data.php`  
**Method**: `GET`  
**Service**: `UserService.getUserData()`  
**File**: `lib/services/user.service.ts`

#### Query Parameters
- `user_id` (required): The user's ID

#### Response Format
```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "user@example.com",
    "user_name": "johndoe",
    "signin_method": "email",
    "subscription_type": "premium",
    "account_type": "pro",
    "status": 1,
    "created_at": "2025-01-01 00:00:00",
    "updated_at": "2025-01-15 10:30:00"
  }
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.getUserData(userId);
```

---

### 5. Update User Data

**Endpoint**: `/update_user_data.php`  
**Method**: `POST`  
**Service**: `UserService.updateUserData()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```json
{
  "user_id": 1,
  "full_name": "John Updated",
  "email": "newemail@example.com",
  "gender": "male"
  // ... other user fields
}
```

#### Response Format
```json
{
  "success": true,
  "message": "User data updated successfully",
  "data": null
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.updateUserData(userId, {
  full_name: "John Updated",
  email: "newemail@example.com"
});
```

---

### 6. Send Verification Code

**Endpoint**: `/send_signup_verification_code.php`  
**Method**: `POST`  
**Service**: `UserService.sendVerificationCode()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Response Format
```json
{
  "success": true,
  "message": "Verification code sent",
  "data": {
    "verification_code": "123456"
  }
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.sendVerificationCode({
  email: "user@example.com"
});
```

---

### 7. Reset Password

**Endpoint**: `/reset_password.php`  
**Method**: `POST`  
**Service**: `UserService.resetPassword()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```typescript
interface ResetPasswordRequest {
  user_id?: number;                  // Optional
  email?: string;                    // Optional
  old_password?: string;             // Optional
  password: string;                  // Required
  confirm_password: string;         // Required
}
```

#### Example Request
```json
{
  "user_id": 1,
  "old_password": "oldpassword123",
  "password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

#### Response Format
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": null
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.resetPassword({
  user_id: 1,
  old_password: "oldpassword123",
  password: "newpassword123",
  confirm_password: "newpassword123"
});
```

---

### 8. Delete User Account

**Endpoint**: `/delete_user_account.php`  
**Method**: `POST`  
**Service**: `UserService.deleteAccount()`  
**File**: `lib/services/user.service.ts`

#### Request Body
```json
{
  "user_id": 1,
  "reason": "No longer using the service"  // Optional
}
```

#### Response Format
```json
{
  "success": true,
  "message": "Account deleted successfully",
  "data": null
}
```

#### Usage Example
```typescript
import { userService } from '@/lib/services/user.service';

const response = await userService.deleteAccount(userId, "No longer using the service");
```

---

## Campaign APIs

### 1. Get All Campaigns

**Endpoint**: `/get_all_campaigns.php`  
**Method**: `GET`  
**Service**: `CampaignService.getAllCampaigns()`  
**File**: `lib/services/campaign.service.ts`

#### Query Parameters
- `user_id` (optional): Filter campaigns based on user preferences

#### Response Format
```typescript
interface ApiResponse<Campaign[]> {
  success: boolean;
  message: string;
  data: Campaign[] | null;
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Campaigns retrieved successfully",
  "data": [
    {
      "id": 2503,
      "title": "Campaign Title",
      "description": "Campaign description",
      "cover_image": "https://example.com/image.jpg",
      "launch_date": "2024-01-15",
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
      "is_saved": false
    }
  ]
}
```

#### Usage Example
```typescript
import { campaignService } from '@/lib/services/campaign.service';

// Get all campaigns
const response = await campaignService.getAllCampaigns();

// Get all campaigns for a specific user
const response = await campaignService.getAllCampaigns(userId);
```

---

### 2. Get Single Campaign

**Endpoint**: `/get_campaign.php`  
**Method**: `GET`  
**Service**: `CampaignService.getCampaign()`  
**File**: `lib/services/campaign.service.ts`

#### Query Parameters
- `campaign_id` (required): The campaign's ID
- `user_id` (optional): User ID for personalized data (e.g., saved status)

#### Response Format
```typescript
interface ApiResponse<Campaign> {
  success: boolean;
  message: string;
  data: Campaign | null;
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Campaign retrieved successfully",
  "data": {
    "id": 2503,
    "title": "Campaign Title",
    "description": "Full campaign description...",
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
        "url": "https://example.com/media1.jpg",
        "type": "image",
        "description": "Media description",
        "views": 1000
      },
      {
        "id": 2,
        "url": "https://example.com/video.mp4",
        "type": "video",
        "description": "Video description",
        "views": 500
      }
    ],
    "is_saved": true,
    "my_campaigns_folder_saved": [1, 2],
    "bookmarks_lists_saved": [3]
  }
}
```

#### Usage Example
```typescript
import { campaignService } from '@/lib/services/campaign.service';

// Get campaign without user context
const response = await campaignService.getCampaign(2503);

// Get campaign with user context
const response = await campaignService.getCampaign(2503, userId);
```

---

### 3. Get Home Page Data

**Endpoint**: `/get_home_page_data.php`  
**Method**: `GET`  
**Service**: `CampaignService.getHomePageData()`  
**File**: `lib/services/campaign.service.ts`

#### Query Parameters
- `user_id` (required): User ID for personalized campaign collections

#### Response Format
```typescript
interface ApiResponse<{
  my_campaigns?: Campaign[];
  you_might_like?: Campaign[];
  trending_campaigns?: Campaign[];
  saved_campaigns?: Campaign[];
  case_studies?: any[];
}> {
  success: boolean;
  message: string;
  data: {
    my_campaigns?: Campaign[];
    you_might_like?: Campaign[];
    trending_campaigns?: Campaign[];
    saved_campaigns?: Campaign[];
    case_studies?: any[];
  } | null;
}
```

#### Example Response Structure
```json
{
  "success": true,
  "message": "Home page data retrieved successfully",
  "data": {
    "my_campaigns": {
      "items": [
        {
          "id": 2503,
          "title": "My Campaign",
          // ... campaign data
        }
      ]
    },
    "you_might_like": {
      "items": [
        {
          "id": 2504,
          "title": "Recommended Campaign",
          // ... campaign data
        }
      ]
    },
    "trending_campaigns": {
      "items": [
        {
          "id": 2505,
          "title": "Trending Campaign",
          // ... campaign data
        }
      ]
    },
    "saved_campaigns": {
      "items": [
        {
          "id": 2506,
          "title": "Saved Campaign",
          // ... campaign data
        }
      ]
    },
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

#### Usage Example
```typescript
import { campaignService } from '@/lib/services/campaign.service';

const response = await campaignService.getHomePageData(userId);

// Access different collections
const myCampaigns = response.data?.my_campaigns;
const trendingCampaigns = response.data?.trending_campaigns;
const youMightLike = response.data?.you_might_like;
const savedCampaigns = response.data?.saved_campaigns;
const caseStudies = response.data?.case_studies;
```

---

### 4. Get Media

**Endpoint**: `/get_media.php`  
**Method**: `GET`  
**Service**: `CampaignService.getMedia()`  
**File**: `lib/services/campaign.service.ts`

#### Query Parameters
- `media_id` (required): The media item's ID

#### Response Format
```typescript
interface ApiResponse<Media> {
  success: boolean;
  message: string;
  data: Media | null;
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Media retrieved successfully",
  "data": {
    "id": 1,
    "url": "https://example.com/media.jpg",
    "type": "image",
    "description": "Media description",
    "views": 1000
  }
}
```

#### Usage Example
```typescript
import { campaignService } from '@/lib/services/campaign.service';

const response = await campaignService.getMedia(mediaId);
```

---

## Service Layer Architecture

### API Service (`lib/services/api.service.ts`)

The `ApiService` class provides a centralized HTTP client using Axios with the following features:

#### Features
1. **Base Configuration**: Uses `API_CONFIG` for base URL, timeout, and headers
2. **Request Interceptor**: Automatically adds authentication token from `localStorage`
3. **Response Interceptor**: Handles errors globally
4. **URL Normalization**: Ensures URLs start with `/` for proper path joining
5. **SSR Safety**: Checks for `window` object before accessing `localStorage`

#### Methods
- `get<T>(url: string, params?: Record<string, any>)`: GET request
- `post<T>(url: string, data?: any)`: POST request
- `put<T>(url: string, data?: any)`: PUT request
- `delete<T>(url: string)`: DELETE request

#### Authentication
The service automatically includes the authentication token in the `Authorization` header:
```typescript
Authorization: Bearer {token}
```

The token is retrieved from `localStorage.getItem('auth_token')` (browser only).

---

### User Service (`lib/services/user.service.ts`)

Provides methods for user authentication and management:

- `login(data: LoginRequest)`: User login
- `signup(data: SignupRequest)`: User registration
- `logout(userId: number)`: User logout
- `getUserData(userId: number)`: Get user information
- `updateUserData(userId: number, updates: Partial<User>)`: Update user information
- `sendVerificationCode(data: SendVerificationCodeRequest)`: Send verification code
- `resetPassword(data: ResetPasswordRequest)`: Reset user password
- `deleteAccount(userId: number, reason?: string)`: Delete user account

---

### Campaign Service (`lib/services/campaign.service.ts`)

Provides methods for campaign data retrieval:

- `getCampaign(campaignId: number, userId?: number)`: Get single campaign
- `getAllCampaigns(userId?: number)`: Get all campaigns
- `getHomePageData(userId: number)`: Get home page campaign collections
- `getMedia(mediaId: number)`: Get media item

---

## Authentication Flow

### 1. Registration Flow
```
User fills registration form
  ↓
UserService.signup() called
  ↓
POST /signup.php
  ↓
API returns User object
  ↓
User data stored in localStorage
  ↓
Auth token (user.id) stored in localStorage
  ↓
User redirected to home page
```

### 2. Login Flow
```
User fills login form (email or username)
  ↓
UserService.login() called
  ↓
POST /login.php
  ↓
API returns User object
  ↓
User data stored in localStorage
  ↓
Auth token (user.id) stored in localStorage
  ↓
User redirected to home page
```

### 3. Authenticated Request Flow
```
Component calls service method
  ↓
Service calls apiService.get/post/etc.
  ↓
Request interceptor checks localStorage for token
  ↓
Token added to Authorization header
  ↓
Request sent to API
  ↓
Response interceptor handles response/errors
  ↓
Data returned to component
```

### 4. Logout Flow
```
User clicks logout
  ↓
UserService.logout() called
  ↓
POST /logout.php
  ↓
localStorage cleared
  ↓
User state cleared
  ↓
User redirected to login page
```

---

## Error Handling

### Error Handler (`lib/utils/error-handler.ts`)

The application uses a centralized error handling system:

#### Error Types
```typescript
type ErrorType = 
  | 'NETWORK_ERROR'
  | 'API_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';
```

#### Error Handling Methods
- `handleApiError(error: unknown)`: Converts errors to `AppError` format
- `getUserFriendlyMessage(error: AppError)`: Returns user-friendly error messages
- `logError(error: AppError, context?: string)`: Logs errors with context

#### Error Response Format
```typescript
interface AppError {
  type: ErrorType;
  message: string;
  originalError?: any;
  statusCode?: number;
}
```

#### Common Error Scenarios

1. **Network Error**: Connection failed, timeout, CORS issues
2. **API Error**: Server returned error response (4xx, 5xx)
3. **Validation Error**: Invalid request data
4. **Authentication Error**: Invalid credentials, expired token
5. **Authorization Error**: Insufficient permissions
6. **Not Found**: Resource doesn't exist (404)
7. **Server Error**: Internal server error (500)

---

## Type Definitions

### User Types (`lib/types/api.types.ts`)

```typescript
interface User {
  id: number;
  full_name: string;
  email: string;
  user_name: string;
  signin_method: string;
  subscription_type: string;
  account_type: string;
  fcm_token?: string;
  gender?: string;
  last_login_at?: string;
  status: number;
  created_at: string;
  updated_at: string;
}
```

### Campaign Types

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

### API Response Type

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}
```

---

## Best Practices

### 1. Always Use Services
Don't call `apiService` directly from components. Use the appropriate service (`UserService`, `CampaignService`).

### 2. Handle Errors
Always wrap API calls in try-catch blocks and use `ErrorHandler` for consistent error handling.

### 3. Type Safety
Use TypeScript interfaces for request and response types to ensure type safety.

### 4. Authentication
The authentication token is automatically added to requests. Ensure `localStorage` has the token before making authenticated requests.

### 5. SSR Considerations
Always check for `typeof window !== 'undefined'` before accessing browser APIs like `localStorage`.

### 6. Loading States
Show loading indicators while API requests are in progress.

### 7. User Feedback
Provide user-friendly error messages and success notifications using toast notifications.

---

## Testing

### Manual Testing
1. Use the test page at `/test-services` to test individual services
2. Check browser console for API logs
3. Check Network tab in DevTools for request/response details

### API Testing
Use the Postman collection to test API endpoints directly:
- Base URL: `https://lightsteelblue-walrus-768466.hostingersite.com/api`
- All endpoints are documented in the Postman collection

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the API server has proper CORS headers configured
   - Check `CORS_FIX_GUIDE.md` for server-side configuration

2. **401 Unauthorized**
   - Check if auth token exists in `localStorage`
   - Verify token is being sent in `Authorization` header
   - Ensure user is logged in

3. **404 Not Found**
   - Verify the endpoint URL is correct
   - Check if the API endpoint exists on the server
   - Ensure base URL is correct

4. **500 Internal Server Error**
   - Check server logs
   - Verify request payload format
   - Ensure required fields are provided

5. **Network Timeout**
   - Check network connectivity
   - Verify API server is accessible
   - Increase timeout if needed (default: 30 seconds)

---

## Additional Resources

- **API Configuration**: `lib/config/api.config.ts`
- **API Service**: `lib/services/api.service.ts`
- **User Service**: `lib/services/user.service.ts`
- **Campaign Service**: `lib/services/campaign.service.ts`
- **Type Definitions**: `lib/types/api.types.ts`
- **Error Handler**: `lib/utils/error-handler.ts`
- **Auth Context**: `lib/contexts/auth-context.tsx`

---

**Last Updated**: January 2025  
**API Base URL**: `https://lightsteelblue-walrus-768466.hostingersite.com/api`




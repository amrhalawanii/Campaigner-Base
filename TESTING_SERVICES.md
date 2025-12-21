# Service Testing Guide

This document explains how to test each service individually before integrating them into components.

## Test Page

A comprehensive test page has been created at `/test-services` that allows you to test all services through a web interface.

### Accessing the Test Page

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/test-services`

## Available Tests

### 1. API Service Tests

#### Configuration Check
- Verifies that the API configuration is loaded correctly
- Shows the base URL, timeout, and headers
- Checks if an auth token exists in localStorage

#### GET Request Test
- Tests a basic GET request to the API
- Uses `/get_user_data.php` endpoint (will show expected error if not authenticated)
- Verifies network connectivity and API response handling

#### POST Request Test
- Tests a basic POST request to the API
- Verifies request body handling and response parsing

#### Error Handling Test
- Intentionally calls a non-existent endpoint
- Verifies that error handling works correctly
- Tests network error scenarios

### 2. User Service Tests

#### Login Test
- Tests the login functionality directly through the User Service
- Requires email and password in the test credentials section
- Verifies the login API endpoint (`/login.php`)
- Shows the response data structure

### 3. Auth Context Tests

#### Login Test
- Tests login through the Auth Context (includes state management)
- Requires email and password in the test credentials section
- Verifies:
  - API call execution
  - User state update
  - localStorage persistence
  - Context state synchronization

#### Logout Test
- Tests logout functionality
- Verifies:
  - API call to logout endpoint
  - State clearing
  - localStorage cleanup

#### State Check
- Displays current authentication state
- Shows:
  - Authentication status
  - User data (if authenticated)
  - localStorage contents
  - Token presence

## Testing Workflow

### Recommended Testing Order

1. **Start with API Service Configuration**
   - Click "Check Configuration" to verify API settings

2. **Test Basic API Connectivity**
   - Click "Test GET Request" to verify network connectivity
   - Check if the API base URL is correct

3. **Test User Service Login**
   - Enter test credentials
   - Click "Test Login" under User Service
   - Verify the API response structure

4. **Test Auth Context Login**
   - Use the same credentials
   - Click "Test Login" under Auth Context
   - Verify state is updated and persisted

5. **Test State Persistence**
   - Click "Check State" to verify localStorage
   - Refresh the page and check state again

6. **Test Logout**
   - Click "Test Logout"
   - Verify state is cleared

### Interpreting Results

#### Success Status (Green)
- Test executed successfully
- API responded as expected
- State updated correctly

#### Error Status (Red)
- Network error (check API base URL)
- API returned an error (check credentials/endpoints)
- Unexpected behavior occurred

#### Test Details
- Click "View Details" to see full response data
- Check timestamps to see when tests were executed
- Review error messages for debugging

## Manual Testing Checklist

- [ ] API configuration loads correctly
- [ ] GET requests work (or show expected errors)
- [ ] POST requests work
- [ ] Error handling works correctly
- [ ] User service login works with valid credentials
- [ ] Auth context login updates state
- [ ] Auth context login persists to localStorage
- [ ] Auth context logout clears state
- [ ] State persists across page refreshes
- [ ] Token is stored correctly in localStorage

## Troubleshooting

### Network Errors
- Verify the API base URL in `lib/config/api.config.ts`
- Check if the API server is running
- Verify CORS settings on the API server

### Authentication Errors
- Verify credentials are correct
- Check if the login endpoint path is correct (`/login.php`)
- Verify the API response structure matches the expected format

### State Not Persisting
- Check browser console for localStorage errors
- Verify localStorage is enabled in your browser
- Check if the user data structure matches the expected format

## Next Steps

After all tests pass:
1. Integrate services into components
2. Test the full authentication flow in the sign-in page
3. Verify logout functionality in the user dropdown
4. Test edge cases and error scenarios



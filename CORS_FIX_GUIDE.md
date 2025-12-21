# CORS Error Fix Guide

## Issue
The console shows a CORS (Cross-Origin Resource Sharing) error:
```
Access to XMLHttpRequest at 'https://lightsteelblue-walrus-768466.hostingersite.com/api/get_all_campaigns.php' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## What is CORS?
CORS is a security feature that prevents web pages from making requests to a different domain than the one serving the web page. Your frontend at `http://localhost:3000` is trying to access the API at `https://lightsteelblue-walrus-768466.hostingersite.com`, which is a different origin.

## Solution
The CORS headers need to be configured on the **API server** (backend), not in the frontend code.

### Option 1: Configure CORS on the API Server (Recommended)

Add these headers to your PHP API responses:

```php
<?php
// Add at the top of your PHP files (before any output)
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

### Option 2: Allow All Origins (Development Only - Not Recommended for Production)

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
?>
```

### Option 3: Use a Proxy (Development Workaround)

If you can't modify the API server, you can use Next.js API routes as a proxy:

1. Create `src/app/api/proxy/[...path]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const apiPath = path.join('/');
  const searchParams = request.nextUrl.searchParams;
  
  const apiUrl = `https://lightsteelblue-walrus-768466.hostingersite.com/api/${apiPath}?${searchParams.toString()}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Proxy error' },
      { status: 500 }
    );
  }
}
```

Then update `lib/config/api.config.ts`:
```typescript
BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy',
```

## Testing
After fixing CORS:
1. Clear browser cache
2. Restart your dev server
3. Try the request again
4. Check Network tab - the request should succeed

## Production Considerations
For production, you should:
1. Specify exact allowed origins (not `*`)
2. Use HTTPS for both frontend and API
3. Configure CORS properly on the server
4. Consider using environment variables for allowed origins


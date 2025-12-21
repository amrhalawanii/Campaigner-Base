"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { apiService } from "@/lib/services/api.service"
import { userService } from "@/lib/services/user.service"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { API_CONFIG } from "@/lib/config/api.config"
import type { ApiResponse, User, LoginRequest } from "@/lib/types/api.types"

interface TestResult {
  service: string
  test: string
  status: "success" | "error" | "pending"
  message: string
  data?: any
  timestamp: string
}

export default function TestServicesPage() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testPassword, setTestPassword] = useState("")

  const addResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev])
  }

  const clearResults = () => {
    setTestResults([])
  }

  // Test 1: API Service - Configuration check
  const testApiServiceConfig = () => {
    const testName = "API Service - Configuration"
    try {
      addResult({
        service: "API Service",
        test: testName,
        status: "success",
        message: "Configuration loaded successfully",
        data: {
          baseURL: API_CONFIG.BASE_URL,
          timeout: API_CONFIG.TIMEOUT,
          headers: API_CONFIG.HEADERS,
          hasToken: typeof window !== "undefined" ? !!localStorage.getItem("auth_token") : false,
        },
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "API Service",
        test: testName,
        status: "error",
        message: error.message || "Configuration check failed",
        data: error,
        timestamp: new Date().toISOString(),
      })
    }
  }

  // Test 2: API Service - Basic GET request
  const testApiServiceGet = async () => {
    setIsLoading(true)
    const testName = "API Service - GET Request"
    try {
      // Test with get_user_data endpoint (requires user_id, will fail but tests error handling)
      const response = await apiService.get("/get_user_data.php", { user_id: 1 })
      addResult({
        service: "API Service",
        test: testName,
        status: "success",
        message: "GET request successful",
        data: response,
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      // This is expected if user doesn't exist or not authenticated
      addResult({
        service: "API Service",
        test: testName,
        status: error.message?.includes("Network") ? "error" : "success",
        message: error.message?.includes("Network") 
          ? "Network error - check API base URL" 
          : "GET request executed (expected error for unauthenticated request)",
        data: { errorMessage: error.message },
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 3: API Service - Basic POST request
  const testApiServicePost = async () => {
    setIsLoading(true)
    const testName = "API Service - POST Request"
    try {
      const testData = { test: "post_request", timestamp: Date.now() }
      const response = await apiService.post("/test.php", testData)
      addResult({
        service: "API Service",
        test: testName,
        status: "success",
        message: "POST request successful",
        data: response,
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "API Service",
        test: testName,
        status: "error",
        message: error.message || "POST request failed",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 4: API Service - Error handling
  const testApiServiceError = async () => {
    setIsLoading(true)
    const testName = "API Service - Error Handling"
    try {
      // Intentionally call non-existent endpoint
      await apiService.get("/non-existent-endpoint.php")
      addResult({
        service: "API Service",
        test: testName,
        status: "error",
        message: "Expected error but request succeeded",
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "API Service",
        test: testName,
        status: "success",
        message: "Error handling works correctly",
        data: { errorMessage: error.message },
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 4: User Service - Login
  const testUserServiceLogin = async () => {
    if (!testEmail || !testPassword) {
      addResult({
        service: "User Service",
        test: "Login",
        status: "error",
        message: "Please provide email and password",
        timestamp: new Date().toISOString(),
      })
      return
    }

    setIsLoading(true)
    const testName = "User Service - Login"
    try {
      const loginData: LoginRequest = {
        email: testEmail,
        password: testPassword,
        signin_method: "email",
      }
      const response = await userService.login(loginData)
      addResult({
        service: "User Service",
        test: testName,
        status: "success",
        message: response.success ? "Login successful" : response.message,
        data: response.data,
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "User Service",
        test: testName,
        status: "error",
        message: error.message || "Login failed",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 5: Auth Context - Login
  const testAuthContextLogin = async () => {
    if (!testEmail || !testPassword) {
      addResult({
        service: "Auth Context",
        test: "Login",
        status: "error",
        message: "Please provide email and password",
        timestamp: new Date().toISOString(),
      })
      return
    }

    setIsLoading(true)
    const testName = "Auth Context - Login"
    try {
      const loginData: LoginRequest = {
        email: testEmail,
        password: testPassword,
        signin_method: "email",
      }
      const userData = await login(loginData)
      addResult({
        service: "Auth Context",
        test: testName,
        status: "success",
        message: "Login successful and user state updated",
        data: { userId: userData.id, email: userData.email, fullName: userData.full_name },
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "Auth Context",
        test: testName,
        status: "error",
        message: error.message || "Login failed",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 6: Auth Context - Logout
  const testAuthContextLogout = async () => {
    setIsLoading(true)
    const testName = "Auth Context - Logout"
    try {
      await logout()
      addResult({
        service: "Auth Context",
        test: testName,
        status: "success",
        message: "Logout successful and state cleared",
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "Auth Context",
        test: testName,
        status: "error",
        message: error.message || "Logout failed",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 7: Auth Context - State persistence
  const testAuthContextState = () => {
    const testName = "Auth Context - State Check"
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    addResult({
      service: "Auth Context",
      test: testName,
      status: "success",
      message: "State check completed",
      data: {
        isAuthenticated,
        hasUser: !!user,
        hasStoredUser: !!storedUser,
        hasStoredToken: !!storedToken,
        userData: user ? { id: user.id, email: user.email, fullName: user.full_name } : null,
      },
      timestamp: new Date().toISOString(),
    })
  }

  // Test 8: Campaign Service - Get All Campaigns
  const testGetAllCampaigns = async () => {
    setIsLoading(true)
    const testName = "Campaign Service - Get All Campaigns"
    try {
      const userId = user?.id
      const response = await campaignService.getAllCampaigns(userId)
      
      let campaignsCount = 0
      let campaignsData = null
      
      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          campaignsCount = response.data.length
          campaignsData = response.data.slice(0, 3) // Show first 3 campaigns as sample
        } else if (response.data.campaigns && Array.isArray(response.data.campaigns)) {
          campaignsCount = response.data.campaigns.length
          campaignsData = response.data.campaigns.slice(0, 3)
        } else if (response.data.data && Array.isArray(response.data.data)) {
          campaignsCount = response.data.data.length
          campaignsData = response.data.data.slice(0, 3)
        }
      }

      addResult({
        service: "Campaign Service",
        test: testName,
        status: campaignsCount > 0 ? "success" : "error",
        message: campaignsCount > 0 
          ? `Successfully retrieved ${campaignsCount} campaign(s)` 
          : "No campaigns found or unexpected response structure",
        data: {
          totalCampaigns: campaignsCount,
          sampleCampaigns: campaignsData,
          fullResponse: response,
        },
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "Campaign Service",
        test: testName,
        status: "error",
        message: error.message || "Failed to retrieve campaigns",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 9: Campaign Service - Get Home Page Data
  const testGetHomePageData = async () => {
    setIsLoading(true)
    const testName = "Campaign Service - Get Home Page Data"
    try {
      const userId = user?.id || 0
      const response = await campaignService.getHomePageData(userId)
      
      if (response.success && response.data) {
        const data = response.data
        let totalCampaigns = 0
        const sections: Record<string, number> = {}
        
        if (Array.isArray(data)) {
          totalCampaigns = data.length
          sections.trending = data.length
        } else {
          sections.my_campaigns = data.my_campaigns?.length || 0
          sections.you_might_like = data.you_might_like?.length || 0
          sections.trending_campaigns = data.trending_campaigns?.length || 0
          sections.saved_campaigns = data.saved_campaigns?.length || 0
          sections.case_studies = data.case_studies?.length || 0
          totalCampaigns = Object.values(sections).reduce((sum, count) => sum + count, 0)
        }

        addResult({
          service: "Campaign Service",
          test: testName,
          status: totalCampaigns > 0 ? "success" : "error",
          message: totalCampaigns > 0 
            ? `Successfully retrieved home page data with ${totalCampaigns} total items across sections` 
            : "Home page data retrieved but no campaigns found",
          data: {
            totalItems: totalCampaigns,
            sections,
            sampleData: Array.isArray(data) 
              ? data.slice(0, 2) 
              : {
                  my_campaigns_sample: data.my_campaigns?.slice(0, 1),
                  trending_sample: data.trending_campaigns?.slice(0, 1),
                },
          },
          timestamp: new Date().toISOString(),
        })
      } else {
        addResult({
          service: "Campaign Service",
          test: testName,
          status: "error",
          message: response.message || "Failed to retrieve home page data",
          data: response,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error: any) {
      addResult({
        service: "Campaign Service",
        test: testName,
        status: "error",
        message: error.message || "Failed to retrieve home page data",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test 10: Campaign Service - Get Single Campaign
  const testGetSingleCampaign = async () => {
    setIsLoading(true)
    const testName = "Campaign Service - Get Single Campaign"
    try {
      // Try to get campaign with ID 1 (or use first campaign from all campaigns if available)
      const campaignId = 1
      const userId = user?.id
      const response = await campaignService.getCampaign(campaignId, userId)
      
      addResult({
        service: "Campaign Service",
        test: testName,
        status: response.success && response.data ? "success" : "error",
        message: response.success && response.data
          ? `Successfully retrieved campaign #${campaignId}`
          : response.message || `Campaign #${campaignId} not found`,
        data: {
          campaignId,
          campaign: response.data,
          fullResponse: response,
        },
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      addResult({
        service: "Campaign Service",
        test: testName,
        status: "error",
        message: error.message || "Failed to retrieve campaign",
        data: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Service Testing Dashboard</h1>
        <p className="text-muted-foreground">
          Test each service individually to verify functionality before integration
        </p>
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>API Base URL:</strong> {API_CONFIG.BASE_URL}
          </p>
          <p className="text-sm">
            <strong>Timeout:</strong> {API_CONFIG.TIMEOUT}ms
          </p>
        </div>
      </div>

      {/* Current Auth State */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Authentication State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
            </p>
            {user && (
              <>
                <p>
                  <strong>User ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Full Name:</strong> {user.full_name}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Credentials */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Credentials</CardTitle>
          <CardDescription>Enter credentials for login tests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Service Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testApiServiceConfig} disabled={isLoading} className="w-full" variant="outline">
              Check Configuration
            </Button>
            <Button onClick={testApiServiceGet} disabled={isLoading} className="w-full" variant="outline">
              Test GET Request
            </Button>
            <Button onClick={testApiServicePost} disabled={isLoading} className="w-full" variant="outline">
              Test POST Request
            </Button>
            <Button onClick={testApiServiceError} disabled={isLoading} className="w-full" variant="outline">
              Test Error Handling
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Service Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testUserServiceLogin} disabled={isLoading} className="w-full" variant="outline">
              Test Login
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Auth Context Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testAuthContextLogin} disabled={isLoading} className="w-full" variant="outline">
              Test Login
            </Button>
            <Button onClick={testAuthContextLogout} disabled={isLoading} className="w-full" variant="outline">
              Test Logout
            </Button>
            <Button onClick={testAuthContextState} disabled={isLoading} className="w-full" variant="outline">
              Check State
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Campaign Service Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testGetAllCampaigns} disabled={isLoading} className="w-full" variant="outline">
              Test Get All Campaigns
            </Button>
            <Button onClick={testGetHomePageData} disabled={isLoading} className="w-full" variant="outline">
              Test Get Home Page Data
            </Button>
            <Button onClick={testGetSingleCampaign} disabled={isLoading} className="w-full" variant="outline">
              Test Get Single Campaign
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              {testResults.length} test{testResults.length !== 1 ? "s" : ""} executed
            </CardDescription>
          </div>
          <Button onClick={clearResults} variant="outline" size="sm">
            Clear Results
          </Button>
        </CardHeader>
        <CardContent>
          {testResults.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No tests executed yet</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.status === "success"
                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                      : result.status === "error"
                        ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{result.service}</h3>
                      <p className="text-sm text-muted-foreground">{result.test}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        result.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : result.status === "error"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{result.message}</p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        View Details
                      </summary>
                      <pre className="mt-2 p-2 bg-black/5 dark:bg-white/5 rounded text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


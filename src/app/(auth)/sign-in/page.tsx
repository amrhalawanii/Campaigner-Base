"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"
import { toast } from "@/hooks/use-toast"

export default function SignInPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email')
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long")
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    if (loginMethod === 'email' && !email) {
      setError("Please enter your email address")
      toast({
        title: "Validation Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    if (loginMethod === 'username' && !username) {
      setError("Please enter your username")
      toast({
        title: "Validation Error",
        description: "Please enter your username",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const loginData = {
        password,
        signin_method: loginMethod,
        type: loginMethod, // API requires 'type' field
        ...(loginMethod === 'email' ? { email } : { user_name: username }),
      }

      await login(loginData)
      
      toast({
        title: "Success",
        description: "You have successfully signed in.",
      })
      
      router.push("/")
    } catch (err: any) {
      const appError = ErrorHandler.handleApiError(err)
      const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
      ErrorHandler.logError(appError, 'Sign In Page')
      setError(errorMessage)
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    console.log(`[v0] Sign in with ${provider}`)
    // Handle social sign in
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6 text-white"
      style={{ backgroundImage: "linear-gradient(180deg, #171a00 0%, #000000 100%)" }}
    >
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Campaigner logo"
            className="h-20 w-auto"
          />
        </Link>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#3a3d42] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">SIGN IN</p>
            <h1 className="text-3xl font-bold text-white">
              CONTINUE WHERE
              <br />
              YOU STOPPED
            </h1>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              type="button"
              onClick={() => handleSocialSignIn("Google")}
              className="bg-[#2a2c30] hover:bg-[#35373b] text-white border-0 h-12"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </Button>
            <Button
              type="button"
              onClick={() => handleSocialSignIn("Apple")}
              className="bg-[#2a2c30] hover:bg-[#35373b] text-white border-0 h-12"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-400 bg-[#3a3d42]">Or Continue With</span>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login Method Toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                onClick={() => {
                  setLoginMethod('email')
                  setError(null)
                }}
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                className={`flex-1 ${loginMethod === 'email' 
                  ? 'bg-[#cced00] text-black hover:bg-[#b8d400]' 
                  : 'bg-[#2a2c30] text-white hover:bg-[#35373b] border-gray-600'
                }`}
              >
                Email
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setLoginMethod('username')
                  setError(null)
                }}
                variant={loginMethod === 'username' ? 'default' : 'outline'}
                className={`flex-1 ${loginMethod === 'username' 
                  ? 'bg-[#cced00] text-black hover:bg-[#b8d400]' 
                  : 'bg-[#2a2c30] text-white hover:bg-[#35373b] border-gray-600'
                }`}
              >
                Username
              </Button>
            </div>

            {/* Email or Username Input */}
            {loginMethod === 'email' ? (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                  className="pl-10 bg-[#2a2c30] border-0 text-white placeholder:text-gray-500 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError(null)
                  }}
                  className="pl-10 bg-[#2a2c30] border-0 text-white placeholder:text-gray-500 h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(null)
                }}
                className="pl-10 pr-10 bg-[#2a2c30] border-0 text-white placeholder:text-gray-500 h-12"
                required
                disabled={isLoading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-right">
              <Link href="/recover-password" className="text-sm text-[#cced00] hover:text-[#b8d400] font-medium">
                Recover Password
              </Link>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#cced00] hover:bg-[#b8d400] text-black font-bold h-12 text-base"
            >
              {isLoading ? "Signing In..." : "Continue"}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">Don't have an account? </span>
            <Link href="/register" className="text-[#cced00] hover:text-[#b8d400] font-medium text-sm">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

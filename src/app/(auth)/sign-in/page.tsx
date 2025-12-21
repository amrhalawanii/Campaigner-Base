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
  const [email, setEmail] = useState("")
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
    if (!email) {
      setError("Please enter your email address")
      toast({
        title: "Validation Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long")
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const loginData = {
        email,
        password,
        signin_method: 'email',
        type: 'email', // API requires 'type' field
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

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
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

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userService } from "@/lib/services/user.service"
import { ErrorHandler } from "@/lib/utils/error-handler"
import { toast } from "@/hooks/use-toast"

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Send verification code to email
      await userService.sendVerificationCode({ email })
      
      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Password recovery link sent to your email",
      })
    } catch (err: any) {
      const appError = ErrorHandler.handleApiError(err)
      const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
      ErrorHandler.logError(appError, 'Recover Password Page')
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#171a00] to-black">
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

      {/* Recover Password Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#3a3d42] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">RECOVER PASSWORD</p>
            <h1 className="text-3xl font-bold text-white">
              RESET YOUR
              <br />
              PASSWORD
            </h1>
          </div>

          {!isSubmitted ? (
            <>
              <p className="text-gray-400 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#2a2c30] border-0 text-white placeholder:text-gray-500 h-12"
                    required
                  />
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
                  {isLoading ? "Sending..." : "Send Recovery Link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#cced00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">
                We've sent a password recovery link to <span className="text-white">{email}</span>
              </p>
            </div>
          )}

          {/* Back to Sign In Link */}
          <div className="mt-6 text-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-[#cced00] hover:text-[#b8d400] font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

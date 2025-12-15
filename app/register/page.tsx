"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  const handleSocialSignUp = (provider: string) => {
    console.log(`[v0] Sign up with ${provider}`)
    // Handle social sign up
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 text-white" style={{ backgroundImage: "linear-gradient(180deg, #171a00 0%, #000 100%)" }}>
      {/* Logo */}
      <div className="absolute top-10 left-10">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Campaigner logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-[600px] bg-[#2e2e2e] border border-black rounded-[12px] p-8 sm:p-12 shadow-2xl">
        <div className="mb-8 space-y-2">
          <p className="text-sm text-white/70 italic">SIGN UP</p>
          <h1 className="text-2xl font-black leading-6">START YOUR</h1>
          <h1 className="text-2xl font-black leading-6">JOURNEY TODAY</h1>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            type="button"
            onClick={() => handleSocialSignUp("Google")}
            className="h-12 bg-[#222] hover:bg-[#2c2c2c] text-white border border-[#2b2b2b] rounded-[6px] flex items-center justify-center gap-3"
            variant="outline"
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
            onClick={() => handleSocialSignUp("Apple")}
            className="h-12 bg-[#222] hover:bg-[#2c2c2c] text-white border border-[#2b2b2b] rounded-[6px] flex items-center justify-center gap-3"
            variant="outline"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-[#595959] uppercase tracking-[0.08em] mb-6">
          <div className="h-px flex-1 bg-[#3a3a3a]" />
          <span className="line-through">Or Continue With</span>
          <div className="h-px flex-1 bg-[#3a3a3a]" />
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-[6px] px-3 h-12">
            <User className="w-4 h-4 text-[#595959]" />
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-transparent border-0 text-white placeholder:text-[#595959] focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-[6px] px-3 h-12">
            <Mail className="w-4 h-4 text-[#595959]" />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-transparent border-0 text-white placeholder:text-[#595959] focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-[6px] px-3 h-12">
            <Lock className="w-4 h-4 text-[#595959]" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-transparent border-0 text-white placeholder:text-[#595959] focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#595959] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-[6px] px-3 h-12">
            <Lock className="w-4 h-4 text-[#595959]" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-transparent border-0 text-white placeholder:text-[#595959] focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#595959] hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-end mt-3">
          <Link href="/recover-password" className="text-xs font-semibold text-[#cef000] hover:text-[#d6ff2f]">
            Recover Password
          </Link>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-6 w-full h-12 bg-[#cced00] hover:bg-[#d6ff2f] text-black font-black rounded-[6px] text-base"
        >
          {isLoading ? "Creating Account..." : "Continue"}
        </Button>

        <div className="mt-6 text-center text-xs text-[#595959]">
          Not a Member?{" "}
          <Link href="/sign-in" className="text-[#cef000] font-semibold hover:text-[#d6ff2f]">
            Register Now.
          </Link>
        </div>
      </div>
    </div>
  )
}

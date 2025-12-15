"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ProfilePage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("First Last Name")
  const [email, setEmail] = useState("FullName@Domain.com")
  const [phoneNumber, setPhoneNumber] = useState("790284754")
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("[v0] Account deletion confirmed")
    setShowDeleteConfirm(false)
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Back button and header */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="mb-8">
          <p className="text-muted-foreground italic text-lg mb-2">Account</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Account Information</h1>
        </div>

        {/* Form fields */}
        <div className="space-y-8">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-muted-foreground italic text-lg mb-3 block">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-[#1a1a1a] border-none text-white h-16 text-lg rounded-xl"
            />
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="email" className="text-muted-foreground italic text-lg mb-3 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1a1a1a] border-none text-white h-16 text-lg rounded-xl"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="text-muted-foreground italic text-lg mb-3 block">
              Phone Number
            </Label>
            <div className="flex gap-2">
              <div className="bg-[#1a1a1a] border-none h-16 rounded-xl flex items-center px-4 gap-2">
                <span className="text-2xl">🇯🇴</span>
                <span className="text-white text-lg">+962</span>
              </div>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-[#1a1a1a] border-none text-white h-16 text-lg rounded-xl flex-1"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-muted-foreground italic text-lg">Password</Label>
              <button
                onClick={() => setShowChangePassword(true)}
                className="text-[#d4ff00] hover:text-[#c0eb00] font-semibold transition-colors"
              >
                Change Password
              </button>
            </div>
            <div className="bg-[#1a1a1a] border-none h-16 rounded-xl flex items-center px-4">
              <span className="text-white text-xl tracking-widest">••••••••••••••••••</span>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="pt-12">
            <h2 className="text-white text-xl font-semibold mb-6">Permanently delete your data and profile</h2>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full h-14 bg-[#2a0a0a] hover:bg-[#3a1010] text-red-500 font-semibold text-lg rounded-xl border border-red-900/30"
            >
              Delete my account
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent className="bg-[#1a3838] border-[#2a4040] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Change Password</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPassword" className="text-white mb-2 block">
                Current Password
              </Label>
              <Input id="currentPassword" type="password" className="bg-[#0f2424] border-[#2a4040] text-white" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-white mb-2 block">
                New Password
              </Label>
              <Input id="newPassword" type="password" className="bg-[#0f2424] border-[#2a4040] text-white" />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-white mb-2 block">
                Confirm New Password
              </Label>
              <Input id="confirmPassword" type="password" className="bg-[#0f2424] border-[#2a4040] text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(false)}
              className="bg-transparent border-[#2a4040] text-white hover:bg-[#2a4040]"
            >
              Cancel
            </Button>
            <Button onClick={() => setShowChangePassword(false)} className="bg-[#d4ff00] text-black hover:bg-[#c0eb00]">
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-[#1a3838] border-[#2a4040] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-500">Delete Account</DialogTitle>
            <DialogDescription className="text-white">
              Are you sure you want to permanently delete your account? This action cannot be undone and all your data
              will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-transparent border-[#2a4040] text-white hover:bg-[#2a4040]"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} className="bg-red-600 text-white hover:bg-red-700">
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

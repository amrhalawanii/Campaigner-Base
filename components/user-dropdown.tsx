"use client"

import { useState } from "react"
import { User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function UserDropdown() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Mock auth state

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = () => {
    // Handle logout logic here
    setIsAuthenticated(false)
    setShowLogoutDialog(false)
    window.location.href = "/sign-in"
  }

  if (!isAuthenticated) {
    return (
      <Link href="/sign-in" className="p-2 hover:bg-secondary rounded-lg transition-colors">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <User className="w-5 h-5 text-background" />
        </div>
      </Link>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-full transition-colors outline-none">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center overflow-hidden">
            <User className="w-6 h-6 text-background" />
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-[#1a2e2e] border-[#2a4040] p-4 mt-2">
          <div className="h-px bg-[#2a4040] my-2" />

          <DropdownMenuItem asChild className="p-4 hover:bg-[#2a4040] rounded-lg cursor-pointer">
            <Link href="/profile" className="flex items-center gap-4">
              <User className="w-6 h-6 text-white" />
              <span className="text-white text-lg">Profile</span>
            </Link>
          </DropdownMenuItem>

          <div className="h-px bg-[#2a4040] my-2" />

          <DropdownMenuItem onClick={handleLogout} className="p-4 hover:bg-[#2a4040] rounded-lg cursor-pointer">
            <div className="flex items-center gap-4">
              <LogOut className="w-6 h-6 text-white" />
              <span className="text-white text-lg">Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#2a3333] border-[#3a4444]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary hover:bg-secondary/80 text-white border-[#3a4444]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="bg-accent hover:bg-accent/90 text-background font-bold"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

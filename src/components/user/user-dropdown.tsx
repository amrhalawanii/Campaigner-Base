"use client"

import { useState } from "react"
import { User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
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
import { useAuth } from "@/hooks/useAuth"

export function UserDropdown() {
  const router = useRouter()
  const { isAuthenticated, user, logout, loading } = useAuth()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    await logout()
    setShowLogoutDialog(false)
    router.push("/sign-in")
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
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className=" bg-[rgba(8,33,37,1 )] border-[0.5px] border-[rgba(57,77,81,0.5)] flex items-center justify-center gap-2 h-10 px-1 py-2 rounded-[32px] transition-colors outline-none hover:bg-[rgba(8,33,37,0.7)]">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center overflow-hidden shrink-0">
            <User className="w-6 h-6 text-background" />
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-white shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="backdrop-blur-[10px] w-auto min-w-[200px] bg-[rgba(8,33,37,0.5)] border border-[rgba(255,255,255,0.05)] p-4 mt-2 rounded-lg"
        >
          {/* Profile Section */}
          <DropdownMenuItem 
            className="p-0 h-auto focus:bg-transparent hover:bg-transparent cursor-pointer"
          >
           <Link href="/profile" className="flex items-center gap-3 h-[27px] w-full px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors group">
              <User className="w-6 h-6 text-white shrink-0 group-hover:text-white" />
              <span className="text-white text-base font-medium leading-[27px]">Profile</span>
            </Link>
          </DropdownMenuItem>

          {/* Separator */}
          <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.05)] my-4" />

          {/* Logout Section */}
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="p-0 h-auto focus:bg-transparent hover:bg-transparent cursor-pointer"
          >
            <div className="flex items-center gap-3 h-[27px] w-full px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors group">
              <LogOut className="w-6 h-6 text-white shrink-0 group-hover:text-white" />
              <span className="text-white text-base font-medium leading-[27px]">Logout</span>
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
              disabled={loading}
              className="bg-accent hover:bg-accent/90 text-background font-bold"
            >
              {loading ? "Logging out..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

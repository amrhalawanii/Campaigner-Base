import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-sm text-muted-foreground uppercase tracking-widest">Upskill for a better future</div>

          <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Campaigner logo"
            className="h-20 w-auto"
          />
          </div>

          <p className="text-muted-foreground max-w-md">A better way to explore, build, and share smarter marketing.</p>

          <div className="flex items-center gap-6 mt-4">
            <Link href="/" className="text-sm hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">© 2025 All Rights Reserved To Arnoux Company</div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-secondary hover:bg-accent hover:text-background transition-colors flex items-center justify-center"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-secondary hover:bg-accent hover:text-background transition-colors flex items-center justify-center"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-secondary hover:bg-accent hover:text-background transition-colors flex items-center justify-center"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-secondary hover:bg-accent hover:text-background transition-colors flex items-center justify-center"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

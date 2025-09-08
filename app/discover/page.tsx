import { DiscoverContent } from "@/components/discover/discover-content"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillSwap</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/discover" className="text-primary font-medium">
              Discover
            </Link>
            <Link href="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
              My Matches
            </Link>
            <Link href="/volunteer" className="text-muted-foreground hover:text-foreground transition-colors">
              Volunteer Hub
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <DiscoverContent />
      </div>
    </div>
  )
}

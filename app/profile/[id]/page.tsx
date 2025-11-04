import { ProfileView } from "@/components/profile/profile-view"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ProfileView userId={params.id} />
      </div>
    </div>
  )
}

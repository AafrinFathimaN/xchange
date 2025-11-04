import { MatchesContent } from "@/components/matches/matches-content"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MatchesContent />
      </div>
    </div>
  )
}

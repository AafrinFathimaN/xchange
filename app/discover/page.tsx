import { DiscoverContent } from "@/components/discover/discover-content"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DiscoverContent />
      </div>
    </div>
  )
}

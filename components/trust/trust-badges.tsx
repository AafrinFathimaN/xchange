import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Star, Award } from "lucide-react"

interface TrustBadgesProps {
  verificationLevel: "basic" | "verified" | "premium"
  trustScore: number
  reviewCount: number
  skillPoints: number
  isVolunteer?: boolean
}

export function TrustBadges({
  verificationLevel,
  trustScore,
  reviewCount,
  skillPoints,
  isVolunteer = false,
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Verification Badge */}
      {verificationLevel === "verified" && (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      )}

      {verificationLevel === "premium" && (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
          <Shield className="w-3 h-3 mr-1" />
          Premium Verified
        </Badge>
      )}

      {/* Trust Score Badge */}
      {trustScore >= 8.0 && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
          <Star className="w-3 h-3 mr-1" />
          Trusted
        </Badge>
      )}

      {/* High Performer Badge */}
      {skillPoints >= 1000 && (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
          <Award className="w-3 h-3 mr-1" />
          Top Contributor
        </Badge>
      )}

      {/* Volunteer Badge */}
      {isVolunteer && (
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
          ❤️ Volunteer
        </Badge>
      )}

      {/* Review Count Badge */}
      {reviewCount >= 10 && (
        <Badge variant="outline" className="text-xs">
          {reviewCount} reviews
        </Badge>
      )}
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, Heart, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  avatar: string
  location: string
  rating: number
  reviewCount: number
  skills: string[]
  learningGoals: string[]
  bio: string
  isOnline: boolean
  matchScore: number
  isNewcomer: boolean
  isVolunteer: boolean
}

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="border-border hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/profile/${user.id}`} className="font-semibold hover:text-primary transition-colors">
                {user.name}
              </Link>
              {user.isNewcomer && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  NEW
                </Badge>
              )}
              {user.isVolunteer && <Heart className="w-4 h-4 text-secondary" />}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{user.rating}</span>
                <span>({user.reviewCount})</span>
              </div>
              {user.matchScore >= 85 && (
                <div className="flex items-center gap-1 text-primary">
                  <Sparkles className="w-3 h-3" />
                  <span>{user.matchScore}% match</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>

            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Can teach:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{user.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground">Wants to learn:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.learningGoals.slice(0, 2).map((goal) => (
                    <Badge key={goal} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                  {user.learningGoals.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.learningGoals.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Link href="/messages">
              <Button size="sm" className="flex-1">
                <MessageCircle className="w-3 h-3 mr-1" />
                Message
              </Button>
              </Link>
              <Link href="/messages">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Heart className="w-3 h-3 mr-1" />
                Connect
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Star, MessageCircle, RefreshCw } from "lucide-react"

const aiRecommendations = [
  {
    id: "1",
    name: "Elena Rodriguez",
    avatar: "/professional-latina-woman.png",
    matchScore: 96,
    reason: "Perfect skill exchange match",
    skills: ["Spanish", "Translation"],
    learningGoals: ["Web Development"],
    mutualSkills: ["JavaScript", "React"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Michael Chang",
    avatar: "/professional-asian-man.png",
    matchScore: 94,
    reason: "Complementary learning goals",
    skills: ["Photography", "Lightroom"],
    learningGoals: ["UI/UX Design"],
    mutualSkills: ["Design Principles"],
    rating: 4.8,
  },
  {
    id: "3",
    name: "Sophie Laurent",
    avatar: "/professional-french-woman.jpg",
    matchScore: 91,
    reason: "Similar availability & location",
    skills: ["French", "Cooking"],
    learningGoals: ["Digital Marketing"],
    mutualSkills: ["Content Creation"],
    rating: 4.7,
  },
]

export function MatchRecommendations() {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">AI-Powered Recommendations</CardTitle>
          </div>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <CardDescription>Based on your skills, goals, and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {aiRecommendations.map((match) => (
            <Card key={match.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                    <AvatarFallback>
                      {match.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{match.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{match.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {match.matchScore}%
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="text-xs text-primary font-medium">{match.reason}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Mutual interest:</span> {match.mutualSkills.join(", ")}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Can teach:</div>
                    <div className="flex flex-wrap gap-1">
                      {match.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Wants to learn:</div>
                    <div className="flex flex-wrap gap-1">
                      {match.learningGoals.map((goal) => (
                        <Badge key={goal} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full mt-3">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

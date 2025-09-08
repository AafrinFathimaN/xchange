"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageCircle, Calendar, Clock, CheckCircle, X, Heart, Sparkles, Users, TrendingUp } from "lucide-react"

const pendingMatches = [
  {
    id: "1",
    name: "Alex Rodriguez",
    avatar: "/professional-man.png",
    matchScore: 95,
    skills: ["Python", "Machine Learning"],
    learningGoals: ["React", "UI/UX Design"],
    mutualInterest: "JavaScript",
    requestedAt: "2 hours ago",
    message: "Hi! I'd love to help you with Python in exchange for learning React. Are you available this week?",
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "/professional-woman-diverse.png",
    matchScore: 88,
    skills: ["UI/UX Design", "Figma"],
    learningGoals: ["Frontend Development"],
    mutualInterest: "Design Systems",
    requestedAt: "1 day ago",
    message: "Your portfolio looks amazing! I'd love to exchange UX knowledge for frontend development tips.",
  },
]

const activeMatches = [
  {
    id: "1",
    name: "James Chen",
    avatar: "/professional-asian-man.png",
    matchScore: 93,
    skills: ["React", "Node.js"],
    learningGoals: ["DevOps", "Cloud Architecture"],
    status: "In Progress",
    nextSession: "Tomorrow, 2:00 PM",
    sessionsCompleted: 3,
    rating: 4.9,
    lastActivity: "Active now",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/professional-blonde-woman.png",
    matchScore: 81,
    skills: ["Spanish", "Language Teaching"],
    learningGoals: ["Web Development"],
    status: "Scheduled",
    nextSession: "Friday, 10:00 AM",
    sessionsCompleted: 1,
    rating: 4.7,
    lastActivity: "2 hours ago",
  },
]

const completedMatches = [
  {
    id: "1",
    name: "David Kim",
    avatar: "/young-asian-professional.png",
    skills: ["Guitar", "Music Theory"],
    learningGoals: ["Photography"],
    sessionsCompleted: 5,
    rating: 4.6,
    completedAt: "Last week",
    feedback: "Great teacher! Really helped me understand music theory basics.",
  },
  {
    id: "2",
    name: "Lisa Wang",
    avatar: "/professional-asian-woman.png",
    skills: ["Photography", "Lightroom"],
    learningGoals: ["Graphic Design"],
    sessionsCompleted: 4,
    rating: 4.8,
    completedAt: "2 weeks ago",
    feedback: "Amazing photography mentor. Learned so much about composition and editing!",
  },
]

export function MatchesContent() {
  const [activeTab, setActiveTab] = useState("pending")

  const handleAcceptMatch = (matchId: string) => {
    console.log("Accepting match:", matchId)
    // Handle match acceptance
  }

  const handleDeclineMatch = (matchId: string) => {
    console.log("Declining match:", matchId)
    // Handle match decline
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">My Matches</h1>
        <p className="text-muted-foreground text-lg">Manage your skill exchange connections and sessions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{activeMatches.length}</div>
            <div className="text-sm text-muted-foreground">Active Matches</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-2xl font-bold">{pendingMatches.length}</div>
            <div className="text-sm text-muted-foreground">Pending Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-accent" />
            </div>
            <div className="text-2xl font-bold">{completedMatches.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Matches Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active ({activeMatches.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({completedMatches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingMatches.map((match) => (
            <Card key={match.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                    <AvatarFallback>
                      {match.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{match.name}</h3>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {match.matchScore}% match
                      </Badge>
                      <span className="text-sm text-muted-foreground">{match.requestedAt}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Can teach:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Wants to learn:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.learningGoals.map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3 mb-4">
                      <p className="text-sm">{match.message}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => handleAcceptMatch(match.id)} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Accept Match
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeclineMatch(match.id)}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeMatches.map((match) => (
            <Card key={match.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                    <AvatarFallback>
                      {match.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{match.name}</h3>
                      <Badge variant="default">{match.status}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{match.rating}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Next Session:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{match.nextSession}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Sessions Completed:</span>
                        <div className="text-sm font-medium mt-1">{match.sessionsCompleted}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Last Activity:</span>
                        <div className="text-sm font-medium mt-1">{match.lastActivity}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Teaching:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Learning:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.learningGoals.map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Calendar className="w-4 h-4" />
                        Schedule Session
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Leave Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMatches.map((match) => (
            <Card key={match.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                    <AvatarFallback>
                      {match.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{match.name}</h3>
                      <Badge variant="outline">Completed</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{match.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{match.completedAt}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Skills exchanged:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Sessions completed:</span>
                        <div className="text-sm font-medium mt-1">{match.sessionsCompleted}</div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3 mb-4">
                      <p className="text-sm italic">"{match.feedback}"</p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <MessageCircle className="w-4 h-4" />
                        Message Again
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Connect Again
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

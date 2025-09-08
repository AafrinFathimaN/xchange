"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Star, MessageCircle, Heart, Award, Calendar, Briefcase, CheckCircle } from "lucide-react"

interface ProfileViewProps {
  userId: string
}

// Mock data - in real app this would come from API
const mockProfile = {
  id: "1",
  name: "Sarah Chen",
  avatar: "/professional-woman-diverse.png",
  bio: "Passionate software developer with 5 years of experience. Love teaching others and learning new technologies. Always excited to help newcomers get started in tech!",
  location: "San Francisco, CA",
  timezone: "UTC-8 (PST)",
  profession: "Senior Software Developer",
  rating: 4.9,
  reviewCount: 47,
  skillPoints: 1250,
  isVerified: true,
  isVolunteer: true,
  joinedDate: "March 2023",
  skills: [
    { name: "JavaScript", level: "Expert", endorsements: 23 },
    { name: "React", level: "Expert", endorsements: 19 },
    { name: "Python", level: "Advanced", endorsements: 15 },
    { name: "UI/UX Design", level: "Intermediate", endorsements: 8 },
    { name: "Mentoring", level: "Expert", endorsements: 31 },
  ],
  learningGoals: ["Machine Learning", "DevOps", "Spanish", "Photography"],
  availability: ["Weekday evenings", "Weekend afternoons"],
  recentActivity: [
    { type: "skill_exchange", description: "Helped John with React basics", date: "2 days ago" },
    { type: "volunteer", description: "Mentored 3 newcomers in JavaScript", date: "1 week ago" },
    { type: "achievement", description: "Earned 'Helpful Mentor' badge", date: "2 weeks ago" },
  ],
  reviews: [
    {
      id: "1",
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Sarah is an amazing teacher! She helped me understand React hooks in just one session.",
      date: "1 week ago",
    },
    {
      id: "2",
      reviewer: "Lisa Wang",
      rating: 5,
      comment: "Very patient and knowledgeable. Great at breaking down complex concepts.",
      date: "2 weeks ago",
    },
  ],
}

export function ProfileView({ userId }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const profile = mockProfile // In real app, fetch based on userId

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.isVerified && <CheckCircle className="w-5 h-5 text-primary" />}
                {profile.isVolunteer && <Heart className="w-5 h-5 text-secondary" />}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{profile.rating}</span>
                  <span>({profile.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{profile.skillPoints} points</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.timezone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.profession}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {profile.joinedDate}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex gap-3">
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Request Skill Exchange
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: "overview", label: "Overview" },
          { id: "skills", label: "Skills" },
          { id: "reviews", label: "Reviews" },
          { id: "activity", label: "Activity" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="flex-1"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills I Can Teach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.level}</div>
                    </div>
                    <Badge variant="secondary">{skill.endorsements} endorsements</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What I Want to Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.learningGoals.map((goal) => (
                  <Badge key={goal} variant="outline">
                    {goal}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.availability.map((time) => (
                  <div key={time} className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <div className="text-sm">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "reviews" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reviews & Ratings</CardTitle>
            <CardDescription>What others say about {profile.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {review.reviewer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.reviewer}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                  {review.id !== profile.reviews[profile.reviews.length - 1].id && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

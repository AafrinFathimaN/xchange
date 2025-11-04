"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Star, MessageCircle, Heart, Award, Calendar, Briefcase, CheckCircle } from "lucide-react"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface ProfileViewProps {
  userId: string
}

export function ProfileView({ userId }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [authUid, setAuthUid] = useState<string | null>(null)
  const [authName, setAuthName] = useState<string | null>(null)
  const [authPhoto, setAuthPhoto] = useState<string | null>(null)
  const [profile, setProfile] = useState<any | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUid(user ? user.uid : null)
      setAuthName(user ? user.displayName : null)
      setAuthPhoto(user ? user.photoURL : null)
    })
    return () => unsub()
  }, [])

  const loadProfile = () => {
    try {
      let raw = localStorage.getItem(`profile:${userId}`)
      if (!raw && authUid === userId) {
        // fallback: migrate guest data if present
        raw = localStorage.getItem("profile:guest") || null
      }
      const stored = raw ? JSON.parse(raw) : null
      const skills = Array.isArray(stored?.skills) ? stored.skills : []
      const learningGoals = Array.isArray(stored?.learningGoals) ? stored.learningGoals : []
      setProfile({
        id: userId,
        name: authUid === userId ? authName || "Your Profile" : "User",
        avatar: authUid === userId ? authPhoto || "/placeholder-user.jpg" : "/placeholder-user.jpg",
        bio: stored?.bio || "",
        location: stored?.location || "",
        timezone: stored?.timezone || "",
        profession: stored?.profession || "",
        rating: 0,
        reviewCount: 0,
        skillPoints: 0,
        isVerified: false,
        isVolunteer: !!stored?.volunteer,
        joinedDate: "",
        skills,
        learningGoals,
        availability: Array.isArray(stored?.availability) ? stored.availability : [],
        recentActivity: [],
        reviews: [],
      })
    } catch {
      setProfile({
        id: userId,
        name: authUid === userId ? authName || "Your Profile" : "User",
        avatar: authUid === userId ? authPhoto || "/placeholder-user.jpg" : "/placeholder-user.jpg",
        bio: "",
        location: "",
        timezone: "",
        profession: "",
        rating: 0,
        reviewCount: 0,
        skillPoints: 0,
        isVerified: false,
        isVolunteer: false,
        joinedDate: "",
        skills: [],
        learningGoals: [],
        availability: [],
        recentActivity: [],
        reviews: [],
      })
    }
  }

  useEffect(() => {
    loadProfile()
    const onFocus = () => loadProfile()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, authUid, authName, authPhoto])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={profile?.avatar || "/placeholder.svg"} alt={profile?.name || "User"} />
                <AvatarFallback>
                  {(profile?.name || "User")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profile?.name}</h1>
                {profile?.isVerified && <CheckCircle className="w-5 h-5 text-primary" />}
                {profile?.isVolunteer && <Heart className="w-5 h-5 text-secondary" />}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{profile?.rating}</span>
                  <span>({profile?.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{profile?.skillPoints} points</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.location || "Add your location in profile setup."}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.timezone || "Select your timezone in profile setup."}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.profession || "Your profession"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{profile?.joinedDate || "Joined date"}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{profile?.bio || "Tell others about yourself in profile setup."}</p>
              <div className="flex gap-3">
                <Button asChild>
                  <a href="/profile/edit">
                    Edit Profile
                  </a>
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
                {(!profile || profile.skills.length === 0) && (
                  <div className="text-sm text-muted-foreground">Add skills in profile setup.</div>
                )}
                {profile && profile.skills.map((skill: string | { name: string; level?: string; endorsements?: number }) => {
                  const name = typeof skill === "string" ? skill : skill.name
                  const level = typeof skill === "string" ? "" : (skill.level || "")
                  const endorsements = typeof skill === "string" ? undefined : skill.endorsements
                  return (
                  <div key={name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{name}</div>
                      {level && <div className="text-sm text-muted-foreground">{level}</div>}
                    </div>
                    {typeof endorsements === "number" && (
                      <Badge variant="secondary">{endorsements} endorsements</Badge>
                    )}
                  </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What I Want to Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(!profile || profile.learningGoals.length === 0) && (
                  <div className="text-sm text-muted-foreground">Add learning goals in profile setup.</div>
                )}
                {profile && profile.learningGoals.map((goal: string) => (
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
                {(!profile || profile.availability.length === 0) && (
                  <div className="text-sm text-muted-foreground">Select availability in profile setup.</div>
                )}
                {profile && profile.availability.map((time: string) => (
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
              <div className="space-y-3 text-sm text-muted-foreground">
                No activity yet.
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "reviews" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reviews & Ratings</CardTitle>
            <CardDescription>What others say about {profile?.name || "User"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-sm text-muted-foreground">No reviews yet.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

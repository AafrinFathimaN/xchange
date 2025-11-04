"use client"

import { useState } from "react"
import { SearchFilters } from "./search-filters"
import { UserCard } from "./user-card"
import { MatchRecommendations } from "./match-recommendations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Sparkles, Users, TrendingUp } from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "Alex Rodriguez",
    avatar: "/professional-man.png",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 23,
    skills: ["Python", "Machine Learning", "Data Science"],
    learningGoals: ["React", "UI/UX Design"],
    bio: "Data scientist with 6 years of experience. Love teaching Python and ML concepts.",
    isOnline: true,
    matchScore: 95,
    isNewcomer: false,
    isVolunteer: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "/professional-woman-diverse.png",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 41,
    skills: ["UI/UX Design", "Figma", "User Research"],
    learningGoals: ["Frontend Development", "JavaScript"],
    bio: "Senior UX designer passionate about creating intuitive user experiences.",
    isOnline: false,
    matchScore: 88,
    isNewcomer: false,
    isVolunteer: false,
  },
  {
    id: "3",
    name: "David Kim",
    avatar: "/young-asian-professional.png",
    location: "Seattle, WA",
    rating: 4.6,
    reviewCount: 12,
    skills: ["Guitar", "Music Theory", "Songwriting"],
    learningGoals: ["Photography", "Video Editing"],
    bio: "Musician and guitar teacher. New to the platform and excited to learn!",
    isOnline: true,
    matchScore: 72,
    isNewcomer: true,
    isVolunteer: false,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    avatar: "/professional-blonde-woman.png",
    location: "Austin, TX",
    rating: 4.7,
    reviewCount: 28,
    skills: ["Spanish", "French", "Language Teaching"],
    learningGoals: ["Web Development", "Digital Marketing"],
    bio: "Language teacher with expertise in Spanish and French. Love helping others communicate!",
    isOnline: true,
    matchScore: 81,
    isNewcomer: false,
    isVolunteer: true,
  },
  {
    id: "5",
    name: "James Chen",
    avatar: "/professional-asian-man-glasses.jpg",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviewCount: 35,
    skills: ["React", "Node.js", "Full-Stack Development"],
    learningGoals: ["DevOps", "Cloud Architecture"],
    bio: "Full-stack developer with 8 years of experience. Mentor and volunteer.",
    isOnline: false,
    matchScore: 93,
    isNewcomer: false,
    isVolunteer: true,
  },
]

const trendingSkills = [
  { name: "AI/Machine Learning", growth: "+45%" },
  { name: "React", growth: "+32%" },
  { name: "Python", growth: "+28%" },
  { name: "UI/UX Design", growth: "+25%" },
  { name: "Digital Marketing", growth: "+22%" },
]

export function DiscoverContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [activeView, setActiveView] = useState<"all" | "matches" | "newcomers" | "volunteers">("all")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredUsers(mockUsers)
      return
    }

    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())) ||
        user.learningGoals.some((goal) => goal.toLowerCase().includes(query.toLowerCase())) ||
        user.location.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleViewChange = (view: typeof activeView) => {
    setActiveView(view)
    let filtered = mockUsers

    switch (view) {
      case "matches":
        filtered = mockUsers.filter((user) => user.matchScore >= 85)
        break
      case "newcomers":
        filtered = mockUsers.filter((user) => user.isNewcomer)
        break
      case "volunteers":
        filtered = mockUsers.filter((user) => user.isVolunteer)
        break
      default:
        filtered = mockUsers
    }

    setFilteredUsers(filtered)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Discover Skill Partners</h1>
        <p className="text-muted-foreground text-lg">
          Find the perfect match for your learning journey and teaching goals
        </p>
      </div>

      {/* AI Recommendations */}
      <MatchRecommendations />

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, location..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <SearchFilters onFiltersChange={(filters) => console.log("Filters:", filters)} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeView === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("all")}
        >
          <Users className="w-4 h-4 mr-2" />
          All Users ({mockUsers.length})
        </Button>
        <Button
          variant={activeView === "matches" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("matches")}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Top Matches ({mockUsers.filter((u) => u.matchScore >= 85).length})
        </Button>
        <Button
          variant={activeView === "newcomers" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("newcomers")}
        >
          <Badge variant="secondary" className="mr-2 px-1 py-0 text-xs">
            NEW
          </Badge>
          Newcomers ({mockUsers.filter((u) => u.isNewcomer).length})
        </Button>
        <Button
          variant={activeView === "volunteers" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("volunteers")}
        >
          <Badge variant="secondary" className="mr-2 px-1 py-0 text-xs bg-secondary/50">
            ❤️
          </Badge>
          Volunteers ({mockUsers.filter((u) => u.isVolunteer).length})
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Skills
              </CardTitle>
              <CardDescription>Most in-demand skills this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingSkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {skill.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="text-sm font-medium">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Skills Available</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Exchanges Today</span>
                  <span className="text-sm font-medium">43</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">New This Week</span>
                  <span className="text-sm font-medium">127</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Plus, Upload, MapPin, Clock, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
  "Weekend evenings",
]

export function ProfileEditForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock current profile data
  const [formData, setFormData] = useState({
    name: "Sarah Chen",
    bio: "Passionate software developer with 5 years of experience. Love teaching others and learning new technologies.",
    location: "San Francisco, CA",
    timezone: "utc-8",
    profession: "Senior Software Developer",
    sessionLength: "1hour",
    meetingType: "both",
    isVolunteer: true,
  })

  const [skills, setSkills] = useState(["JavaScript", "React", "Python", "UI/UX Design", "Mentoring"])
  const [learningGoals, setLearningGoals] = useState(["Machine Learning", "DevOps", "Spanish", "Photography"])
  const [availability, setAvailability] = useState(["Weekday evenings", "Weekend afternoons"])
  const [newSkill, setNewSkill] = useState("")
  const [newGoal, setNewGoal] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const addGoal = () => {
    if (newGoal.trim() && !learningGoals.includes(newGoal.trim())) {
      setLearningGoals([...learningGoals, newGoal.trim()])
      setNewGoal("")
    }
  }

  const removeGoal = (goal: string) => {
    setLearningGoals(learningGoals.filter((g) => g !== goal))
  }

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    if (checked) {
      setAvailability([...availability, option])
    } else {
      setAvailability(availability.filter((a) => a !== option))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Picture</CardTitle>
          <CardDescription>Upload a professional photo to help others recognize you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/professional-woman-diverse.png" alt="Profile" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">UTC-8 (PST)</SelectItem>
                    <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                    <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="utc+1">UTC+1 (CET)</SelectItem>
                    <SelectItem value="utc+8">UTC+8 (CST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession/Field</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="profession"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Skills</CardTitle>
          <CardDescription>Skills you can teach or help others with</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learning Goals</CardTitle>
          <CardDescription>Skills you'd like to learn or improve</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a learning goal"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addGoal())}
            />
            <Button type="button" onClick={addGoal} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {learningGoals.map((goal) => (
              <Badge key={goal} variant="outline" className="flex items-center gap-1">
                {goal}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeGoal(goal)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">When are you available?</Label>
            <div className="grid grid-cols-2 gap-4">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={availability.includes(option)}
                    onCheckedChange={(checked) => handleAvailabilityChange(option, checked as boolean)}
                  />
                  <Label htmlFor={option} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionLength">Preferred session length</Label>
              <Select
                value={formData.sessionLength}
                onValueChange={(value) => setFormData({ ...formData, sessionLength: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="1hour">1 hour</SelectItem>
                  <SelectItem value="2hours">2 hours</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingType">Meeting preference</Label>
              <Select
                value={formData.meetingType}
                onValueChange={(value) => setFormData({ ...formData, meetingType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online only</SelectItem>
                  <SelectItem value="in-person">In-person only</SelectItem>
                  <SelectItem value="both">Both online and in-person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="volunteer"
              checked={formData.isVolunteer}
              onCheckedChange={(checked) => setFormData({ ...formData, isVolunteer: checked as boolean })}
            />
            <Label htmlFor="volunteer" className="text-sm">
              I'm interested in volunteering to help newcomers
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

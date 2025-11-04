"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, MapPin, Clock, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"

import Link from "next/link"


const skillCategories = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Writing",
  "Languages",
  "Music",
  "Art",
  "Cooking",
  "Fitness",
  "Photography",
  "Education",
]

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
  "Weekend evenings",
]

export function ProfileSetupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [skills, setSkills] = useState<string[]>([])
  const [learningGoals, setLearningGoals] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [newGoal, setNewGoal] = useState("")
  const [location, setLocation] = useState("")
  const [timezone, setTimezone] = useState("")
  const [profession, setProfession] = useState("")
  const [bio, setBio] = useState("")
  const [sessionLength, setSessionLength] = useState("")
  const [meetingType, setMeetingType] = useState("")
  const [volunteer, setVolunteer] = useState(false)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null)
      if (user) {
        try {
          const stored = localStorage.getItem(`profile:${user.uid}`)
          if (stored) {
            const p = JSON.parse(stored)
            setLocation(p.location || "")
            setTimezone(p.timezone || "")
            setProfession(p.profession || "")
            setBio(p.bio || "")
            setSkills(Array.isArray(p.skills) ? p.skills : [])
            setLearningGoals(Array.isArray(p.learningGoals) ? p.learningGoals : [])
            setAvailability(Array.isArray(p.availability) ? p.availability : [])
            setSessionLength(p.sessionLength || "")
            setMeetingType(p.meetingType || "")
            setVolunteer(!!p.volunteer)
          }
        } catch {}
      }
    })
    return () => unsubscribe()
  }, [])

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
    try {
      const finalSkills = newSkill.trim() && !skills.includes(newSkill.trim()) ? [...skills, newSkill.trim()] : skills
      const finalGoals = newGoal.trim() && !learningGoals.includes(newGoal.trim()) ? [...learningGoals, newGoal.trim()] : learningGoals
      if (!uid) {
        // not logged in; store under a guest key
        const guestKey = "profile:guest"
        localStorage.setItem(
          guestKey,
          JSON.stringify({ location, timezone, profession, bio, skills: finalSkills, learningGoals: finalGoals, availability, sessionLength, meetingType, volunteer })
        )
        router.push("/dashboard")
        return
      }
      localStorage.setItem(
        `profile:${uid}`,
        JSON.stringify({ location, timezone, profession, bio, skills: finalSkills, learningGoals: finalGoals, availability, sessionLength, meetingType, volunteer })
      )
      router.push(`/profile/${uid}`)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(currentStep + 1)
  const prevStep = () => setCurrentStep(currentStep - 1)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {step < 3 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
            <p className="text-muted-foreground">Tell us a bit about yourself</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" placeholder="City, Country" className="pl-10" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8 (PST)">UTC-8 (PST)</SelectItem>
                    <SelectItem value="UTC-5 (EST)">UTC-5 (EST)</SelectItem>
                    <SelectItem value="UTC+0 (GMT)">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="UTC+1 (CET)">UTC+1 (CET)</SelectItem>
                    <SelectItem value="UTC+8 (CST)">UTC+8 (CST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession/Field</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="profession" placeholder="e.g., Software Developer, Designer, Teacher" className="pl-10" value={profession} onChange={(e) => setProfession(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself, your interests, and what motivates you to share skills..."
              className="min-h-[100px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <Button type="button" onClick={nextStep} className="w-full">
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Skills & Learning Goals */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Skills & Learning Goals</h2>
            <p className="text-muted-foreground">What can you teach and what would you like to learn?</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Skills</CardTitle>
              <CardDescription>Add skills you can teach or help others with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript, Guitar, Spanish"
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Goals</CardTitle>
              <CardDescription>What skills would you like to learn or improve?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="e.g., Python, Photography, Public Speaking"
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

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
              Back
            </Button>
            <Button type="button" onClick={nextStep} className="flex-1">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Availability & Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Availability & Preferences</h2>
            <p className="text-muted-foreground">When are you available for skill exchanges?</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
              <CardDescription>Select when you're typically available</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferences</CardTitle>
              <CardDescription>How would you like to connect with others?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionLength">Preferred session length</Label>
                <Select value={sessionLength} onValueChange={setSessionLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingType">Meeting preference</Label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online only">Online only</SelectItem>
                    <SelectItem value="In-person only">In-person only</SelectItem>
                    <SelectItem value="Both online and in-person">Both online and in-person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="volunteer" checked={volunteer} onCheckedChange={(checked) => setVolunteer(!!checked)} />
                <Label htmlFor="volunteer" className="text-sm">
                  I'm interested in volunteering to help newcomers
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
              Back
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>

          </div>
        </div>
      )}
    </form>
  )
}

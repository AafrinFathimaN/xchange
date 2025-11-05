"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Users, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"

export function HelpRequestForm() {
  const router = useRouter()
  const [uid, setUid] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    urgency: "medium",
    location: "",
    timeframe: "",
    isRemote: false,
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null)
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uid) {
      alert("Please sign in to post a help request")
      return
    }

    setIsSubmitting(true)

    try {
      // Save to localStorage
      const requestId = Date.now().toString()
      const helpRequest = {
        id: requestId,
        ...formData,
        skillsArray: formData.skills.split(",").map((s) => s.trim()).filter((s) => s),
        createdAt: new Date().toISOString(),
        status: "Open",
        volunteerCount: 0,
      }

      const existing = localStorage.getItem(`helpRequests:${uid}`)
      const requests = existing ? JSON.parse(existing) : []
      requests.unshift(helpRequest)
      localStorage.setItem(`helpRequests:${uid}`, JSON.stringify(requests))

      // Reset form
      setFormData({
        title: "",
        description: "",
        skills: "",
        urgency: "medium",
        location: "",
        timeframe: "",
        isRemote: false,
      })

      alert("Your help request has been posted! Volunteers will be notified.")
      router.push("/volunteer")
    } catch (error) {
      console.error("Error submitting help request:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Request Volunteer Help
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Describe what you need help with and our volunteers will be notified.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Request Title</label>
            <Input
              placeholder="e.g., Help with Python debugging"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              placeholder="Provide details about what you need help with..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Skills Needed */}
          <div>
            <label className="text-sm font-medium mb-2 block">Skills Needed</label>
            <Input
              placeholder="e.g., Python, Debugging, Web Development"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Separate multiple skills with commas</p>
          </div>

          {/* Urgency */}
          <div>
            <label className="text-sm font-medium mb-2 block">Urgency Level</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            >
              <option value="low">Low - Can wait a few days</option>
              <option value="medium">Medium - Need help within 24 hours</option>
              <option value="high">High - Need help ASAP</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <Input
              placeholder="e.g., New York, NY or Remote"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={formData.isRemote}
                onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">This can be done remotely</span>
            </label>
          </div>

          {/* Timeframe */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Expected Time Commitment
            </label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={formData.timeframe}
              onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
            >
              <option value="">Select timeframe</option>
              <option value="15-30min">15-30 minutes</option>
              <option value="30-60min">30-60 minutes</option>
              <option value="1-2hours">1-2 hours</option>
              <option value="2-4hours">2-4 hours</option>
              <option value="multiple-sessions">Multiple sessions</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">How it works:</p>
                <ul className="text-blue-800 space-y-1">
                  <li>• Your request will be shared with relevant volunteers</li>
                  <li>• Volunteers can respond and offer to help</li>
                  <li>• You'll be notified when someone wants to help</li>
                  <li>• All volunteer help is free - just pay it forward!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Help Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

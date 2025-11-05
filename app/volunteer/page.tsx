"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ChevronDown, ArrowLeft } from "lucide-react"

export default function VolunteerPage() {
  const router = useRouter()
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)
  const [volunteerHistoryOpen, setVolunteerHistoryOpen] = useState(false)
  const [volunteerHistory, setVolunteerHistory] = useState<any[]>([])
  const [uid, setUid] = useState<string | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const learnMoreContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null)
      if (user) {
        try {
          const stored = localStorage.getItem(`volunteerHistory:${user.uid}`)
          if (stored) {
            setVolunteerHistory(JSON.parse(stored))
          } else {
            // Initialize with dummy data
            const dummyHistory = [
              {
                id: "1",
                title: "Resume Writing Help",
                person: "Sarah Chen",
                date: "2 weeks ago",
                hours: 2,
                status: "Completed",
                rating: 5,
                feedback: "Amazing help! Got my resume ready for job applications.",
              },
              {
                id: "2",
                title: "JavaScript Tutoring",
                person: "Mike Johnson",
                date: "1 month ago",
                hours: 4,
                status: "Completed",
                rating: 5,
                feedback: "Great teacher, very patient and knowledgeable.",
              },
              {
                id: "3",
                title: "Career Advice Session",
                person: "Lisa Wang",
                date: "2 months ago",
                hours: 1.5,
                status: "Completed",
                rating: 4,
                feedback: "Helpful guidance on career transition.",
              },
            ]
            setVolunteerHistory(dummyHistory)
            localStorage.setItem(`volunteerHistory:${user.uid}`, JSON.stringify(dummyHistory))
          }
        } catch {}
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (learnMoreOpen && learnMoreContentRef.current) {
      // Check if content is scrollable after dialog opens
      setTimeout(() => {
        if (learnMoreContentRef.current) {
          const { scrollHeight, clientHeight } = learnMoreContentRef.current
          setShowScrollButton(scrollHeight > clientHeight)
        }
      }, 100)
    }
  }, [learnMoreOpen])

  const handleVolunteerHelp = (opportunity: any) => {
    if (!uid) {
      alert("Please sign in to volunteer")
      return
    }

    const newVolunteerWork = {
      id: Date.now().toString(),
      title: opportunity.title,
      person: "Pending",
      date: "Just now",
      hours: 0,
      status: "Pending",
      rating: 0,
      feedback: "",
    }

    const updatedHistory = [newVolunteerWork, ...volunteerHistory]
    setVolunteerHistory(updatedHistory)
    if (uid) {
      localStorage.setItem(`volunteerHistory:${uid}`, JSON.stringify(updatedHistory))
    }

    alert(`You've volunteered to help with "${opportunity.title}"! We'll connect you with the requester soon.`)
  }

  const opportunities = [
    {
      title: "Help with Resume Writing",
      description: "Recent graduate needs help polishing their resume for job applications.",
      skills: ["Writing", "Career Advice"],
      urgency: "High",
      timeAgo: "2 hours ago",
      location: "Remote",
    },
    {
      title: "Basic Web Development Tutorial",
      description: "Complete beginner wants to learn HTML/CSS basics for personal project.",
      skills: ["HTML", "CSS", "Web Development"],
      urgency: "Medium",
      timeAgo: "5 hours ago",
      location: "New York, NY",
    },
    {
      title: "Spanish Conversation Practice",
      description: "Looking for native Spanish speaker to practice conversation skills.",
      skills: ["Spanish", "Language Exchange"],
      urgency: "Low",
      timeAgo: "1 day ago",
      location: "Remote",
    },
    {
      title: "Small Business Marketing Advice",
      description: "Local bakery owner needs guidance on social media marketing strategies.",
      skills: ["Marketing", "Social Media", "Business"],
      urgency: "Medium",
      timeAgo: "2 days ago",
      location: "San Francisco, CA",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Volunteering Hub</h1>
          <p className="text-muted-foreground">
            Make a difference by offering your skills to help others in need. Join our community of volunteers.
          </p>
        </div>

        {/* Volunteer Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-primary">247</div>
            <div className="text-sm text-muted-foreground">Active Volunteers</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-muted-foreground">Open Requests</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-muted-foreground">Hours Volunteered</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">456</div>
            <div className="text-sm text-muted-foreground">People Helped</div>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Volunteer Opportunities</h2>
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="bg-card rounded-lg border p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{opportunity.title}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          opportunity.urgency === "High"
                            ? "bg-red-100 text-red-800"
                            : opportunity.urgency === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {opportunity.urgency} Priority
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{opportunity.location}</span>
                    <span>{opportunity.timeAgo}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      onClick={() => handleVolunteerHelp(opportunity)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
                    >
                      Volunteer to Help
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setLearnMoreOpen(true)}
                      className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Dashboard */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Your Volunteer Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Volunteer</span>
                  <span className="text-sm text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hours Volunteered</span>
                  <span className="text-sm font-medium">47 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">People Helped</span>
                  <span className="text-sm font-medium">12 people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volunteer Rating</span>
                  <span className="text-sm font-medium">4.9/5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Urgent requests in my skills</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Daily volunteer digest</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">All new requests</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Thank you messages</span>
                </label>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push("/volunteer/request")}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
                >
                  Post Help Request
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setVolunteerHistoryOpen(true)}
                  className="w-full px-4 py-2 border border-border rounded-md text-sm hover:bg-muted"
                >
                  Volunteer History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>How Volunteering Works</DialogTitle>
            <DialogDescription>
              Learn about our volunteer program and how you can make a difference
            </DialogDescription>
          </DialogHeader>
          <div 
            ref={learnMoreContentRef}
            className="space-y-4 py-4 overflow-y-auto flex-1 pr-2"
            onScroll={() => {
              if (learnMoreContentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = learnMoreContentRef.current
                const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
                setShowScrollButton(!isNearBottom && scrollHeight > clientHeight)
              }
            }}
          >
            <div>
              <h3 className="font-semibold mb-2">What is Volunteering on Xchange?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our volunteer program connects skilled community members with people who need help. 
                It's a way to give back to the community while building meaningful connections.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Browse volunteer opportunities that match your skills</li>
                <li>Click "Volunteer to Help" on any request that interests you</li>
                <li>We'll connect you with the person who needs help</li>
                <li>Schedule a time that works for both of you</li>
                <li>Complete the volunteer session and receive feedback</li>
                <li>Earn volunteer points and build your reputation</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Benefits of Volunteering</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Make a positive impact in someone's life</li>
                <li>Build your reputation and trust score</li>
                <li>Earn volunteer points and badges</li>
                <li>Expand your network and meet new people</li>
                <li>Practice and refine your teaching skills</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Volunteer Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>All volunteer help is free - no payment required</li>
                <li>Be respectful and professional in all interactions</li>
                <li>Communicate clearly about availability and expectations</li>
                <li>Follow through on your commitments</li>
                <li>Provide honest feedback after sessions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Ready to make a difference? Here's how to get started:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Complete your profile with your skills and expertise</li>
                <li>Browse available volunteer opportunities</li>
                <li>Click "Volunteer to Help" on requests that interest you</li>
                <li>Wait for connection with the person who needs help</li>
                <li>Schedule and complete your volunteer session</li>
                <li>Build your volunteer reputation and track your impact</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Volunteer Recognition</h3>
              <p className="text-sm text-muted-foreground mb-2">
                As you volunteer, you'll earn recognition and rewards:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Volunteer points for each completed session</li>
                <li>Badges and achievements for milestones</li>
                <li>Featured volunteer status for top contributors</li>
                <li>Priority access to exclusive opportunities</li>
                <li>Recognition in your profile and public listings</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Ready to get started?</strong> Browse the opportunities above and click 
                "Volunteer to Help" on any request that matches your skills!
              </p>
            </div>
          </div>
          
          {/* Scroll Button */}
          {showScrollButton && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (learnMoreContentRef.current) {
                    learnMoreContentRef.current.scrollBy({ top: 300, behavior: "smooth" })
                  }
                }}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Scroll for More
              </Button>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLearnMoreOpen(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Volunteer Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Volunteer History Dialog */}
      <Dialog open={volunteerHistoryOpen} onOpenChange={setVolunteerHistoryOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Volunteer History</DialogTitle>
            <DialogDescription>
              View all your past volunteer work and contributions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {volunteerHistory.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No volunteer history yet. Start volunteering to see your contributions here!
                </CardContent>
              </Card>
            ) : (
              volunteerHistory.map((work) => (
                <Card key={work.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{work.title}</h3>
                        <p className="text-sm text-muted-foreground">Helped: {work.person}</p>
                      </div>
                      <Badge 
                        variant={work.status === "Completed" ? "default" : "secondary"}
                      >
                        {work.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Date: </span>
                        <span className="text-sm">{work.date}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Hours: </span>
                        <span className="text-sm">{work.hours}</span>
                      </div>
                      {work.rating > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Rating: </span>
                          <span className="text-sm">{work.rating}/5 ⭐</span>
                        </div>
                      )}
                    </div>
                    {work.feedback && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm italic">"{work.feedback}"</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

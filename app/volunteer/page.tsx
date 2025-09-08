export default function VolunteerPage() {
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
              {[
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
              ].map((opportunity, index) => (
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
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
                      Volunteer to Help
                    </button>
                    <button className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted">
                      Learn More
                    </button>
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
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
                  Post Help Request
                </button>
                <button className="w-full px-4 py-2 border border-border rounded-md text-sm hover:bg-muted">
                  View My Requests
                </button>
                <button className="w-full px-4 py-2 border border-border rounded-md text-sm hover:bg-muted">
                  Volunteer History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

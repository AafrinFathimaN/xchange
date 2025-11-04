export default function TrustPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trust & Verification</h1>
          <p className="text-muted-foreground">
            Build credibility and trust within our community through verification and reviews.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Verification Status */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Email Verified</span>
                </div>
                <span className="text-sm text-green-600">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Phone Verified</span>
                </div>
                <span className="text-sm text-yellow-600">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>ID Verification</span>
                </div>
                <span className="text-sm text-muted-foreground">Not Started</span>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Trust Score</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8.7</div>
              <div className="text-sm text-muted-foreground mb-4">out of 10</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Based on 23 reviews and verification status</p>
            </div>
          </div>
        </div>

        {/* Points Overview */}
        <div className="mt-8 bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Skill Points Overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">355</div>
              <div className="text-sm text-muted-foreground">Points Spent</div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mt-8 bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {[
              {
                name: "Sarah Chen",
                rating: 5,
                comment: "Excellent Python tutoring! Very patient and knowledgeable.",
                skill: "Python Programming",
              },
              {
                name: "Mike Johnson",
                rating: 4,
                comment: "Great help with my website design. Professional and creative.",
                skill: "Web Design",
              },
              {
                name: "Lisa Rodriguez",
                rating: 5,
                comment: "Amazing language exchange partner. Highly recommend!",
                skill: "Spanish Language",
              },
            ].map((review, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                <div className="text-xs text-primary">{review.skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

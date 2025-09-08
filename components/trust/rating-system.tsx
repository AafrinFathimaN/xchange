"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface RatingSystemProps {
  userName: string
  skillName: string
  onSubmitReview?: (rating: number, comment: string) => void
}

export function RatingSystem({ userName, skillName, onSubmitReview }: RatingSystemProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitReview?.(rating, comment)
      setRating(0)
      setComment("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rate Your Experience</CardTitle>
        <p className="text-sm text-muted-foreground">
          How was your {skillName} session with {userName}?
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="p-1 hover:scale-110 transition-transform"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {rating} star{rating !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="text-sm font-medium mb-2 block">Share your experience (optional)</label>
          <Textarea
            placeholder="What went well? Any feedback for improvement?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} disabled={rating === 0} className="w-full">
          Submit Review
        </Button>
      </CardContent>
    </Card>
  )
}

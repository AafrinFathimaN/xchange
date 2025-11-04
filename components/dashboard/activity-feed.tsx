"use client"

import { Clock, Users, MessageSquare, Heart, Trophy, Star } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      type: "match",
      icon: Users,
      title: "New match found",
      description: "You matched with Sarah Chen for Python programming",
      time: "2 hours ago",
      color: "text-blue-600",
    },
    {
      type: "review",
      icon: Star,
      title: "Received a 5-star review",
      description: "Mike Johnson rated your web design help",
      time: "5 hours ago",
      color: "text-yellow-600",
    },
    {
      type: "volunteer",
      icon: Heart,
      title: "Completed volunteer session",
      description: "Helped Lisa Rodriguez with Spanish conversation",
      time: "1 day ago",
      color: "text-red-600",
    },
    {
      type: "points",
      icon: Trophy,
      title: "Earned 50 skill points",
      description: "For completing a successful skill exchange",
      time: "2 days ago",
      color: "text-green-600",
    },
    {
      type: "message",
      icon: MessageSquare,
      title: "New message received",
      description: "Alex Kim sent you a message about Python debugging",
      time: "3 days ago",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <div className={`p-2 rounded-full bg-background ${activity.color}`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{activity.title}</div>
            <div className="text-sm text-muted-foreground">{activity.description}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

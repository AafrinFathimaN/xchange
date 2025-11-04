"use client"

import { useState } from "react"
import { Bell, X, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VolunteerNotification {
  id: string
  type: "urgent" | "new" | "reminder" | "thank_you"
  title: string
  message: string
  timeAgo: string
  location?: string
  skills?: string[]
  read: boolean
}

export function VolunteerNotifications() {
  const [notifications, setNotifications] = useState<VolunteerNotification[]>([
    {
      id: "1",
      type: "urgent",
      title: "Urgent Help Needed",
      message: "Someone needs immediate help with Python debugging. Your skills match perfectly!",
      timeAgo: "5 minutes ago",
      location: "Remote",
      skills: ["Python", "Debugging"],
      read: false,
    },
    {
      id: "2",
      type: "new",
      title: "New Volunteer Request",
      message: "A student needs help with calculus homework. Are you available to help?",
      timeAgo: "2 hours ago",
      location: "Boston, MA",
      skills: ["Mathematics", "Tutoring"],
      read: false,
    },
    {
      id: "3",
      type: "thank_you",
      title: "Thank You Message",
      message: "Sarah Chen thanked you for helping with her resume. You earned 50 volunteer points!",
      timeAgo: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "reminder",
      title: "Volunteer Reminder",
      message: "You have a scheduled volunteer session with Mike Johnson in 30 minutes.",
      timeAgo: "30 minutes",
      read: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return "🚨"
      case "new":
        return "📢"
      case "reminder":
        return "⏰"
      case "thank_you":
        return "🙏"
      default:
        return "📋"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50"
      case "new":
        return "border-blue-200 bg-blue-50"
      case "reminder":
        return "border-yellow-200 bg-yellow-50"
      case "thank_you":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Volunteer Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No notifications yet</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                  !notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                      {notification.skills && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {notification.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.timeAgo}
                        </span>
                        {notification.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {notification.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="text-xs">
                        Mark Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {(notification.type === "urgent" || notification.type === "new") && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="text-xs">
                      Volunteer Now
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

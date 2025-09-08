"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, MessageCircle } from "lucide-react"

interface MessageNotification {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  message: string
  timestamp: string
  conversationId: string
}

interface MessageNotificationsProps {
  notifications: MessageNotification[]
  onDismiss: (id: string) => void
  onNavigateToChat: (conversationId: string) => void
}

export function MessageNotifications({ notifications, onDismiss, onNavigateToChat }: MessageNotificationsProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<MessageNotification[]>([])

  useEffect(() => {
    // Show notifications with a slight delay for animation
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        setVisibleNotifications((prev) => {
          if (!prev.find((n) => n.id === notification.id)) {
            return [...prev, notification]
          }
          return prev
        })
      }, index * 200)
    })
  }, [notifications])

  const handleDismiss = (id: string) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id))
    setTimeout(() => onDismiss(id), 300)
  }

  const handleNavigateToChat = (conversationId: string, notificationId: string) => {
    handleDismiss(notificationId)
    onNavigateToChat(conversationId)
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications.map((notification) => (
        <Card
          key={notification.id}
          className="border-border shadow-lg animate-in slide-in-from-right-full duration-300"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={notification.senderAvatar || "/placeholder.svg"} alt={notification.senderName} />
                <AvatarFallback>
                  {notification.senderName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate">{notification.senderName}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleDismiss(notification.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{notification.message}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs bg-transparent"
                    onClick={() => handleNavigateToChat(notification.conversationId, notification.id)}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Hook for managing message notifications
export function useMessageNotifications() {
  const [notifications, setNotifications] = useState<MessageNotification[]>([])

  const addNotification = (notification: MessageNotification) => {
    setNotifications((prev) => [notification, ...prev.slice(0, 4)]) // Keep max 5 notifications
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
  }
}

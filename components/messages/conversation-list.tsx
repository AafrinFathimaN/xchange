"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus } from "lucide-react"
import type { Conversation } from "./messages-content"

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationList({ conversations, selectedConversation, onSelectConversation }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "online">("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" || (filter === "unread" && conv.unreadCount > 0) || (filter === "online" && conv.isOnline)

    return matchesSearch && matchesFilter
  })

  const formatTime = (timeStr: string) => {
    if (timeStr === "now") return "now"
    if (timeStr.includes("min")) return timeStr
    if (timeStr.includes("hour")) return timeStr
    if (timeStr.includes("day")) return timeStr
    return timeStr
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button size="sm" variant={filter === "all" ? "default" : "ghost"} onClick={() => setFilter("all")}>
            All
          </Button>
          <Button size="sm" variant={filter === "unread" ? "default" : "ghost"} onClick={() => setFilter("unread")}>
            Unread
            {conversations.filter((c) => c.unreadCount > 0).length > 0 && (
              <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                {conversations.filter((c) => c.unreadCount > 0).length}
              </Badge>
            )}
          </Button>
          <Button size="sm" variant={filter === "online" ? "default" : "ghost"} onClick={() => setFilter("online")}>
            Online
          </Button>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
              selectedConversation === conversation.id ? "bg-muted" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{conversation.name}</h3>
                  <div className="flex items-center gap-2">
                    {conversation.matchScore && (
                      <Badge variant="secondary" className="text-xs">
                        {conversation.matchScore}%
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{formatTime(conversation.lastMessageTime)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1 mr-2">{conversation.lastMessage}</p>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="default" className="text-xs px-2 py-0">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>

                {/* Skills preview */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {conversation.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {conversation.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{conversation.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredConversations.length === 0 && (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Start a new conversation"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ConversationList } from "./conversation-list"
import { ChatInterface } from "./chat-interface"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  matchScore?: number
  skills: string[]
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "system"
  fileUrl?: string
  fileName?: string
}

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Alex Rodriguez",
    avatar: "/professional-man.png",
    lastMessage: "Thanks for the Python tutorial! When can we schedule the React session?",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    matchScore: 95,
    skills: ["Python", "Machine Learning"],
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "/professional-woman-diverse.png",
    lastMessage: "I've prepared some UX resources for you to review",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    matchScore: 88,
    skills: ["UI/UX Design", "Figma"],
  },
  {
    id: "3",
    name: "James Chen",
    avatar: "/professional-asian-man.png",
    lastMessage: "Great session today! The React hooks explanation was perfect",
    lastMessageTime: "3 hours ago",
    unreadCount: 0,
    isOnline: true,
    matchScore: 93,
    skills: ["React", "Node.js"],
  },
  {
    id: "4",
    name: "Sarah Johnson",
    avatar: "/professional-blonde-woman.png",
    lastMessage: "¡Hola! Ready for our Spanish lesson tomorrow?",
    lastMessageTime: "1 day ago",
    unreadCount: 1,
    isOnline: false,
    matchScore: 81,
    skills: ["Spanish", "Language Teaching"],
  },
]

// Mock messages data
const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "1",
      senderName: "Alex Rodriguez",
      content:
        "Hi! I saw your profile and I'm really interested in learning React. I can help you with Python in return!",
      timestamp: "2024-01-15T10:00:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content:
        "That sounds perfect! I've been wanting to dive deeper into Python for data science. What's your experience level with React?",
      timestamp: "2024-01-15T10:05:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Alex Rodriguez",
      content:
        "I'm completely new to React, but I have solid JavaScript fundamentals. Here's a Python script I wrote for data analysis that might interest you.",
      timestamp: "2024-01-15T10:10:00Z",
      type: "text",
    },
    {
      id: "4",
      senderId: "1",
      senderName: "Alex Rodriguez",
      content: "data_analysis.py",
      timestamp: "2024-01-15T10:11:00Z",
      type: "file",
      fileUrl: "#",
      fileName: "data_analysis.py",
    },
    {
      id: "5",
      senderId: "me",
      senderName: "You",
      content:
        "This looks great! I love how you've structured the data cleaning process. Let's start with React basics - I can show you components and JSX.",
      timestamp: "2024-01-15T10:15:00Z",
      type: "text",
    },
    {
      id: "6",
      senderId: "1",
      senderName: "Alex Rodriguez",
      content: "Thanks for the Python tutorial! When can we schedule the React session?",
      timestamp: "2024-01-15T14:30:00Z",
      type: "text",
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "2",
      senderName: "Maria Santos",
      content:
        "Hello! I'd love to help you with UX design principles. Your frontend skills would be really valuable for me to learn!",
      timestamp: "2024-01-14T09:00:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content:
        "Hi Maria! I'm excited to learn from you. I've been struggling with user research and wireframing. What frontend topics interest you most?",
      timestamp: "2024-01-14T09:30:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Maria Santos",
      content: "I've prepared some UX resources for you to review",
      timestamp: "2024-01-15T13:00:00Z",
      type: "text",
    },
  ],
}

export function MessagesContent() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }))

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: content,
              lastMessageTime: "now",
            }
          : conv,
      ),
    )
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
    // Mark as read
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : []

  return (
    <div className="h-[calc(100vh-80px)] flex">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border bg-card/30">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <ChatInterface
            conversation={selectedConv}
            messages={conversationMessages}
            onSendMessage={(content) => handleSendMessage(selectedConv.id, content)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Paperclip, Video, Phone, MoreVertical, Calendar, Star, Download, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Conversation, Message } from "./messages-content"

interface ChatInterfaceProps {
  conversation: Conversation
  messages: Message[]
  onSendMessage: (content: string) => void
}

export function ChatInterface({ conversation, messages, onSendMessage }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")

      // Simulate typing indicator for response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const renderMessage = (message: Message, index: number) => {
    const isMe = message.senderId === "me"
    const showDate =
      index === 0 || formatMessageDate(messages[index - 1].timestamp) !== formatMessageDate(message.timestamp)

    return (
      <div key={message.id}>
        {showDate && (
          <div className="flex justify-center my-4">
            <Badge variant="secondary" className="text-xs">
              {formatMessageDate(message.timestamp)}
            </Badge>
          </div>
        )}

        <div className={`flex gap-3 mb-4 ${isMe ? "justify-end" : "justify-start"}`}>
          {!isMe && (
            <Avatar className="w-8 h-8">
              <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
              <AvatarFallback>
                {conversation.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}

          <div className={`max-w-[70%] ${isMe ? "order-first" : ""}`}>
            <div
              className={`rounded-lg px-4 py-2 ${
                isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {message.type === "text" && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}

              {message.type === "file" && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-background/20 rounded flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{message.fileName}</p>
                    <p className="text-xs opacity-70">Click to download</p>
                  </div>
                </div>
              )}

              {message.type === "image" && (
                <div className="rounded overflow-hidden">
                  <img src={message.fileUrl || "/placeholder.svg"} alt="Shared image" className="max-w-full h-auto" />
                </div>
              )}

              {message.type === "system" && <p className="text-xs italic opacity-70">{message.content}</p>}
            </div>

            <div
              className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <span>{formatMessageTime(message.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
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

            <div>
              <h3 className="font-semibold">{conversation.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {conversation.isOnline ? "Online" : "Last seen recently"}
                </p>
                {conversation.matchScore && (
                  <Badge variant="secondary" className="text-xs">
                    {conversation.matchScore}% match
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Calendar className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Star className="w-4 h-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-6 text-center">
              <h3 className="font-medium mb-2">Start your conversation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Say hello to {conversation.name} and begin your skill exchange!
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {conversation.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <>
            {messages.map((message, index) => renderMessage(message, index))}

            {isTyping && (
              <div className="flex gap-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex items-end gap-2">
          <Button size="sm" variant="ghost">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <ImageIcon className="w-4 h-4" />
          </Button>

          <div className="flex-1">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${conversation.name}...`}
              className="resize-none"
            />
          </div>

          <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

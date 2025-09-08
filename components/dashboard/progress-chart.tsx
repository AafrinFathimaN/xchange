"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Users, MessageSquare } from "lucide-react"

export function ProgressChart() {
  const monthlyData = [
    { month: "Jan", points: 120, connections: 5, messages: 45 },
    { month: "Feb", points: 180, connections: 8, messages: 67 },
    { month: "Mar", points: 240, connections: 12, messages: 89 },
    { month: "Apr", points: 320, connections: 15, messages: 112 },
    { month: "May", points: 280, connections: 18, messages: 134 },
    { month: "Jun", points: 380, connections: 23, messages: 156 },
  ]

  const maxPoints = Math.max(...monthlyData.map((d) => d.points))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            6-Month Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Points Chart */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Skill Points Earned
              </h4>
              <div className="flex items-end gap-2 h-32">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary rounded-t-sm"
                      style={{ height: `${(data.points / maxPoints) * 100}%` }}
                    ></div>
                    <div className="text-xs text-muted-foreground mt-2">{data.month}</div>
                    <div className="text-xs font-medium">{data.points}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connections Chart */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                New Connections
              </h4>
              <div className="flex items-end gap-2 h-20">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t-sm"
                      style={{ height: `${(data.connections / 25) * 100}%` }}
                    ></div>
                    <div className="text-xs font-medium mt-1">{data.connections}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Chart */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages Sent
              </h4>
              <div className="flex items-end gap-2 h-20">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${(data.messages / 160) * 100}%` }}
                    ></div>
                    <div className="text-xs font-medium mt-1">{data.messages}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { skill: "Python Programming", level: "Advanced", progress: 85, endorsements: 12 },
              { skill: "Web Design", level: "Intermediate", progress: 65, endorsements: 8 },
              { skill: "Spanish Language", level: "Beginner", progress: 35, endorsements: 5 },
              { skill: "Data Analysis", level: "Learning", progress: 20, endorsements: 2 },
            ].map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{skill.skill}</div>
                    <div className="text-sm text-muted-foreground">
                      {skill.level} • {skill.endorsements} endorsements
                    </div>
                  </div>
                  <div className="text-sm font-medium">{skill.progress}%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

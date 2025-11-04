"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Target, Plus, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  deadline: string
  completed: boolean
}

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Earn 500 Skill Points",
      description: "Build credibility by helping others and completing skill exchanges",
      target: 500,
      current: 347,
      unit: "points",
      deadline: "End of July",
      completed: false,
    },
    {
      id: "2",
      title: "Connect with 10 New People",
      description: "Expand your network by making meaningful connections",
      target: 10,
      current: 7,
      unit: "connections",
      deadline: "End of June",
      completed: false,
    },
    {
      id: "3",
      title: "Complete 20 Volunteer Hours",
      description: "Give back to the community by volunteering your skills",
      target: 20,
      current: 20,
      unit: "hours",
      deadline: "End of May",
      completed: true,
    },
    {
      id: "4",
      title: "Learn Data Analysis",
      description: "Develop new skills in data analysis and visualization",
      target: 100,
      current: 25,
      unit: "% progress",
      deadline: "End of August",
      completed: false,
    },
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)

  const completedGoals = goals.filter((goal) => goal.completed).length
  const totalGoals = goals.length

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGoals}</div>
            <p className="text-xs text-muted-foreground">Active goals set</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedGoals}</div>
            <p className="text-xs text-muted-foreground">Goals achieved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((completedGoals / totalGoals) * 100)}%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Goals</CardTitle>
            <Button onClick={() => setShowAddGoal(!showAddGoal)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border ${goal.completed ? "bg-green-50 border-green-200" : "bg-card"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                        {goal.title}
                      </h3>
                      {goal.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {goal.current}/{goal.target} {goal.unit}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {goal.deadline}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.completed ? "bg-green-500" : "bg-primary"
                    }`}
                    style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>
            ))}
          </div>

          {/* Add Goal Form */}
          {showAddGoal && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3">Add New Goal</h4>
              <div className="space-y-3">
                <Input placeholder="Goal title" />
                <Input placeholder="Description" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Target number" type="number" />
                  <Input placeholder="Unit (e.g., points, hours)" />
                </div>
                <Input placeholder="Deadline" />
                <div className="flex gap-2">
                  <Button size="sm">Add Goal</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowAddGoal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

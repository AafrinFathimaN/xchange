"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Users, Lightbulb, ArrowRight, Star } from "lucide-react"

export function SkillMentor() {
  const recommendations = [
    {
      type: "high-demand",
      title: "Learn React Development",
      reason: "High demand skill with 89% match to your profile",
      description:
        "Based on your JavaScript knowledge, React would be a natural next step. There are 47 people looking for React mentors.",
      difficulty: "Intermediate",
      timeToLearn: "2-3 months",
      demandScore: 95,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      type: "complementary",
      title: "UI/UX Design Principles",
      reason: "Complements your web development skills perfectly",
      description:
        "Adding design skills to your development expertise would make you a full-stack creator. 23 people need design help.",
      difficulty: "Beginner",
      timeToLearn: "1-2 months",
      demandScore: 78,
      icon: Lightbulb,
      color: "text-blue-600",
    },
    {
      type: "trending",
      title: "AI Prompt Engineering",
      reason: "Fastest growing skill in our community",
      description:
        "With the rise of AI tools, prompt engineering is becoming essential. Only 12 people offer this skill currently.",
      difficulty: "Beginner",
      timeToLearn: "2-4 weeks",
      demandScore: 92,
      icon: Brain,
      color: "text-purple-600",
    },
    {
      type: "network",
      title: "Data Visualization",
      reason: "Requested by 3 people in your network",
      description:
        "Your connections Sarah, Mike, and Lisa have all mentioned needing help with data visualization recently.",
      difficulty: "Intermediate",
      timeToLearn: "1-2 months",
      demandScore: 65,
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const learningPaths = [
    {
      title: "Full-Stack Developer Path",
      skills: ["React", "Node.js", "Database Design", "API Development"],
      duration: "6 months",
      difficulty: "Advanced",
    },
    {
      title: "Digital Marketing Specialist",
      skills: ["SEO", "Social Media Marketing", "Content Strategy", "Analytics"],
      duration: "4 months",
      difficulty: "Intermediate",
    },
    {
      title: "Data Science Fundamentals",
      skills: ["Python", "Statistics", "Data Visualization", "Machine Learning"],
      duration: "8 months",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="space-y-6">
      {/* AI Mentor Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Skill Mentor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Personalized skill recommendations based on your profile, market demand, and community needs.
          </p>
        </CardHeader>
      </Card>

      {/* Skill Recommendations */}
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((rec, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <rec.icon className={`w-5 h-5 ${rec.color}`} />
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{rec.demandScore}%</div>
                  <div className="text-xs text-muted-foreground">demand</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{rec.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                  <div className="text-sm font-medium">{rec.difficulty}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Time to Learn</div>
                  <div className="text-sm font-medium">{rec.timeToLearn}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Suggested Learning Paths
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Structured skill development paths tailored to your goals and current expertise.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPaths.map((path, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{path.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{path.duration}</span>
                      <span>•</span>
                      <span>{path.difficulty}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Path
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Strong Foundation</div>
                <div className="text-sm text-muted-foreground">
                  Your Python and web development skills provide a solid base for advanced learning.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">High Engagement</div>
                <div className="text-sm text-muted-foreground">
                  You're actively helping others, which accelerates your own learning through teaching.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Opportunity Area</div>
                <div className="text-sm text-muted-foreground">
                  Consider expanding into design or data science to diversify your skill portfolio.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, Users } from "lucide-react"

interface SkillEndorsement {
  skill: string
  endorsements: number
  endorsed: boolean
}

interface SkillEndorsementsProps {
  skills: SkillEndorsement[]
  onEndorse?: (skill: string) => void
}

export function SkillEndorsements({ skills, onEndorse }: SkillEndorsementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5" />
          Skill Endorsements
        </CardTitle>
        <p className="text-sm text-muted-foreground">Endorse skills you've experienced firsthand</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium">{skill.skill}</span>
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {skill.endorsements}
                </Badge>
              </div>
              <Button
                variant={skill.endorsed ? "default" : "outline"}
                size="sm"
                onClick={() => onEndorse?.(skill.skill)}
                className="text-xs"
              >
                {skill.endorsed ? "Endorsed" : "Endorse"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

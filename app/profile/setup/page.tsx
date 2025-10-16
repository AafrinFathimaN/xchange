import { ProfileSetupForm } from "@/components/profile/profile-setup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import Link from "next/link"

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Xchange</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Tell us about your skills and what you'd like to learn to get better matches.
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Profile Setup</CardTitle>
              <CardDescription>This information helps us connect you with the right skill partners.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileSetupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { HelpRequestForm } from "@/components/volunteer/help-request-form"

export default function VolunteerRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Request Volunteer Help</h1>
          <p className="text-muted-foreground">
            Need help with something? Our community of volunteers is here to support you.
          </p>
        </div>

        <HelpRequestForm />
      </div>
    </div>
  )
}

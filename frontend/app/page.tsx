import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, GradientText } from 'magic-ui'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        <GradientText>Welcome to PumpPerfect</GradientText>
      </h1>
      <p className="text-xl mb-8">Insulin Pump Data Analysis Platform</p>
      <div className="flex space-x-4">
        <Link href="/upload">
          <Button>
            <Sparkles>Upload Data</Sparkles>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary">
            <Sparkles>View Dashboard</Sparkles>
          </Button>
        </Link>
      </div>
    </div>
  )
}

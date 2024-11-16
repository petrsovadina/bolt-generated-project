import { logger } from '../lib/logger'

export default function Home() {
  logger.info('Home page rendered')
  return (
    <div>
      <h1>Welcome to PumpPerfect</h1>
    </div>
  )
}

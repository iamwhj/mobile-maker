import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import dotenvx from '@dotenvx/dotenvx'

const NODE_ENV = process.env.NODE_ENV ?? 'development'

const envFileCandidates = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  '.env',
]

envFileCandidates.forEach((envFile) => {
  const envPath = resolve(process.cwd(), envFile)
  if (existsSync(envPath)) {
    dotenvx.config({ path: envPath })
  }
})

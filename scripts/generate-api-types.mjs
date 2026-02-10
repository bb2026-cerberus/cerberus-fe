import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const baseUrl = process.env.VITE_API_BASE_URL ?? 'https://api.seolberus.co.kr'
const specUrl = new URL('/api-docs', baseUrl).toString()
const binPath = resolve('node_modules/.bin/openapi-typescript')

execFileSync(binPath, [specUrl, '-o', 'src/types/api/generated.ts'], {
  stdio: 'inherit',
})

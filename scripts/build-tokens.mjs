import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOKENS_PATH = path.resolve(__dirname, '../src/figma/Mode 1.tokens.json')
const OUTPUT_PATH = path.resolve(__dirname, '../src/styles/tokens.css')

const toKebab = (value) =>
  value
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase()

const main = async () => {
  const raw = await readFile(TOKENS_PATH, 'utf-8')
  const json = JSON.parse(raw)
  const entries = Object.entries(json)
    .filter(([key, value]) => key !== '$extensions' && value && value.$type === 'color')
    .map(([key, value]) => {
      const hex = value?.$value?.hex
      if (!hex) return null
      return { name: toKebab(key), hex }
    })
    .filter(Boolean)

  const lines = [
    '/* Auto-generated from Figma tokens. Do not edit directly. */',
    '@layer base {',
    '  :root {',
    ...entries.map((entry) => `    --figma-${entry.name}: ${entry.hex};`),
    '  }',
    '}',
    '',
    '@theme inline {',
    ...entries.map(
      (entry) => `  --color-figma-${entry.name}: var(--figma-${entry.name});`,
    ),
    '}',
    '',
  ]

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, lines.join('\n'), 'utf-8')
  console.log(`Wrote ${entries.length} tokens to ${OUTPUT_PATH}`)
}

await main()

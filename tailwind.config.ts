import type { Config } from 'tailwindcss'
import fs from 'node:fs'
import path from 'node:path'

type FigmaTokenValue = {
  $type?: string
  $value?: {
    hex?: string
  }
}

const toKebab = (value: string) =>
  value
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase()

const tokensPath = path.resolve(process.cwd(), 'src/figma/Mode 1.tokens.json')
const rawTokens = fs.readFileSync(tokensPath, 'utf-8')
const figmaTokens = JSON.parse(rawTokens) as Record<string, FigmaTokenValue>
const figmaColorTokens = Object.entries(figmaTokens)
  .filter(([key, value]) => key !== '$extensions' && value?.$type === 'color')
  .reduce<Record<string, string>>((acc, [key]) => {
    acc[`figma-${toKebab(key)}`] = `var(--figma-${toKebab(key)})`
    return acc
  }, {})

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...figmaColorTokens,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config

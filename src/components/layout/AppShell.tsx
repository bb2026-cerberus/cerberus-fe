import type { ReactNode } from 'react'
import cn from '../../utils/cn'

type AppShellProps = {
  title?: string
  headerSlot?: ReactNode
  children: ReactNode
  className?: string
}

function AppShell({ title, headerSlot, children, className }: AppShellProps) {
  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)}>
      <header className="border-b bg-card">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-col">
            {title ? (
              <h1 className="text-lg font-semibold">{title}</h1>
            ) : null}
          </div>
          {headerSlot}
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}

export default AppShell

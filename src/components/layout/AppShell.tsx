import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AppShellProps = {
  title?: string
  header?: ReactNode
  headerSlot?: ReactNode
  hideHeader?: boolean
  children: ReactNode
  className?: string
  headerClassName?: string
  headerInnerClassName?: string
  mainClassName?: string
}

function AppShell({
  title,
  header,
  headerSlot,
  hideHeader = false,
  children,
  className,
  headerClassName,
  headerInnerClassName,
  mainClassName,
}: AppShellProps) {
  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)}>
      {hideHeader ? null : (
        <header className={cn('border-b bg-card', headerClassName)}>
          {header ? (
            header
          ) : (
            <div
              className={cn(
                'mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4',
                headerInnerClassName,
              )}
            >
              <div className="flex flex-col">
                {title ? <h1 className="text-lg font-semibold">{title}</h1> : null}
              </div>
              {headerSlot}
            </div>
          )}
        </header>
      )}
      <main className={cn('mx-auto w-full max-w-5xl px-4 py-6', mainClassName)}>
        {children}
      </main>
    </div>
  )
}

export default AppShell

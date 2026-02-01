import React, { type ReactNode } from 'react'
import { Button } from '../ui/button'

type ErrorBoundaryProps = {
  children: ReactNode
  onReset?: () => void
  title?: string
  description?: string
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReset = () => {
    const { onReset } = this.props
    if (onReset) {
      onReset()
      this.setState({ hasError: false })
      return
    }
    window.location.reload()
  }

  render() {
    const { hasError } = this.state
    const { children, title, description } = this.props

    if (!hasError) {
      return children
    }

    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div>
          <h2 className="text-lg font-semibold">
            {title ?? '문제가 발생했어요.'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {description ?? '잠시 후 다시 시도해 주세요.'}
          </p>
        </div>
        <Button onClick={this.handleReset}>다시 시도</Button>
      </div>
    )
  }
}

export default ErrorBoundary

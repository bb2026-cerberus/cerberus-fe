import * as React from 'react'

type MentorMobileHeaderState = {
  showBack: boolean
  onBack?: () => void
}

type MentorMobileHeaderContextValue = {
  headerState: MentorMobileHeaderState
  setHeaderState: (state: MentorMobileHeaderState) => void
}

const MentorMobileHeaderContext = React.createContext<MentorMobileHeaderContextValue | null>(
  null,
)

function MentorMobileHeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerState, setHeaderState] = React.useState<MentorMobileHeaderState>({
    showBack: false,
  })

  const value = React.useMemo(
    () => ({ headerState, setHeaderState }),
    [headerState],
  )

  return (
    <MentorMobileHeaderContext.Provider value={value}>
      {children}
    </MentorMobileHeaderContext.Provider>
  )
}

function useMentorMobileHeader() {
  const context = React.useContext(MentorMobileHeaderContext)
  if (!context) {
    throw new Error('useMentorMobileHeader must be used within MentorMobileHeaderProvider')
  }
  return context
}

export { MentorMobileHeaderProvider, useMentorMobileHeader }

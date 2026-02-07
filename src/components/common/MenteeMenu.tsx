import type { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  ChevronRight,
  Clock3,
  FileText,
  Home,
  LogOut,
  MessageCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import routePaths from '@/routes/routePaths'

type MenteeMenuItem = {
  label: string
  icon: ComponentType<{ className?: string }>
  onClick?: () => void
  to?: string
}

type MenteeMenuProps = {
  name: string
  subline: string
  avatarUrl?: string
  activeLabel?: string
  side?: 'left' | 'right'
  onNavigateClick?: () => void
  className?: string
}

const menuItems: MenteeMenuItem[] = [
  { label: '홈', icon: Home, to: routePaths.mentee },
  { label: '과제 · 피드백', icon: FileText, to: routePaths.menteeTasks },
  { label: 'Q&A', icon: MessageCircle },
  { label: '타임블록', icon: Clock3, to: routePaths.menteeTimeBlock },
  { label: '주간 리포트', icon: BarChart3, to: routePaths.menteeWeeklyReport },
]

function MenteeMenu({
  name,
  subline,
  avatarUrl,
  activeLabel,
  side = 'left',
  onNavigateClick,
  className,
}: MenteeMenuProps) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-[13px] bg-white px-5 py-[50px] shadow-[4px_0px_20px_rgba(0,0,0,0.15)]',
        side === 'right'
          ? 'rounded-tl-[25px] rounded-bl-[25px]'
          : 'rounded-tr-[25px] rounded-br-[25px]',
        className,
      )}
    >
      <Link
        to={routePaths.menteeMyPage}
        className="flex w-full flex-col items-start gap-[5px] rounded-[14px] bg-white px-[10px] py-0"
        onClick={onNavigateClick}
      >
        <div className="size-[79px] overflow-hidden rounded-full bg-figma-card-gray">
          {avatarUrl ? (
            <img
              alt=""
              className="h-full w-full object-cover"
              src={avatarUrl}
              width={79}
              height={79}
            />
          ) : null}
        </div>
        <div className="flex w-full items-center justify-between p-[10px]">
          <div className="flex flex-col">
            <Text
              as="p"
              variant="title3"
              className="text-[20px] font-semibold text-figma-typo-black"
            >
              {name}
            </Text>
            <Text as="p" variant="body2" className="text-[14px] text-figma-typo-gray">
              {subline}
            </Text>
          </div>
          <div className="flex size-[30px] items-center justify-center text-figma-typo-black">
            <ChevronRight className="size-5" />
          </div>
        </div>
      </Link>

      <div className="h-px w-[218px] bg-figma-typo-gray/30" />

      <div className="flex w-full flex-col gap-[10px] p-5">
        {menuItems.map((item) => {
          const isActive = item.to
            ? item.to === routePaths.mentee
              ? pathname === item.to
              : pathname.startsWith(item.to)
            : activeLabel
              ? item.label === activeLabel
              : false
          const content = (
            <>
              <item.icon
                className={cn(
                  'size-6',
                  isActive ? 'text-figma-point-color-2' : 'text-figma-typo-gray-b',
                )}
              />
              <Text as="span" variant="title3" className="text-[18px] font-medium">
                {item.label}
              </Text>
            </>
          )

          return item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className="flex w-[171px] items-start gap-6 py-[10px] text-figma-typo-black outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              onClick={onNavigateClick}
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              className="flex w-[171px] items-start gap-6 py-[10px] text-figma-typo-black outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              onClick={item.onClick}
            >
              {content}
            </button>
          )
        })}
      </div>

      <div className="h-[200px] w-[171px]" />

      <button
        type="button"
        className="flex w-[171px] items-start gap-6 py-[10px] text-figma-typo-black outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
      >
        <LogOut className="size-6 text-figma-typo-gray-b" />
        <Text as="span" variant="title3" className="text-[18px] font-medium">
          로그아웃
        </Text>
      </button>
    </div>
  )
}

export type { MenteeMenuProps }
export default MenteeMenu

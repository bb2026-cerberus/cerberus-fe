import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import routePaths from '@/routes/routePaths'
import homeIcon from '@/assets/home.svg'
import taskIcon from '@/assets/paper.svg'
import qnaIcon from '@/assets/qna.svg'
import reportIcon from '@/assets/report.svg'
import time from '@/assets/time.svg'

type MenteeMenuItem = {
  label: string
  iconSvg?: string
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
  { label: '홈', iconSvg: homeIcon, to: routePaths.mentee },
  { label: '과제 · 피드백', iconSvg: taskIcon, to: routePaths.menteeTasks },
  { label: 'Q&A', iconSvg: qnaIcon, to: routePaths.menteeQna },
  { label: '타임블록', iconSvg: time, to: routePaths.menteeTimeBlock },
  { label: '주간 리포트', iconSvg: reportIcon, to: routePaths.menteeWeeklyReport },
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
  const navigate = useNavigate()

  const renderMaskIcon = (src: string, active: boolean) => (
    <span
      aria-hidden
      className={cn(
        'flex size-[40px] shrink-0 items-center justify-center',
        active ? 'bg-figma-point-color-2' : 'bg-figma-typo-gray',
      )}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  )

  const handleLogoutClick = () => {
    navigate(routePaths.root)
    // localStorage.removeItem('token')
    // window.location.reload()
  }

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-[16px] bg-figma-white px-[18px] py-[24px] shadow-[0_0_30px_rgba(0,0,0,0.05)]',
        side === 'right'
          ? 'rounded-tl-[19px] rounded-bl-[19px]'
          : 'rounded-tr-[19px] rounded-br-[19px]',
        className,
      )}
    >
      <Link
        to={routePaths.menteeMyPage}
        className="flex w-full flex-col items-start gap-[8px] rounded-[14px] bg-white px-[8px] py-0"
        onClick={onNavigateClick}
      >
        <div className="size-[64px] overflow-hidden rounded-full bg-figma-card-gray">
          {avatarUrl ? (
            <img
              alt=""
              className="h-full w-full object-cover"
              src={avatarUrl}
              width={64}
              height={64}
            />
          ) : null}
        </div>
        <div className="flex w-full items-center justify-between px-[6px] py-[6px]">
          <div className="flex flex-col">
            <Text
              as="p"
              variant="title3"
              className="text-[16px] font-semibold text-figma-typo-black"
            >
              {name}
            </Text>
            <Text as="p" variant="body2" className="text-[14px] text-figma-typo-gray">
              {subline}
            </Text>
          </div>
          <div className="flex size-[30px] items-center justify-center text-figma-typo-black">
            <ChevronRight className="size-4" />
          </div>
        </div>
      </Link>

      <div className="h-px w-full bg-figma-typo-gray/30" />

      <div className="flex min-h-0 w-full flex-1 flex-col gap-[8px] px-[6px]">
        {menuItems.map((item) => {
          const isActive = item.to
            ? item.to === routePaths.mentee
              ? pathname === item.to
              : pathname.startsWith(item.to)
            : activeLabel
              ? item.label === activeLabel
              : false
          const content = (
            <div
              className={cn(
                'flex h-[54px] w-full items-center gap-[8px] rounded-[14px] px-[8px]',
                isActive ? 'bg-figma-card-gray' : '',
              )}
            >
              {item.iconSvg ? renderMaskIcon(item.iconSvg, isActive) : null}
              <Text
                as="span"
                variant="title3"
                className={cn(
                  'text-[16px] font-medium leading-[1.2]',
                  isActive ? 'text-figma-typo-black' : 'text-figma-typo-gray',
                )}
              >
                {item.label}
              </Text>
            </div>
          )

          return item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className="w-full outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              onClick={onNavigateClick}
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              className="w-full outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              onClick={item.onClick}
            >
              {content}
            </button>
          )
        })}
      </div>

      <div className="mt-auto w-full px-[6px] pb-[12px]">
        <button
          type="button"
          className="flex w-full items-center gap-[10px] rounded-[14px] px-[8px] py-[10px] text-figma-typo-black outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
          onClick={handleLogoutClick}
        >
          <LogOut className="size-5 text-figma-typo-gray-b" />
          <Text as="span" variant="title3" className="text-[16px] font-medium">
            로그아웃
          </Text>
        </button>
      </div>
    </div>
  )
}

export type { MenteeMenuProps }
export default MenteeMenu

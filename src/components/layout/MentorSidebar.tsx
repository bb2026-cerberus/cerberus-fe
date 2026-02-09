import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import {
  BarChart3,
  ChevronRight,
  FileText,
  Home,
  Lightbulb,
  MessageCircle,
  Settings,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import routePaths from '@/routes/routePaths'

type MentorSidebarProps = {
  expanded?: boolean
  onToggle?: () => void
  className?: string
}

function MentorSidebar({ expanded = false, onToggle, className }: MentorSidebarProps) {
  const menuItems = useMemo(
    () => [
      { id: 'home', label: '홈', icon: Home, to: routePaths.mentor, isActive: true },
      { id: 'paper', label: '과제', icon: FileText },
      { id: 'feedback', label: '피드백', icon: MessageCircle },
      { id: 'qna', label: 'Q&A', icon: MessageCircle },
      { id: 'report', label: '주간 리포트', icon: BarChart3 },
      { id: 'solution', label: '약점 맞춤 솔루션', icon: Lightbulb },
      { id: 'mentee', label: '멘티 관리', icon: Users },
    ],
    [],
  )

  return (
    <aside
      className={cn(
        'relative h-full transition-[width] duration-300 ease-out',
        expanded ? 'w-[362px]' : 'w-[138px]',
        className,
      )}
      style={{
        '--sidebar-width': expanded ? '362px' : '138px',
      } as React.CSSProperties}
    >
      <div
        className={cn(
          'flex h-full flex-col justify-between overflow-hidden rounded-[19px] bg-figma-white shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-[width,padding] duration-300 ease-out',
          expanded
            ? 'w-[306px] items-start px-[18px] py-[24px]'
            : 'w-[102px] items-center px-[12px] py-[20px]',
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col gap-[52px]',
            expanded ? 'items-start' : 'items-center',
          )}
        >
          <div className="size-[63px] rounded-full bg-figma-typo-gray" />
          <div
            className={cn(
              'flex flex-col gap-[14px]',
              expanded ? 'items-start w-full' : 'items-center',
            )}
          >
            {menuItems.map((item) => {
              const content = (
                <div
                  className={cn(
                    expanded
                      ? 'flex h-[65px] w-full items-center gap-[10px] rounded-[15px] px-[8px]'
                      : 'flex size-[65px] items-center justify-center rounded-[15px]',
                    item.isActive ? 'bg-figma-card-gray text-figma-point-color-2' : '',
                  )}
                >
                  <Icon
                    icon={item.icon}
                    size={26}
                    className={cn(item.isActive ? 'text-figma-point-color-2' : 'text-figma-typo-gray')}
                  />
                  {expanded ? (
                    <Text
                      as="span"
                      className={cn(
                        'text-[22px] font-medium leading-[1.2] transition-opacity duration-200',
                        item.isActive ? 'text-figma-typo-black' : 'text-figma-typo-gray',
                      )}
                    >
                      {item.label}
                    </Text>
                  ) : null}
                </div>
              )

              return item.to ? (
                <Link
                  key={item.id}
                  to={item.to}
                  aria-label={item.id}
                  className={cn(expanded ? 'w-full' : 'w-full flex justify-center')}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.id}
                  className={cn(expanded ? 'w-full' : 'w-full flex justify-center')}
                >
                  {content}
                </button>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col gap-[15px]',
            expanded ? 'items-start w-full' : 'items-center',
          )}
        >
          <button type="button" aria-label="settings" className={expanded ? 'w-full' : undefined}>
            <div
              className={cn(
                expanded
                  ? 'flex h-[65px] w-full items-center gap-[10px] rounded-[15px] px-[8px]'
                  : 'flex size-[65px] items-center justify-center rounded-[15px]',
              )}
            >
              <Icon icon={Settings} size={26} className="text-figma-typo-gray" />
              {expanded ? (
                <Text
                  as="span"
                  className="text-[22px] font-medium leading-[1.2] text-figma-typo-gray transition-opacity duration-200"
                >
                  환경설정
                </Text>
              ) : null}
            </div>
          </button>
          <div className={cn('flex items-center', expanded ? 'w-full gap-[10px]' : '')}>
            <div className="size-[63px] overflow-hidden rounded-full bg-figma-card-gray" />
            {expanded ? (
              <div className="flex flex-col gap-[2px] transition-opacity duration-200">
                <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                  김멘토
                </Text>
                <Text as="p" className="text-[18px] font-medium leading-6 text-figma-typo-gray">
                  kimmento@mail.com
                </Text>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="expand"
        onClick={onToggle}
        className={cn(
          'absolute top-[38px] flex size-[30px] items-center justify-center rounded-full bg-figma-white shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-[left,transform] duration-300 ease-out',
          expanded ? '-translate-x-full rotate-180' : '',
        )}
        style={{
          left: 'calc(var(--sidebar-width) - 6px)',
        }}
      >
        <Icon icon={ChevronRight} size={18} className="text-figma-typo-gray" />
      </button>
    </aside>
  )
}

export default MentorSidebar

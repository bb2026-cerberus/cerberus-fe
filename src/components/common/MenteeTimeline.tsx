import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

/** 타임라인 하루 시작: baseDate 5:00 */
function getTimelineStart(baseDate: Date): Date {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 5, 0, 0, 0)
  return d
}

/**
 * 타임라인 범위: 5:00 ~ 다음날 4:59 (포함).
 * d를 타임라인 분(0~1439)으로 변환. baseDate 5:00 = 0, 다음날 4:59 = 1439.
 */
function dateToTimelineMinutes(d: Date, baseDate: Date): number {
  const start = getTimelineStart(baseDate)
  const diffMs = d.getTime() - start.getTime()
  const diffMinutes = diffMs / (60 * 1000)
  if (diffMinutes < 0) return 0
  if (diffMinutes >= 1440) return 1439
  return Math.floor(diffMinutes)
}

type TimelineSegment = {
  start: Date
  end: Date
  colorClass: string
  type?: 'subject' | 'break'
}

/** 할일=완료 체크 시점, 과제=제출 시점 등 별도 시점 마커 */
type TimelineMarker = {
  time: Date
  timeLabel: string
  title: string
  type: 'todo' | 'assignment'
  colorClass: string
}

type MenteeTimelineProps = {
  /** 타임라인 기준일 (이 날 5:00 ~ 다음날 4:59 범위) */
  baseDate: Date
  segments: TimelineSegment[]
  /** 할일=완료 체크 시점, 과제=제출 시점 등 별도 시점 마커 */
  markers?: TimelineMarker[]
  className?: string
}

const MINUTES_IN_DAY = 24 * 60
const PX_PER_MINUTE = 2

const LABEL_ROW_HEIGHT = 24
const BAR_HEIGHT = 19
/** 마커(세로선+체크 원)가 다 들어갈 높이 — top-5(20px) + size-7(28px) = 48 */
const MARKER_EXTENT = 48

function MenteeTimeline({
  baseDate,
  segments,
  markers = [],
  className,
}: MenteeTimelineProps) {
  const timelineWidth = MINUTES_IN_DAY * PX_PER_MINUTE
  const labelScrollRef = React.useRef<HTMLDivElement>(null)
  const barScrollRef = React.useRef<HTMLDivElement>(null)
  const isSyncingRef = React.useRef(false)
  const hasScrolledToCurrentRef = React.useRef(false)

  const currentTimeLeftPx = React.useMemo(() => {
    return dateToTimelineMinutes(new Date(), baseDate) * PX_PER_MINUTE
  }, [baseDate])

  React.useEffect(() => {
    if (hasScrolledToCurrentRef.current) return
    const labelEl = labelScrollRef.current
    const barEl = barScrollRef.current
    if (!labelEl || !barEl) return
    const viewportWidth = labelEl.clientWidth
    const maxScroll = Math.max(0, timelineWidth - viewportWidth)
    const targetScroll = Math.max(0, Math.min(currentTimeLeftPx - viewportWidth / 2, maxScroll))
    hasScrolledToCurrentRef.current = true
    isSyncingRef.current = true
    labelEl.scrollLeft = targetScroll
    barEl.scrollLeft = targetScroll
    requestAnimationFrame(() => {
      isSyncingRef.current = false
    })
  }, [currentTimeLeftPx, timelineWidth])

  const syncScroll = React.useCallback((source: 'label' | 'bar') => {
    if (isSyncingRef.current) return
    const labelEl = labelScrollRef.current
    const barEl = barScrollRef.current
    if (!labelEl || !barEl) return
    isSyncingRef.current = true
    if (source === 'label') {
      barEl.scrollLeft = labelEl.scrollLeft
    } else {
      labelEl.scrollLeft = barEl.scrollLeft
    }
    requestAnimationFrame(() => {
      isSyncingRef.current = false
    })
  }, [])

  return (
    <div className={cn('w-full rounded-[18px] bg-figma-white px-4 py-4', className)}>
        <div className="relative" style={{ minHeight: MARKER_EXTENT }}>
          {/* 라벨 + 마커 스크롤 (rounded 없음, 마커가 바 위에 보이도록 z-10) */}
          <div
            ref={labelScrollRef}
            className="relative z-10 overflow-x-auto overflow-y-visible"
            onScroll={() => syncScroll('label')}
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              className="relative pt-6"
              style={{ width: timelineWidth, minHeight: MARKER_EXTENT }}
            >
              <div className="h-[19px]" aria-hidden />
              {markers.map((marker, index) => {
                const leftPx = dateToTimelineMinutes(marker.time, baseDate) * PX_PER_MINUTE
                return (
                  <div
                    key={`${marker.time.getTime()}-${marker.title}-${index}`}
                    className="absolute top-0 -translate-x-1/2"
                    style={{ left: leftPx }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Text as="span" variant="caption" className="text-figma-typo-gray">
                        {marker.timeLabel}
                      </Text>
                      <Text
                        as="span"
                        variant="caption"
                        className="font-semibold text-figma-typo-black"
                      >
                        {marker.title}
                      </Text>
                    </div>
                    <div className="absolute left-1/2 top-6 h-[19px] w-px -translate-x-1/2 bg-figma-typo-gray/40" />
                    <div
                      className={cn(
                        'absolute left-1/2 top-5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full text-white',
                        marker.colorClass,
                      )}
                    >
                      <Check className="size-4" />
                    </div>
                  </div>
                )
              })}
              <div
                className="absolute top-6 h-[19px] w-[3px] -translate-x-1/2 rounded-full bg-figma-typo-gray/40"
                style={{ left: currentTimeLeftPx }}
                aria-label="현재 시간"
              />
            </div>
          </div>
          {/* 바만 스크롤 (rounded-full로 스크롤해도 바 양끝만 둥글게 보임, 마커 뒤로 가도록 z-0) */}
          <div
            ref={barScrollRef}
            className="absolute left-0 right-0 z-0 overflow-x-auto overflow-y-hidden rounded-full"
            style={{ top: LABEL_ROW_HEIGHT, height: BAR_HEIGHT, scrollbarWidth: 'none' }}
            onScroll={() => syncScroll('bar')}
          >
            <div style={{ width: timelineWidth, height: BAR_HEIGHT }}>
              <div className="relative h-[19px] w-full overflow-hidden rounded-full bg-figma-card-gray">
                {segments.map((segment, index) => {
                  const startMin = dateToTimelineMinutes(segment.start, baseDate)
                  const endMin = dateToTimelineMinutes(segment.end, baseDate)
                  const left = startMin * PX_PER_MINUTE
                  const width = Math.max(0, endMin - startMin) * PX_PER_MINUTE
                  const isBreak = segment.type === 'break'

                  return (
                    <div
                      key={`${segment.start.getTime()}-${segment.end.getTime()}-${index}`}
                      className={cn(
                        'absolute top-0 h-full max-h-full',
                        segment.colorClass,
                        isBreak && 'opacity-40',
                      )}
                      style={{
                        left,
                        width,
                        height: 19,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export type { MenteeTimelineProps, TimelineSegment, TimelineMarker }
export default MenteeTimeline

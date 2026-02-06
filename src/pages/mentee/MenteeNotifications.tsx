import * as React from 'react'

import MenteeSection from '@/components/common/MenteeSection'
import NotificationItem from '@/components/common/NotificationItem'

function MenteeNotifications() {
  const notifications = React.useMemo(
    () => [
      {
        id: 'assignment-remind',
        title: '과제 미완료 리마인드',
        message: '영어 지문 2개 요약이 아직 미완료예요.',
        timeText: '방금',
        variant: 'alert' as const,
      },
      {
        id: 'mentor-feedback',
        title: '멘토 피드백 등록',
        message: '국어 피드백이 등록되었어요. 확인해 주세요.',
        timeText: '1시간 전',
        variant: 'info' as const,
      },
    ],
    [],
  )

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-4 pt-4">
        <MenteeSection className="flex flex-col gap-2.5">
          {notifications.map((item) => (
            <NotificationItem
              key={item.id}
              title={item.title}
              message={item.message}
              timeText={item.timeText}
              variant={item.variant}
            />
          ))}
        </MenteeSection>
      </div>
    </div>
  )
}

export default MenteeNotifications

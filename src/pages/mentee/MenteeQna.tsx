import { Text } from '@/components/common/Text'
import MenteeSection from '@/components/common/MenteeSection'

function MenteeQna() {
  return (
    <div className="w-full px-4 py-6">
      <MenteeSection className="flex flex-col gap-3">
        <Text as="h2" variant="title3" className="text-figma-typo-black">
          Q&A
        </Text>
        <Text as="p" variant="body2" className="text-figma-typo-gray">
          준비 중인 페이지입니다.
        </Text>
      </MenteeSection>
    </div>
  )
}

export default MenteeQna

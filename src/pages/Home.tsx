import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ActionButton from '@/components/common/ActionButton'
import SegmentedTabs, { type SegmentedTabItem } from '@/components/common/SegmentedTabs'
import { Text } from '@/components/common/Text'
import { Input } from '@/components/ui/input'
import routePaths from '@/routes/routePaths'
import authApi from '@/services/api/auth'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import type { UserRole } from '@/types/shared/auth'

function Home() {
  const navigate = useNavigate()
  const { setRole } = useAuth()
  const { loading, error, setError, run } = useApiRequest()
  const [role, setRoleState] = useState<'mentor' | 'mentee'>('mentor')
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const roleItems: SegmentedTabItem<'mentor' | 'mentee'>[] = [
    { label: '멘토', value: 'mentor' },
    { label: '멘티', value: 'mentee' },
  ]

  const normalizeRole = (value?: string | null): UserRole | null => {
    if (!value) return null
    const lowered = value.toLowerCase()
    if (lowered === 'mentor' || lowered === 'mentee') {
      return lowered
    }
    return null
  }

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }

    const response = await run(
      () =>
        authApi.login({
          id: loginId.trim(),
          password: password.trim(),
        }),
      { errorMessage: '로그인에 실패했어요. 아이디/비밀번호를 확인해주세요.' },
    )

    if (!response) return

    const apiRole = normalizeRole(response?.data?.role)
    const nextRole = apiRole ?? role
    setRole(nextRole)
    navigate(nextRole === 'mentor' ? routePaths.mentor : routePaths.mentee)
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center gap-[66px] bg-figma-white px-4 pb-10 pt-[48px]">
      <div className="flex w-full flex-col gap-2 px-2">
        <Text as="h1" className="text-[28px] font-bold leading-[1.35] text-figma-typo-black">
          자체 콘텐츠 기반 수능 코칭
        </Text>
        <Text as="p" className="text-[14px] font-semibold leading-6 text-figma-typo-gray">
          계정 선택 후 바로 시작하세요
        </Text>
      </div>

      <div className="flex w-full max-w-[346px] flex-col gap-[10px] px-[5px]">
        <div className="flex flex-col gap-2">
          <Text as="p" className="text-[12px] font-semibold leading-6 text-figma-typo-gray">
            역할 선택
          </Text>
          <div className="flex items-center justify-center">
            <SegmentedTabs
              value={role}
              items={roleItems}
              onChange={setRoleState}
              className="h-[42px] w-[194px] rounded-[10px] bg-figma-light-gray p-[5px]"
              buttonClassName="h-[32px] rounded-[8px] px-[10px] text-[16px] font-semibold leading-6"
              activeClassName="bg-figma-point-color-2 text-white"
              inactiveClassName="bg-figma-light-gray text-figma-typo-gray"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text as="p" className="text-[12px] font-semibold leading-6 text-figma-typo-gray">
            아이디
          </Text>
          <Input
            placeholder="아이디를 입력해주세요"
            className="h-[57px] rounded-[10px] border-0 bg-figma-light-gray px-[14px] text-[14px] font-semibold text-figma-typo-black placeholder:text-figma-typo-gray focus-visible:ring-0"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text as="p" className="text-[12px] font-semibold leading-6 text-figma-typo-gray">
            비밀번호
          </Text>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="h-[50px] rounded-[10px] border-0 bg-figma-light-gray px-[14px] text-[14px] font-semibold text-figma-typo-black placeholder:text-figma-typo-gray focus-visible:ring-0"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error ? (
          <Text as="p" className="text-[12px] font-semibold text-figma-sub-color-2">
            {error}
          </Text>
        ) : null}
      </div>

      <div className="flex w-full max-w-[336px] flex-col gap-[10px]">
        <ActionButton
          label={loading ? '로그인 중...' : '로그인'}
          onClick={handleLogin}
          className="h-[58px]"
        />
        <ActionButton label="회원가입" variant="secondary" className="h-[58px]" />
      </div>
    </div>
  )
}

export default Home

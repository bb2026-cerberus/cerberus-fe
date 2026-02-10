import { Download } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import todosApi from '@/services/api/todos'
import { api } from '@/services/api/http'

type FileDownloadCardProps = {
  title: string
  fileUrl?: string
  fileName?: string
  className?: string
}

function FileDownloadCard({ title, fileUrl, fileName, className }: FileDownloadCardProps) {
  const [isDownloading, setIsDownloading] = React.useState(false)

  const handleDownload = async () => {
    if (!fileUrl || isDownloading) return
    setIsDownloading(true)
    try {
      const response = await todosApi.downloadTodoFileBlob({ fileUrl })
      const blob = response.data
      const link = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      link.href = url
      link.download = fileName ?? 'workbook'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      const baseUrl = api.defaults.baseURL ?? ''
      const downloadUrl = `${baseUrl}/todos/download?fileUrl=${encodeURIComponent(fileUrl)}`
      window.open(downloadUrl || fileUrl, '_blank', 'noopener,noreferrer')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div
      className={cn(
        'flex h-[80px] w-full items-center justify-between rounded-[18px] bg-figma-point-color-2 px-4',
        className,
      )}
    >
      <Text as="p" className="text-[16px] font-semibold leading-6 text-white">
        {title}
      </Text>
      <button
        type="button"
        onClick={handleDownload}
        disabled={!fileUrl || isDownloading}
        className={cn(
          'inline-flex items-center gap-1 rounded-[25px] bg-figma-light-gray px-3 py-1',
          (!fileUrl || isDownloading) && 'cursor-not-allowed opacity-60',
        )}
      >
        <Text as="span" className="text-[14px] font-bold leading-6 text-figma-point-color-2">
          {isDownloading ? '다운로드 중...' : '다운로드'}
        </Text>
        <Icon icon={Download} size={16} className="text-figma-point-color-2" />
      </button>
    </div>
  )
}

export type { FileDownloadCardProps }
export default FileDownloadCard

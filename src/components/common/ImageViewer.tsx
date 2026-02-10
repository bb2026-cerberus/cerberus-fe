import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ImageViewerProps = {
  imageUrl: string
  overlay?: ReactNode
  className?: string
  imageClassName?: string
  containerClassName?: string
}

function ImageViewer({
  imageUrl,
  overlay,
  className,
  imageClassName,
  containerClassName,
}: ImageViewerProps) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div
        className={cn(
          'relative flex h-[391px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-white',
          containerClassName,
        )}
      >
        <img src={imageUrl} alt="" className={cn('h-full w-full object-cover', imageClassName)} />
        {overlay ? <div className="absolute right-3 top-3">{overlay}</div> : null}
      </div>
    </div>
  )
}

export type { ImageViewerProps }
export default ImageViewer

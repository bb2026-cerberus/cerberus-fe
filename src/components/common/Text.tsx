import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('font-sans text-foreground', {
  variants: {
    variant: {
      headline1: 'text-[28px] font-bold leading-[1.35] tracking-[0]',
      title3: 'text-[16px] font-medium leading-tight tracking-[0]',
      body1: 'text-[16px] font-normal leading-[1.5]',
      body2: 'text-[14px] font-normal leading-[1.5]',
      caption: 'text-[12px] font-normal leading-[1.4]',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
})

type TextProps<T extends ElementType> = {
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'> &
  VariantProps<typeof textVariants>

/** DOM 전역 Text와의 이름 충돌을 피하기 위해 Typography로 정의 후 export */
function Typography<T extends ElementType = 'p'>({
  as,
  variant,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? 'p') as ElementType
  return <Component className={cn(textVariants({ variant }), className)} {...props} />
}

export type { TextProps }
export { Typography as Text, textVariants }

import type { LucideIcon, LucideProps } from 'lucide-react'

import { cn } from '../../lib/utils'

type IconProps = LucideProps & {
  icon: LucideIcon
}

function Icon({ icon: IconComponent, className, size = 20, ...props }: IconProps) {
  return <IconComponent className={cn('shrink-0', className)} size={size} {...props} />
}

export type { IconProps }
export { Icon }

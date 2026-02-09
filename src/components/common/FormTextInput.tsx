import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type FormTextInputProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  size?: 'md' | 'lg'
  readOnly?: boolean
  className?: string
}

function FormTextInput({
  value,
  placeholder,
  onChange,
  size = 'md',
  readOnly = false,
  className,
}: FormTextInputProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(event) => onChange?.(event.target.value)}
      className={cn(
        'border-none shadow-none placeholder:text-figma-typo-gray focus-visible:ring-0 focus-visible:ring-offset-0',
        readOnly ? 'bg-figma-card-gray text-figma-typo-gray-b' : 'bg-white text-figma-typo-black',
        size === 'lg'
          ? 'h-[64px] rounded-[16px] px-[20px] text-[18px] font-semibold leading-6'
          : 'h-[52px] rounded-[14px] px-4 text-[14px] font-medium leading-[1.4]',
        className,
      )}
    />
  )
}

export type { FormTextInputProps }
export default FormTextInput

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type FormTextInputProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

function FormTextInput({ value, placeholder, onChange, className }: FormTextInputProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange?.(event.target.value)}
      className={cn(
        'h-[52px] rounded-[14px] border-none bg-white px-4 text-[14px] font-medium leading-[1.4] text-figma-typo-black shadow-none placeholder:text-figma-typo-gray focus-visible:ring-0 focus-visible:ring-offset-0',
        className,
      )}
    />
  )
}

export type { FormTextInputProps }
export default FormTextInput

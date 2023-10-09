import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useFormContext } from 'react-hook-form'
import * as React from 'react'

import { Icon, Label } from '@/components'
import clsx from 'clsx'

interface PasswordProps extends React.ComponentPropsWithRef<'input'> {
  id: string
  label: string
}

export default function Password({ id, label, ...rest }: PasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const { register, formState } = useFormContext()
  const { errors } = formState

  return (
    <div className="flex flex-col gap-1.5 xl:gap-2.5 relative">
      <Label htmlFor={label}>{label}</Label>
      <div className="relative">
        <input
          {...register(id)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          autoComplete="on"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          className={clsx(
            'input-base border-2 px-4 py-2 xl:px-6 xl:py-3',
            errors[id] ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-primary'
          )}
        />
        <Icon
          className="absolute right-0 top-1/2 mr-3 h-8 w-8 -translate-y-1/2 text-slate-400 md:mr-4 text-[17px] xl:text-lg"
          onClick={togglePassword}
        >
          {showPassword ? <HiEyeSlash /> : <HiEye />}
        </Icon>
      </div>
      {errors[id] && (
        <span className="mt-1 text-xs text-red-400 absolute top-full left-0">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  )
}

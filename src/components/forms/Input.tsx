import { RegisterOptions, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons'
import * as React from 'react'
import clsx from 'clsx'

import Label from './Label'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  id: string
  label?: string
  leftIcon?: IconType | string
  disabled?: boolean
  validation?: RegisterOptions
}

export default function Input({ id, label, leftIcon: LeftIcon, disabled, validation, ...rest }: InputProps) {
  const { register, formState } = useFormContext()
  const { errors } = formState

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5 relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="pointer-events-none absolute top-1/2 ml-3 -translate-y-1/2 text-lg text-slate-400 md:ml-4 md:text-xl" />
        )}
        <input
          {...register(id, validation)}
          {...rest}
          name={id}
          id={id}
          disabled={disabled}
          type="text"
          className={clsx(
            'input-base border-2 px-4 py-2 xl:px-6 xl:py-3',
            LeftIcon && 'pl-10 xl:pl-12',
            errors[id] ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-primary'
          )}
        />
      </div>
      {errors[id] && (
        <span className="mt-1 text-xs text-red-400 absolute top-full left-0">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  )
}

import * as React from 'react'

import clsxm from '@/utils/lib/clsxm'
import { Loading } from '.'

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'base' | 'outline' | 'info'
  loading?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
  isHasIcon?: boolean
}

export default function Button({ variant, loading, disabled, className, children, isHasIcon, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={clsxm([
        [
          variant === 'primary' && ['bg-primary text-white hover:bg-emerald-700 disabled:bg-primary/70'],
          variant === 'secondary' && ['bg-primary/5 text-primary hover:bg-primary/10'],
          variant === 'success' && ['bg-green-500 text-white hover:bg-green-700 disabled:bg-green-500/70'],
          variant === 'danger' && ['bg-red-500 text-white hover:bg-red-700 disabled:bg-red-500/70'],
          variant === 'info' && ['bg-blue-500 text-white hover:bg-blue-700 disabled:bg-blue-500/70'],
          variant === 'base' && ['bg-white hover:bg-slate-100 disabled:bg-white/70'],
          variant === 'outline' && ['border border-slate-300 py-[7px] text-font hover:bg-slate-200 md:py-[8px]']
        ],
        [
          'relative flex items-center justify-center rounded-md text-xs font-semibold md:text-sm',
          'disabled:cursor-not-allowed disabled:shadow-none',
          'py-2 md:py-[9px]'
        ],
        [isHasIcon && 'gap-2 xl:px-4 px-2'],
        [loading && 'disabled:text-transparent'],
        className
      ])}
    >
      {loading && (
        <Loading
          className={clsxm(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            variant === 'outline' || variant === 'base' ? 'text-font' : 'text-white'
          )}
        />
      )}
      {children}
    </button>
  )
}

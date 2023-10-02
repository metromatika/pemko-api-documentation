import clsxm from '@/utils/lib/clsxm'

interface IconProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Icon({ children, className, onClick }: IconProps) {
  return (
    <div
      className={clsxm('flex cursor-pointer items-center justify-center rounded-full hover:bg-slate-200', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

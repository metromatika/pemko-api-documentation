import clsxm from '@/utils/lib/clsxm'

interface AccessTypeProps {
  condition: boolean
  children?: React.ReactNode
  className?: string
}

export default function AccessType({ condition, children, className }: AccessTypeProps) {
  return (
    <p
      className={clsxm(
        'rounded py-[2px] px-2 text-[10px] uppercase font-semibold',
        condition ? 'bg-emerald-100 text-primary' : 'text-orange-600 bg-orange-100',
        className
      )}
    >
      {children}
    </p>
  )
}

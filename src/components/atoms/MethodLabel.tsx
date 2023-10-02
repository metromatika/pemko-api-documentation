import clsxm from '@/utils/lib/clsxm'

interface MethodLabelProps {
  method: string
  className?: string
}

export default function MethodLabel({ method, className }: MethodLabelProps) {
  return (
    <span
      className={clsxm([
        [
          method === 'GET' && ['bg-green-500'],
          method === 'POST' && ['bg-yellow-500'],
          method === 'PUT' && ['bg-blue-500'],
          method === 'DELETE' && ['bg-red-500']
        ],
        ['p-1 rounded font-bold text-white tracking-wide'],
        [!className && 'text-[10px]'],
        className
      ])}
    >
      {method}
    </span>
  )
}

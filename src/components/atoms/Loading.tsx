import clsxm from '@/utils/lib/clsxm'
import { ImSpinner2 } from 'react-icons/im'

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={clsxm('flex', className)}>
      <ImSpinner2 className="animate-spin m-auto" />
    </div>
  )
}

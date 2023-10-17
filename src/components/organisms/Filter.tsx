import { Button } from '@/components'
import clsx from 'clsx'

interface FilterProps {
  name: string
  isActive: boolean
  action: (name: string) => void
}

export default function Filter({ isActive, name, action }: FilterProps) {
  return (
    <Button
      variant="outline"
      onClick={() => action(name)}
      className={clsx(
        'xl:py-1.5 py-1 px-3 xl:px-4 rounded-full capitalize',
        isActive && 'bg-primary text-white border-primary hover:bg-emerald-700'
      )}
    >
      {name}
    </Button>
  )
}

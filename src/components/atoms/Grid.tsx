import clsx from 'clsx'

interface GridProps {
  children: React.ReactNode
  className?: string
  column?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  row?: '1' | '2' | '3' | '4' | '5' | '6'
}

export default function Grid({ children, className, column, row }: GridProps) {
  return (
    <div className={clsx('xl:grid', column && `xl:grid-cols-${column}`, row && `xl:grid-rows-${row}`, className)}>
      {children}
    </div>
  )
}

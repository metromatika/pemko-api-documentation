import clsxm from '@/utils/lib/clsxm'

interface SectionProps {
  children?: React.ReactNode
  variant: 'left' | 'right'
  className?: string
}

export default function Section({ children, variant, className }: SectionProps) {
  return (
    <section
      className={clsxm([
        [
          variant === 'left' && ['border-t-2 col-span-3 border-line flex flex-col gap-3 xl:gap-5 py-5'],
          variant === 'right' && [
            'xl:border-t-2 col-span-2 mb-10 xl:mb-0 bg-dark border-white/10 xl:rounded-none rounded-lg p-4'
          ]
        ],
        ['xl:px-10 xl:py-8 mx-4 xl:mx-0'],
        className
      ])}
    >
      {children}
    </section>
  )
}

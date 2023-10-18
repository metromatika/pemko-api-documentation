import clsxm from '@/utils/lib/clsxm'
import clsx from 'clsx'

interface EmptyCollectionProps {
  keyword: string
  className?: string
  type?: 'project' | 'source code'
}

export default function EmptyCollection({ keyword, className, type = 'project' }: EmptyCollectionProps) {
  return (
    <div
      className={clsxm(
        'flex min-h-[calc(100vh-258px-80px-32px)] xl:min-h-[calc(100vh-273px-32px)] flex-col text-title justify-center items-center gap-5',
        className
      )}
    >
      <span className="xl:text-5xl text-4xl w-24 h-24 xl:w-28 xl:h-28 flex justify-center items-center bg-font/20 rounded-full">
        {keyword ? '🔍' : '🚫'}
      </span>
      <div
        className={clsx(
          'flex flex-col gap-2 items-center w-full xl:px-0 px-6 text-center',
          type === 'project' ? 'xl:w-4/12' : 'xl:w-6/12'
        )}
      >
        <h1 className="text-xl xl:text-2xl font-semibold capitalize">{keyword ? 'No data found' : `No ${type}`}</h1>
        <span className="text-title/70 text-sm xl:text-[15px]">
          {keyword ? (
            <span>
              Sorry, we have searched everywhere for projects with the keyword{' '}
              <span className="font-bold italic">`{keyword}`</span>. Try searching with other keywords
            </span>
          ) : (
            `There are no ${type} available in API Documentation at the moment, let's try to create a new ${type} now.`
          )}
        </span>
      </div>
    </div>
  )
}

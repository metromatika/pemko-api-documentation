interface EmptyCollectionProps {
  keyword: string
}

export default function EmptyCollection({ keyword }: EmptyCollectionProps) {
  return (
    <div className="flex min-h-[calc(100vh-258px-80px)] xl:min-h-[calc(100vh-273px)] flex-col text-title justify-center items-center gap-5">
      <span className="xl:text-5xl text-4xl w-24 h-24 xl:w-28 xl:h-28 flex justify-center items-center bg-font/20 rounded-full">
        {keyword ? '🔍' : '🚫'}
      </span>
      <div className="flex flex-col gap-2 items-center w-full xl:px-0 px-6 xl:w-4/12 text-center">
        <h1 className="text-xl xl:text-2xl font-semibold">{keyword ? 'No data found' : 'No projects'}</h1>
        <span className="text-title/70 text-sm xl:text-[15px]">
          {keyword ? (
            <span>
              Sorry, we have searched everywhere for projects with the keyword{' '}
              <span className="font-bold italic">`{keyword}`</span>. Try searching with other keywords
            </span>
          ) : (
            "There are no projects available in API Documentation at the moment, let's try to create a new project now."
          )}
        </span>
      </div>
    </div>
  )
}

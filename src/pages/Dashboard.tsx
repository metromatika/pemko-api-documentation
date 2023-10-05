import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import * as React from 'react'

import { Button, Collection, Collections, Dropdown, EmptyCollection, Loading } from '@/components'
import { useDebounce, useSearch, useSearchPath, useTitle } from '@/hooks'
import { DropdownType } from '@/utils/types/dropdown.type'

import { useToken, useUserInfo } from '@/store/client'
import { useGetCollections } from '@/store/server'

const data: DropdownType[] = [
  { title: 'Public projects', alias: 'all' },
  { title: 'My Projects', alias: 'self' }
]

export default function Dashboard() {
  useTitle('Dashboard')
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  const [dropownData, setDropownData] = React.useState<DropdownType>(data[0])

  const token = useToken((state) => state.token)
  const user = useUserInfo((state) => state.user)

  const [keyword, setKeyword] = useSearch(search as string)
  const debounceKeyword = useDebounce(keyword, 500)
  useSearchPath('/', debounceKeyword)

  const {
    data: collections,
    isSuccess,
    hasNextPage,
    isFetching,
    fetchNextPage
  } = useGetCollections(token, search || '', dropownData.alias)

  return (
    <section className="flex flex-col pb-8">
      <div className="bg-dark p-6 xl:py-10">
        <div className="xl:w-9/12 mx-auto flex flex-col">
          <div className="flex items-start justify-between">
            <h1 className="text-white text-2xl xl:text-4xl font-semibold">Wellcome 👋</h1>
            {token && user?.role.alias === 'programmer' && (
              <Dropdown lists={data} value={dropownData.title} setValue={setDropownData} />
            )}
          </div>
          <p className="text-font-dark tracking-wide mt-2 text-[13px] xl:text-[15px]">
            Here is a list of all existing api documentation projects both private and public, if you have not
            registered then you cannot create new projects and can only see public projects, but if you have registered
            you can see your public and private projects.
          </p>
          <div className="flex items-center gap-3 xl:gap-5 bg-white/10 py-3 xl:py-4 px-4 xl:px-6 rounded-lg overflow-hidden mt-7 xl:mt-10">
            <HiMagnifyingGlass className="pointer-events-none text-lg text-white/40 xl:text-2xl" />
            <input
              type="text"
              placeholder="Search for projects"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="outline-none text-white placeholder:text-white/30 rounded-lg xl:text-xl text-sm w-full bg-transparent"
            />
          </div>
        </div>
      </div>

      {isSuccess ? (
        collections.pages.map((groups, index) => (
          <React.Fragment key={index}>
            {groups.data.length > 0 ? (
              <Collections>
                {groups.data.map((collection) => (
                  <Collection key={collection.id} collection={collection} />
                ))}
              </Collections>
            ) : (
              <EmptyCollection keyword={search as string} />
            )}
          </React.Fragment>
        ))
      ) : (
        <Loading className="min-h-[calc(100vh-305px)] text-primary/50 m-auto text-4xl" />
      )}

      {hasNextPage && isSuccess && (
        <Button
          variant="primary"
          className="w-fit px-5 mt-8 mx-auto"
          onClick={() => fetchNextPage()}
          loading={isFetching}
        >
          Load more
        </Button>
      )}
    </section>
  )
}

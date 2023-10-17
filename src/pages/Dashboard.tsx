import * as React from 'react'
import clsx from 'clsx'

import { Button, Collections, DashboardSearch, Dropdown, EmptyCollection, Filter, Loading } from '@/components'
import { useCreateParams, useDebounce, useGetParams, useSearch, useSearchPath, useTitle } from '@/hooks'
import { DropdownType, access, dataDropdown } from '@/utils/types/dropdown.type'

import { useToken } from '@/store/client'
import { useGetCollections } from '@/store/server'

export default function Dashboard() {
  const createParams = useCreateParams()
  const { search, accessType, filter } = useGetParams(['search', 'accessType', 'filter'])

  const token = useToken((state) => state.token)

  const [keyword, setKeyword] = useSearch(search as string)
  const debounceKeyword = useDebounce(keyword, 500)
  useSearchPath('/', debounceKeyword)

  useTitle(filter === 'self' ? 'My Projects' : 'Dashboard')

  const {
    data: collections,
    isSuccess,
    hasNextPage,
    isFetching,
    fetchNextPage
  } = useGetCollections({
    token,
    title: search as string,
    filter: (filter as (typeof dataDropdown)[number]['alias']) || 'all',
    accessType: (accessType as (typeof access)[number]) || null
  })

  const handleFilter = (value: string) => {
    createParams(value === 'all', { key: 'accessType', value })
  }

  const handleDropdown = ({ alias }: DropdownType) => {
    createParams(alias === 'all', { key: 'filter', value: alias })
  }

  return (
    <section className="flex flex-col pb-8">
      <div className="bg-dark p-6 xl:py-10">
        <div className="xl:w-9/12 mx-auto flex flex-col">
          <div className="flex items-start justify-between">
            <h1 className="text-white text-2xl xl:text-4xl font-semibold">
              {filter === 'self' ? 'My Projects' : 'Welcome 👋'}
            </h1>
            {token && (
              <Dropdown
                lists={dataDropdown}
                setValue={handleDropdown}
                value={filter === 'self' ? 'My Projects' : dataDropdown[0].title}
              />
            )}
          </div>
          <p className="text-font-dark tracking-wide mt-2 text-[13px] xl:text-[15px]">
            Here is a list of all existing api documentation projects both private and public, if you have not
            registered then you cannot create new projects and can only see public projects, but if you have registered
            you can see your public and private projects.
          </p>
          <DashboardSearch keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      {token && filter === 'self' && (
        <div className="flex items-center gap-2 xl:gap-3 xl:w-9/12 mx-auto w-full pt-4 xl:pt-7 px-6 xl:px-0">
          <Filter name="All" isActive={!accessType} action={() => handleFilter('all')} />
          {access.map((item, id) => (
            <Filter key={id} name={item} isActive={item === accessType} action={() => handleFilter(item)} />
          ))}
        </div>
      )}

      {isSuccess ? (
        collections.pages.map((groups, index) => (
          <React.Fragment key={index}>
            {groups?.length !== 0 ? (
              <Collections data={groups.data} />
            ) : (
              <EmptyCollection
                keyword={search || ''}
                className={clsx(
                  filter === 'self' && 'min-h-[calc(100vh-258px-80px-62px-32px)] xl:min-h-[calc(100vh-273px-62px-32px)]'
                )}
              />
            )}
          </React.Fragment>
        ))
      ) : (
        <Loading
          className={clsx(
            'min-h-[calc(100vh-258px-80px-32px)] xl:min-h-[calc(100vh-273px-32px)] text-primary/50 m-auto text-3xl xl:text-4xl',
            filter === 'self' && 'min-h-[calc(100vh-258px-80px-62px-32px)] xl:min-h-[calc(100vh-273px-62px-32px)]'
          )}
        />
      )}

      {hasNextPage && isSuccess && (
        <Button
          variant="primary"
          loading={isFetching}
          className="w-fit px-5 mt-8 mx-auto"
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </section>
  )
}

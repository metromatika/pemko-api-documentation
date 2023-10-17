import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import * as React from 'react'
import clsx from 'clsx'

import { Brand, Button, ProjectLink, SearchBar, HeaderMobile, UnAuth, Auth, BgAbsolute, Loading } from '@/components'
import { useGetCollection, useGetCollections } from '@/store/server'
import { useDisableBodyScroll, useOutsideClick } from '@/hooks'
import { useToken } from '@/store/client'
import { ItemType } from '@/utils/types'

export default function LeftBar() {
  const [isShow, setIsShow] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  useDisableBodyScroll(isShow)
  const ref = useOutsideClick(() => setIsShow(false))

  const navigate = useNavigate()
  const { collectionId } = useParams<{ collectionId: string }>()
  const token = useToken((state) => state.token)

  const { data: collections, isLoading, hasNextPage, fetchNextPage, isFetching } = useGetCollections({ token })
  const { data: collection, isLoading: isLoadingDetail } = useGetCollection(collectionId as string, !!collectionId)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/?search=' + keyword)
  }

  return (
    <React.Fragment>
      <HeaderMobile action={() => setIsShow(true)} />
      <div
        ref={ref}
        className={clsx(
          'bg-sideBar top-0 overflow-scroll no-scroll h-screen flex-col xl:flex z-50 fixed xl:sticky transition-transform',
          isShow ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        )}
      >
        <section className="flex flex-col sticky top-0 bg-gray pb-3 pt-4 xl:pb-5 xl:pt-[30px] mx-5 border-b border-line bg-sideBar">
          <div className="mb-[30px] hidden xl:block">
            <Brand withPlus />
          </div>

          <div className="flex items-center justify-between">
            <SearchBar
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              handleSubmit={handleSearch}
            />
            <HiXMark className="text-2xl xl:hidden ml-4" onClick={() => setIsShow(false)} />
          </div>
          {token && (
            <Link to="/create" className="flex-1" onClick={() => setIsShow(false)}>
              <Button variant="primary" className="mt-5 text-sm xl:hidden w-full">
                Add New Project
              </Button>
            </Link>
          )}
        </section>

        <div className="flex flex-col my-5">
          <span className="text-title/60 mb-2 text-sm mx-5">Projects</span>
          {isLoading || isLoadingDetail ? (
            <Loading className="text-primary text-2xl min-h-full" />
          ) : (
            <nav className="flex flex-col gap-2">
              {collectionId ? (
                <ProjectLink
                  key={collection?.id}
                  name={collection?.project_name as string}
                  path={'/' + collection?.id}
                  items={collection?.json_file.item as unknown as ItemType[]}
                />
              ) : (
                collections?.pages.map((groups, index) => (
                  <React.Fragment key={index}>
                    {groups?.length !== 0 ? (
                      groups.data.map((collection) => (
                        <ProjectLink
                          key={collection.id}
                          name={collection.project_name}
                          path={'/' + collection.id}
                          items={collection.json_file.item as unknown as ItemType[]}
                        />
                      ))
                    ) : (
                      <span className="text-title/60 text-center italic text-xs">No projects</span>
                    )}
                  </React.Fragment>
                ))
              )}

              {hasNextPage && !isLoading && (
                <Button
                  variant="outline"
                  className="w-fit px-4 xl:text-xs mx-auto mt-2"
                  onClick={() => fetchNextPage()}
                  loading={isFetching}
                >
                  Load more
                </Button>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-5 px-5 sticky bottom-0 top-full xl:top-0 py-5 bg-sideBar mt-auto border-t border-line">
          {token ? <Auth /> : <UnAuth />}
        </div>
      </div>
      <BgAbsolute isShow={isShow} />
    </React.Fragment>
  )
}

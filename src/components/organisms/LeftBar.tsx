import { Link, createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'
import { HiXMark } from 'react-icons/hi2'
import * as React from 'react'
import clsx from 'clsx'

import { Brand, Button, ProjectLink, SearchBar, HeaderMobile, UnAuth, Auth, BgAbsolute } from '@/components'
import { useGetCollection, useGetCollections } from '@/store/server'
import { useDisableBodyScroll, useOutsideClick, useSearch } from '@/hooks'
import { useToken } from '@/store/client'
import { ItemType } from '@/utils/types'

export default function LeftBar() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  const [isShow, setIsShow] = React.useState(false)
  const [keyword, setKeyword] = useSearch(search as string)

  useDisableBodyScroll(isShow)
  const ref = useOutsideClick(() => setIsShow(false))

  const navigate = useNavigate()
  const { collectionId } = useParams<{ collectionId: string }>()
  const token = useToken((state) => state.token)

  const { data: collections, isLoading } = useGetCollections(token, '')
  const { data: collection, isLoading: isLoadingCollection } = useGetCollection(collectionId as string, !!collectionId)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({ pathname: '/', search: `?${createSearchParams({ search: keyword })}` })
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
          <Link to="/create" className="flex-1" onClick={() => setIsShow(false)}>
            <Button variant="primary" className="mt-5 text-sm xl:hidden w-full">
              Add New Project
            </Button>
          </Link>
        </section>

        <div className="flex flex-col my-5">
          <span className="text-title/60 mb-2 text-sm mx-5">Projects</span>
          {isLoading || isLoadingCollection ? (
            <div className="flex justify-center items-center min-h-full">
              <ImSpinner2 className="animate-spin text-2xl text-primary/50" />
            </div>
          ) : (
            <nav className="flex flex-col gap-2">
              {collectionId ? (
                <ProjectLink
                  key={collection?.id}
                  name={collection?.title as string}
                  path={'/' + collection?.id}
                  items={collection?.json_file.item as unknown as ItemType[]}
                />
              ) : (
                collections?.data.map((collection) => (
                  <ProjectLink
                    key={collection.id}
                    name={collection.title}
                    path={'/' + collection.id}
                    items={collection.json_file.item as unknown as ItemType[]}
                  />
                ))
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

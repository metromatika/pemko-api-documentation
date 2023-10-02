import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'
import * as React from 'react'

import { useDebounce, useDisableBodyScroll, useSearch, useSearchPath, useTitle } from '@/hooks'
import { Button, Collection, Modal } from '@/components'

import { useGetCollections } from '@/store/server'
import { useToken } from '@/store/client'

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')
  console.log({ search })

  useTitle('Dashboard')

  const [isShow, setIsShow] = React.useState(false)
  const [keyword, setKeyword] = useSearch(search as string)

  const token = useToken((state) => state.token)
  const debounceKeyword = useDebounce(keyword, 500)
  const { data: collections, isSuccess } = useGetCollections(token, search || '')

  useDisableBodyScroll(isShow)
  useSearchPath('/', debounceKeyword)

  return (
    <section className="flex flex-col">
      <div className="bg-dark p-6 xl:py-10">
        <div className="xl:w-9/12 mx-auto flex flex-col">
          <h1 className="text-white text-2xl xl:text-4xl font-semibold">Wellcome 👋</h1>
          <p className="text-font-dark tracking-wide mt-2 text-[13px] xl:text-[15px]">
            Here is a list of all existing api documentation projects both private and public, if you have not
            registered then you cannot create new projects and can only see public projects, but if you have registered
            you can see your public and private projects.
          </p>
          <div className="flex gap-3 xl:gap-5 mt-7 xl:mt-10">
            <div className="flex items-center gap-3 xl:gap-5 bg-white/10 py-3 xl:py-4 px-4 xl:px-6 rounded-lg overflow-hidden w-full">
              <HiMagnifyingGlass className="pointer-events-none text-lg text-white/40 xl:text-2xl" />
              <input
                type="text"
                placeholder="Search for projects"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="outline-none text-white placeholder:text-white/30 rounded-lg xl:text-xl text-sm w-full bg-transparent"
              />
            </div>
            <Button variant="base" className="px-4 xl:px-5 hidden" onClick={() => setIsShow(true)}>
              <HiAdjustmentsHorizontal className="text-xl xl:text-3xl text-dark" />
            </Button>
          </div>
        </div>
      </div>
      {isSuccess ? (
        collections.data.length > 0 ? (
          <div className="xl:w-9/12 mx-auto grid grid-cols-1 xl:grid-cols-3 py-4 xl:py-7 gap-5 w-full px-6 xl:px-0">
            {collections.data.map((collection) => (
              <Collection key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[calc(100vh-273px)] flex-col text-title justify-center items-center gap-5">
            <span className="text-5xl w-28 h-28 flex justify-center items-center bg-font/20 rounded-full">🔍</span>
            <div className="flex flex-col gap-2 items-center w-4/12 text-center">
              <h1 className="text-2xl xl:text-2xl font-semibold">No data found</h1>
              <span className="text-title/70 text-[15px]">
                Sorry, we have searched everywhere for projects with the keyword bbh. Try searching with other keywords
              </span>
            </div>
          </div>
        )
      ) : (
        <div className="flex min-h-[calc(100vh-273px)]">
          <ImSpinner2 className="animate-spin text-primary/50 m-auto text-4xl" />
        </div>
      )}
      <Modal isShow={isShow} setIsShow={setIsShow} />
    </section>
  )
}

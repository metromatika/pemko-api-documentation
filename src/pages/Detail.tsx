import { Navigate, useParams } from 'react-router-dom'
import { HiChevronUp } from 'react-icons/hi2'

import { Grid, Header, Markdown, Section, PostFolder, Icon, Back, Loading, More, AccessType } from '@/components'
import { ItemType, RequestType, ResponseType } from '@/utils/types'
import { useTitle } from '@/hooks'

import { useGetCollection } from '@/store/server'
import { useToken, useUserInfo } from '@/store/client'

export default function Detail() {
  const { collectionId } = useParams<{ collectionId: string }>()
  const user = useUserInfo((state) => state.user)
  const token = useToken((state) => state.token)

  const { data: collection, isLoading, isSuccess } = useGetCollection(collectionId as string)
  useTitle(collection?.project_name as string)

  if (isLoading) {
    return <Loading className="xl:min-h-screen min-h-[calc(100vh-80px)] text-primary/50 text-4xl xl:text-6xl" />
  }

  if (isSuccess && collection === undefined) {
    return <Navigate to="/404" />
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="flex flex-col">
      <Header />
      <section className="flex min-h-[calc(100vh-50px)] flex-col">
        <Grid column="5">
          <Section variant="left" className="border-none py-4 xl:py-0 pb-8 xl:pb-8">
            <Back />

            <AccessType
              condition={collection?.access_type === 'private'}
              className="xl:px-2 xl:py-1 w-fit xl:text-[11px] mt-5 -mb-3"
            >
              {collection?.access_type}
            </AccessType>
            <div className="flex justify-between items-center flex-row">
              <h1 className="xl:text-4xl text-3xl font-semibold text-title">{collection?.project_name}</h1>
              {token && (user?.id === collection?.user_id || user?.role.alias === 'administrator') && (
                <More
                  id={collectionId as string}
                  name={collection?.project_name as string}
                  userId={collection?.user_id as string}
                />
              )}
            </div>

            {collection?.json_file?.info?.description && <Markdown>{collection.json_file.info.description}</Markdown>}
          </Section>
          <Section variant="right" className="xl:grid hidden border-none" />
        </Grid>

        {collection?.json_file.item?.map((folder, index) => (
          <PostFolder
            key={index}
            name={folder?.name}
            description={folder?.description as string}
            method={folder?.request?.method}
            apiLists={folder.item as unknown as ItemType[]}
            request={folder?.request as unknown as RequestType}
            response={folder?.response as ResponseType[]}
          />
        ))}
      </section>

      <Icon
        onClick={scrollToTop}
        className="w-10 h-10 xl:w-12 xl:h-12 bg-primary fixed bottom-4 right-5 hover:bg-emerald-700"
      >
        <HiChevronUp className="text-white text-lg xl:text-2xl" />
      </Icon>
    </section>
  )
}

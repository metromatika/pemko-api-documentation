import { HiChevronUp, HiTrash, HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'

import { useDeleteCollection, useGetCollection, useUpdateCollection } from '@/store/server'
import { Button, Grid, Header, Markdown, Section, PostFolder, Icon, Back } from '@/components'
import { ItemType, RequestType, ResponseType } from '@/utils/types'
import { useDialog, useUserInfo } from '@/store/client'
import { useTitle } from '@/hooks'

export default function Detail() {
  const { dialog } = useDialog()
  const navigate = useNavigate()
  const { collectionId } = useParams<{ collectionId: string }>()

  const user = useUserInfo((state) => state.user)
  const { data: collection, isLoading } = useGetCollection(collectionId as string)
  const { mutateAsync: deleteCollection, isLoading: isLoadingDelete } = useDeleteCollection()
  const { mutateAsync: updateCollection, isLoading: isLoadingUpdate } = useUpdateCollection()

  useTitle(collection?.title as string)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = () => {
    dialog({
      title: 'Delete Documentation',
      description: `Are you sure you want to remove the ${collection?.title} api documentation project?`,
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteCollection(collection?.id as string)
      navigate('/')
    })
  }

  const handleUpdate = () => {
    const accessType = collection?.access_type === 'public' ? 'private' : 'public'

    dialog({
      title: 'Update Documentation',
      description: `Are you sure you want to change ${collection?.title} api documentation project to ${accessType}?`,
      variant: 'info',
      submitText: 'Update'
    }).then(async () => {
      await updateCollection({ access_type: accessType, collectionId: collection?.id as string })
    })
  }

  if (isLoading) {
    return (
      <div className="xl:min-h-screen min-h-[calc(100vh-80px)] flex w-full">
        <ImSpinner2 className="animate-spin text-primary/50 text-4xl xl:text-6xl m-auto" />
      </div>
    )
  }

  return (
    <section className="flex flex-col">
      <Header />
      <section className="flex min-h-[calc(100vh-50px)] flex-col">
        <Grid column="5">
          <Section variant="left" className="border-none py-4 xl:py-0 pb-8 xl:pb-8">
            <Back />
            <div className="flex justify-between items-center">
              <h1 className="xl:text-4xl text-3xl font-semibold text-title">{collection?.title}</h1>
              {user?.id === collection?.user_id && (
                <div className="flex items-center gap-2 xl:gap-3">
                  <Button variant="outline" isHasIcon onClick={handleUpdate} loading={isLoadingUpdate}>
                    {collection?.access_type === 'public' ? <HiEye /> : <HiEyeSlash />}
                    <span className="hidden xl:flex capitalize">{collection?.access_type}</span>
                  </Button>
                  <Button variant="danger" isHasIcon onClick={handleDelete} loading={isLoadingDelete}>
                    <HiTrash />
                    <span className="hidden xl:flex">Delete</span>
                  </Button>
                </div>
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

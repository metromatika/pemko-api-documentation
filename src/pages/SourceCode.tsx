import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import * as React from 'react'

import { useGetCollection, useGetCollectionSourceCode } from '@/store/server'
import { Back, Button, DropZone, EmptyCollection, File, Loading } from '@/components'
import { useUserInfo } from '@/store/client'
import { useCreateSourceCode } from '@/store/server/useSourceCode'

export type SourceCodeField = {
  source_code: File[]
}

export default function SourceCode() {
  const [isShow, setIsShow] = React.useState(false)
  const forms = useForm<SourceCodeField>({ mode: 'onTouched' })
  const user = useUserInfo((state) => state.user)
  const { collectionId } = useParams<{ collectionId: string }>()

  const { mutate: createSourceCode, isLoading, isSuccess: isSuccessCreate } = useCreateSourceCode()
  const { data: collection, isLoading: isLoadingCollection } = useGetCollection(collectionId as string)
  const { data: codes, isLoading: isLoadingCode } = useGetCollectionSourceCode(
    collectionId as string,
    user?.id !== collectionId
  )

  React.useEffect(() => {
    if (isSuccessCreate) {
      forms.reset()
      setIsShow(false)
    }
  }, [isSuccessCreate, forms])

  if (isLoadingCode || isLoadingCollection) {
    return <Loading className="min-h-[calc(100vh-80px)] text-primary text-4xl" />
  }

  const onSubmit = (values: SourceCodeField) => {
    createSourceCode({ ...values, collectionId: collectionId as string })
  }

  return (
    <section className="flex flex-col p-4 xl:p-10">
      <Back />
      <div className="xl:w-8/12 w-full mx-auto mt-5">
        <h1 className="xl:text-4xl text-3xl font-semibold text-title mb-8">{collection?.project_name}</h1>
        <div className="my-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-emerald-700 text-sm xl:text-base">Source Code</h4>
            {!isShow && (
              <Button variant="primary" className="xl:text-xs text-[10px] px-3 gap-2" onClick={() => setIsShow(true)}>
                <HiPlus />
                <span>Add new source code</span>
              </Button>
            )}
          </div>
          {isShow && (
            <FormProvider {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-5 mb-10">
                <DropZone
                  id="source_code"
                  accept={{ 'application/vnd.rar': ['.rar'], 'application/zip': ['.zip'] }}
                  validation={{ required: 'Source code must be filled' }}
                  helperText="You can upload file with .zip or .rar extension."
                />
                <div className="flex items-center gap-2 w-fit ml-auto">
                  <Button variant="outline" className="px-3 w-fit ml-auto" onClick={() => setIsShow(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" className="px-3 w-fit ml-auto" loading={isLoading}>
                    Add new
                  </Button>
                </div>
              </form>
            </FormProvider>
          )}
          <div className="flex flex-col xl:gap-2 gap-1 mt-5">
            {codes?.map((code) => <File data={code} key={code.id} />)}
            {codes?.length === 0 ? <EmptyCollection className="w-full" keyword="" type="source code" /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

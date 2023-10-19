import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as React from 'react'

import { Back, Button, DropZone, Input, Loading, Select } from '@/components'
import { useCreateCollection, useGetCollection, useUpdateCollection } from '@/store/server'
import { CollectionCreateField, CollectionType } from '@/utils/types'

export default function Create() {
  const navigate = useNavigate()
  const { collectionId } = useParams<{ collectionId: string }>()
  const forms = useForm<CollectionCreateField>({ mode: 'onTouched' })

  const { mutateAsync: createCollection, isLoading } = useCreateCollection()
  const { data: collection, isSuccess } = useGetCollection(collectionId as string, !!collectionId)
  const { mutateAsync: updateCollection, isLoading: isLoadingUpdate } = useUpdateCollection()

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('project_name', collection.project_name)
      forms.setValue('access_type', { value: collection.access_type, label: collection.access_type.toUpperCase() })
    }
  }, [isSuccess, collection, forms])

  const onSubmit = async (values: CollectionCreateField) => {
    let response: CollectionType
    if (collectionId) {
      response = await updateCollection({ ...values, collectionId })
    } else {
      response = await createCollection(values)
    }

    if (response) navigate(`/${response.id}`)
  }

  if (!isSuccess && collectionId) {
    return <Loading className="min-h-[calc(100vh-80px)] text-primary text-4xl" />
  }

  return (
    <section className="flex flex-col p-4 xl:p-10">
      <Back />
      <div className="xl:w-6/12 w-full mx-auto mt-5">
        <div className="flex flex-col xl:gap-1">
          <h1 className="text-2xl xl:text-3xl font-bold uppercase text-dark">
            {collectionId ? 'Edit' : 'Create a new'} project
          </h1>
          <span className="text-font/80 xl:text-[15px] text-xs">
            Please fill out the entire form below to {collectionId ? 'edit the' : 'create a new'} project.
          </span>
        </div>
        <FormProvider {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 xl:gap-7 mt-5 xl:mt-12">
            <Input
              id="project_name"
              label="Project name"
              placeholder="Project name"
              validation={{ required: 'Project name is required' }}
            />
            <Select
              id="access_type"
              label="Access type"
              placeholder="Select access type"
              validation={{ required: 'Access type is required' }}
              options={[
                { value: 'public', label: 'PUBLIC' },
                { value: 'private', label: 'PRIVATE' }
              ]}
            />
            <DropZone
              id="json_file"
              label="Collection (max. 1)"
              accept={{ 'application/json': ['.json'] }}
              maxFiles={1}
              validation={collectionId ? undefined : { required: 'Collection is required' }}
              helperText="You can upload file with .postman_collection.json extension."
            />
            {!collectionId && (
              <DropZone
                id="source_code"
                label="Source code"
                accept={{ 'application/vnd.rar': ['.rar'], 'application/zip': ['.zip'] }}
                helperText="You can upload file with .zip or .rar extension."
              />
            )}
            <Button variant="primary" className="w-fit px-4 ml-auto mb-10" loading={isLoading || isLoadingUpdate}>
              {collectionId ? 'Update' : 'Create'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

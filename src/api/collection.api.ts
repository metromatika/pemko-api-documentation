import { CollectionCreateField, CollectionPaginationType, CollectionType, CollectionUpdateField } from '@/utils/types'
import { SourceCodeType } from '@/utils/types/sourceCode.type'
import api from './axiosInstance'

export const createCollectionFn = async (fields: CollectionCreateField): Promise<CollectionType> => {
  const formdata = new FormData()
  formdata.append('project_name', fields.project_name)
  formdata.append('access_type', fields.access_type.value)
  formdata.append('json_file', fields.json_file[0])

  if (fields.source_code) {
    fields.source_code.map((file) => {
      formdata.append('source_code_file[]', file)
    })
  }

  const response = await api.post('/collection', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data.data
}

export const updateCollectionFn = async (fields: CollectionUpdateField): Promise<CollectionType> => {
  const formdata = new FormData()
  formdata.append('project_name', fields.project_name)
  formdata.append('access_type', fields.access_type.value)
  formdata.append('_method', 'PUT')

  if (fields.json_file) {
    formdata.append('json_file', fields.json_file[0])
  }

  const response = await api.post(`/collection/${fields.collectionId}`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data.data
}

export const getCollectionsFn = async (
  title: string,
  get: 'self' | 'all',
  page: number,
  accessType?: 'public' | 'private'
): Promise<CollectionPaginationType> => {
  const response = await api.get(
    `/collection?project_name=${title}${get === 'all' ? '' : `&get=${get}`}&page=${page}${
      accessType ? `&access_type=${accessType}` : ''
    }`
  )

  return response.data.data
}

export const getCollectionFn = async (collectionId: string): Promise<CollectionType> => {
  const response = await api.get(`/collection/${collectionId}`)
  return response.data.data
}

export const getCollectionSourceCodeFn = async (collectionId: string): Promise<SourceCodeType[]> => {
  const response = await api.get(`/collection/${collectionId}/source-code`)
  return response.data.data
}

export const deleteCollectionFn = async (collectionId: string) => {
  await api.delete(`/collection/${collectionId}`)
}

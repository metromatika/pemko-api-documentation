import { CollectionPaginationType, CollectionResponseType, CollectionType } from '@/utils/types'
import api from './axiosInstance'

type CreateInput = {
  access_type: 'public' | 'private'
  json_file: File
}

type UpdateInput = {
  collectionId: string
  access_type: 'public' | 'private'
}

export const createCollectionFn = async (fields: CreateInput): Promise<CollectionResponseType> => {
  const formdata = new FormData()
  formdata.append('access_type', fields.access_type)
  formdata.append('json_file', fields.json_file)

  const response = await api.post('/collection', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getCollectionsFn = async (
  title: string,
  get: 'self' | 'all',
  page: number,
  accessType?: 'public' | 'private'
): Promise<CollectionPaginationType> => {
  console.log({ title, get, page, accessType })
  console.log(`/collection?title=${title}&get=${get}&page=${page}${accessType ? `&access_type=${accessType}` : ''}`)

  const response = await api.get(
    `/collection?title=${title}&get=${get}&page=${page}${accessType ? `&access_type=${accessType}` : ''}`
  )
  return response.data.data
}

export const getCollectionFn = async (collectionId: string): Promise<CollectionType> => {
  const response = await api.get(`/collection/${collectionId}`)
  return response.data.data
}

export const deleteCollectionFn = async (collectionId: string) => {
  await api.delete(`/collection/${collectionId}`)
}

export const updateCollectionFn = async ({ access_type, collectionId }: UpdateInput): Promise<CollectionType> => {
  const response = await api.put(`/collection/${collectionId}`, { access_type })
  return response.data.data
}

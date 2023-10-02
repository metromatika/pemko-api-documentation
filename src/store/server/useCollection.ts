import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  createCollectionFn,
  deleteCollectionFn,
  getCollectionFn,
  getCollectionsFn,
  updateCollectionFn
} from '@/api/collection.api'

export const useCreateCollection = () => {
  const queryClient = useQueryClient()

  return useMutation(createCollectionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('collections')
      toast.success('Collection Created!')
    }
  })
}

export const useGetCollections = (token: string, title: string) => {
  return useQuery({
    queryKey: ['collections', token, title],
    queryFn: () => getCollectionsFn(title)
  })
}

export const useGetCollection = (collectionId: string, enabled?: boolean) => {
  return useQuery(['collection', collectionId], () => getCollectionFn(collectionId), { enabled: enabled ?? false })
}

export const useDeleteCollection = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteCollectionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('collections')
      toast.success('Collection deleted!')
    }
  })
}

export const useUpdateCollection = () => {
  const queryClient = useQueryClient()

  return useMutation(updateCollectionFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['collection', data.id])
      toast.success('Collection updated!')
    }
  })
}

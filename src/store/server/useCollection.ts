import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
  createCollectionFn,
  deleteCollectionFn,
  getCollectionFn,
  getCollectionSourceCodeFn,
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

interface GetCollectionsProps {
  token: string
  title?: string
  filter?: 'self' | 'all'
  accessType?: 'public' | 'private'
}

export const useGetCollections = ({ token, title = '', filter = 'all', accessType }: GetCollectionsProps) => {
  return useInfiniteQuery({
    queryKey: ['collections', token, title, filter, accessType],
    queryFn: ({ pageParam: page = 0 }) => getCollectionsFn(title, filter, page, accessType),
    getNextPageParam: (lastPage, pages) => {
      if (Math.ceil(lastPage.total / 6) > pages.length) {
        return pages.length + 1
      }
      return undefined
    }
  })
}

export const useGetCollection = (collectionId: string, enabled?: boolean) => {
  return useQuery(['collection', collectionId], () => getCollectionFn(collectionId), { enabled: enabled ?? false })
}

export const useGetCollectionSourceCode = (collectionId: string, enabled?: boolean) => {
  return useQuery('source-code', () => getCollectionSourceCodeFn(collectionId), {
    enabled: enabled ?? false
  })
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
      queryClient.invalidateQueries('collections')
      toast.success('Collection updated!')
    }
  })
}

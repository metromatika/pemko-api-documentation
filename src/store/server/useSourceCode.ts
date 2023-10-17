import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { createSourceCodeFn, deleteSourceCodeFn, downloadSourceCodeFn } from '@/api/sourceCode.api'

export const useDownloadSourceCode = (sourceCodeId: string, fileName: string) => {
  return useQuery('source-code', () => downloadSourceCodeFn(sourceCodeId, fileName))
}

export const useDeleteSourceCode = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteSourceCodeFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('source-code')
      toast.success('Source code deleted!')
    }
  })
}

export const useCreateSourceCode = () => {
  const queryClient = useQueryClient()

  return useMutation(createSourceCodeFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('source-code')
      toast.success('Source code deleted!')
    }
  })
}

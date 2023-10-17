import api from './axiosInstance'

export const downloadSourceCodeFn = async (sourceCodeId: string, fileName: string) => {
  const response = await api.get(`/source-code/${sourceCodeId}/download`, {
    responseType: 'blob'
  })

  const link = document.createElement('a')
  const url = window.URL.createObjectURL(new Blob([response.data]))
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

export const deleteSourceCodeFn = async (sourceCodeId: string) => {
  return await api.delete(`/source-code/${sourceCodeId}`)
}

type CreateSourceCodeField = {
  collectionId: string
  source_code: File[]
}

export const createSourceCodeFn = async (fields: CreateSourceCodeField) => {
  const formData = new FormData()
  formData.append('collection_id', fields.collectionId)
  fields.source_code.map((file) => {
    formData.append('source_code_file[]', file)
  })

  return await api.post('/source-code', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

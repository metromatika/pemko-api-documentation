import { useSearchParams } from 'react-router-dom'

export default function useGetParams<T extends string[]>(params: T) {
  const [searchParams] = useSearchParams()

  const getAllParams = () => {
    const data: Record<string, string> = {}

    params.forEach((param) => {
      data[param] = searchParams.get(param) || ''
    })

    return data as Record<T[number], string>
  }

  return getAllParams()
}

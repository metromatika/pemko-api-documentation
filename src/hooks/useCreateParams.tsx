import { useSearchParams } from 'react-router-dom'

type ParamsType = {
  key: string
  value: string
}

export default function useCreateParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleFilter = (conditionDelete: boolean, params: ParamsType) => {
    if (conditionDelete) {
      setSearchParams(
        (searchParam) => {
          searchParam.delete(params.key)
          return searchParam
        },
        { replace: false }
      )
      return
    }

    searchParams.set(params.key, params.value)
    setSearchParams(searchParams, { replace: true })
  }

  return handleFilter
}

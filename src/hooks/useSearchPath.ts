import * as React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useSearchPath(_pathname: string, keyword: string) {
  const [searchParams, setSearchParams] = useSearchParams()

  React.useEffect(() => {
    if (keyword || searchParams.get('search')) {
      searchParams.set('search', keyword)
      setSearchParams(searchParams, { replace: false })
    }
  }, [keyword, setSearchParams, searchParams])
}

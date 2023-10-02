import * as React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function useSearchPath(pathname: string, keyword: string) {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (keyword) {
      navigate({ pathname, search: `?${createSearchParams({ search: keyword })}` })
    } else {
      navigate({ pathname, search: '' })
    }
  }, [keyword, navigate, pathname])
}

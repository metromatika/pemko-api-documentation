import * as React from 'react'

export default function useSearch(query: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [keyword, setKeyword] = React.useState<string>(query)

  React.useEffect(() => {
    if (query) {
      setKeyword(query)
    } else {
      setKeyword('')
    }
  }, [query])

  return [keyword, setKeyword]
}

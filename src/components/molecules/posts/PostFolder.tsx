import * as React from 'react'

import { RequestType, ItemType, ResponseType } from '@/utils/types'
import { Markdown, Section, PostApi } from '@/components'

interface PostFolderProps {
  name: string
  method?: string
  description?: string
  apiLists: ItemType[] | null
  request: RequestType
  response: ResponseType[]
}

export default function PostFolder({ name, method, description, apiLists, ...rest }: PostFolderProps) {
  return (
    <React.Fragment>
      {method ? <PostApi id={name} name={name} {...rest} /> : <FolderDesc name={name} desc={description as string} />}

      {apiLists?.map((api, index) =>
        api.item ? (
          <PostFolder
            key={index}
            apiLists={api.item}
            name={api.name}
            method={api.request?.method}
            description={api.description?.toString()}
            request={api.request as unknown as RequestType}
            response={api.response as ResponseType[]}
          />
        ) : (
          <PostApi
            key={index}
            id={`${name}-${api.name}`}
            name={api.name}
            request={api.request as unknown as RequestType}
            response={api.response as ResponseType[]}
          />
        )
      )}
    </React.Fragment>
  )
}

const FolderDesc = ({ name, desc }: { name: string; desc: string }) => {
  return (
    <article className="xl:grid xl:grid-cols-5">
      <Section variant="left">
        <h2 className="text-2xl font-semibold text-title">{name}</h2>
        {desc && <Markdown>{desc as string}</Markdown>}
      </Section>
      <Section variant="right" className="xl:grid hidden" />
    </article>
  )
}

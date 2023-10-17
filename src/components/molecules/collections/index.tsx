import { CollectionType } from '@/utils/types'
import { Collection } from '@/components'

interface CollectionsProps {
  data: CollectionType[]
}

export default function Collections({ data }: CollectionsProps) {
  return (
    <section className="xl:w-9/12 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 w-full px-6 xl:px-0 pt-4 xl:pt-7">
      {data.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </section>
  )
}

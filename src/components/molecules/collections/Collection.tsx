import { AccessType } from '@/components'
import { countItemCollection } from '@/utils/lib/services'
import { CollectionType } from '@/utils/types'
import { HiCloud } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

interface CollectionProps {
  collection: CollectionType
}

export default function Collection({ collection }: CollectionProps) {
  return (
    <Link
      to={'/' + collection.id}
      className="flex flex-col px-5 py-4 xl:px-6 border border-gray-200 rounded-lg hover:border-gray-500 transition-all duration-300 gap-3 xl:gap-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base xl:text-lg font-semibold text-title truncate-1">{collection.project_name}</h3>

        <AccessType className="ml-auto" condition={collection.access_type === 'private'}>
          {collection.access_type}
        </AccessType>
      </div>
      <div className="flex flex-col text-slate-500 gap-1 bg-slate-100 rounded-md divide-y divide-gray-200">
        {collection.json_file.item.slice(0, 2).map((folder, index) => (
          <div key={index} className="flex items-center gap-3 px-4 py-2">
            <HiCloud className="text-base xl:text-[17px]" />
            <span className="text-xs xl:text-[13px]">{folder.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 px-4 py-2">
          <HiCloud className="text-[17px]" />
          <span className="text-[13px]">+ {countItemCollection(collection.json_file.item) - 2} more</span>
        </div>
      </div>
    </Link>
  )
}

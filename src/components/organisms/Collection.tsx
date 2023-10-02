import { countItemCollection } from '@/utils/lib/services'
import { CollectionType } from '@/utils/types'
import clsx from 'clsx'
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
        <h3 className="text-base xl:text-lg font-semibold text-title">{collection.title}</h3>
        <span
          className={clsx(
            'rounded-full ml-auto py-[2px] px-2 text-[10px] text-white uppercase',
            collection.access_type === 'private' ? 'bg-primary' : 'bg-indigo-600'
          )}
        >
          {collection.access_type}
        </span>
      </div>
      <div className="flex flex-col text-gray-500 gap-1 bg-gray-100 rounded-md divide-y divide-gray-200">
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

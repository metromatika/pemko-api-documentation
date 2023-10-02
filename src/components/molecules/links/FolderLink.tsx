import { HiOutlineFolder, HiOutlineFolderOpen } from 'react-icons/hi2'
import { Link } from 'react-scroll'
import * as React from 'react'

import { MethodLabel, ApiLink } from '@/components'
import { ItemType } from '@/utils/types'
import { useGetWindows } from '@/hooks'

interface FolderLinkProps {
  name: string
  method?: string
  items: ItemType[] | null
}

export default function FolderLink({ name, items, method }: FolderLinkProps) {
  const [isShow, setIsShow] = React.useState(false)
  const { isMobile } = useGetWindows()

  return (
    <div className="ml-3 flex flex-col gap-2">
      {!items ? (
        <Link
          className="menu gap-3 cursor-pointer"
          to={name}
          smooth={true}
          duration={500}
          offset={isMobile ? -80 : 0}
          spy={true}
        >
          <MethodLabel method={method as string} />
          <span className="text-sm truncate max-w-[144px] text-title/90">{name}</span>
        </Link>
      ) : (
        <div className="menu gap-3 cursor-pointer" onClick={() => setIsShow(!isShow)}>
          {isShow ? <HiOutlineFolderOpen className="text-[17px]" /> : <HiOutlineFolder className="text-[17px]" />}
          <span className="text-sm truncate max-w-[144px] text-title/90">{name}</span>
        </div>
      )}

      {isShow && items && (
        <div className="flex flex-col gap-2">
          {items.map((api, index) =>
            api.item ? (
              <FolderLink key={index} name={api.name} items={api.item} />
            ) : (
              <ApiLink
                key={index}
                name={api.name}
                href={`${name}-${api.name}`}
                method={api?.request?.method as string}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

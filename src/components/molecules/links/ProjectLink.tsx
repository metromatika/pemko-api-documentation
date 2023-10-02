import { HiChevronDown, HiOutlineDocumentText } from 'react-icons/hi2'
import { NavLink, useLocation } from 'react-router-dom'
import * as React from 'react'

import { ItemType } from '@/utils/types'
import FolderLink from './FolderLink'

interface ProjectLinkProps {
  path: string
  name: string
  items: ItemType[]
}

export default function ProjectLink({ path, name, items }: ProjectLinkProps) {
  const { pathname } = useLocation()
  const [isShow, setIsShow] = React.useState<boolean>()

  React.useEffect(() => {
    setIsShow(pathname === path)
  }, [pathname, path])

  return (
    <React.Fragment>
      <NavLink
        to={path}
        onClick={() => setIsShow(!isShow)}
        className={({ isActive }) => (isActive ? 'menu bg-primary text-white hover:bg-emerald-700' : 'menu')}
        end
      >
        <HiOutlineDocumentText className="text-lg flex" />
        <span className="text-[15px] truncate max-w-[100px]">{name}</span>
        <HiChevronDown className={`ml-auto ${!isShow && '-rotate-90'}`} />
      </NavLink>
      {pathname === path && isShow && (
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <FolderLink name={item.name} items={item.item} method={item.request?.method} key={index} />
          ))}
        </div>
      )}
    </React.Fragment>
  )
}

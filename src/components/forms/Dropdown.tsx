import clsx from 'clsx'
import * as React from 'react'
import { HiChevronDown } from 'react-icons/hi2'

import { DropdownType } from '@/utils/types/dropdown.type'

interface DropdownProps {
  lists: DropdownType[]
  value: string
  setValue: (value: DropdownType) => void
}

export default function Dropdown({ lists, value, setValue }: DropdownProps) {
  const [isShow, setIsShow] = React.useState(false)

  return (
    <div className="relative" onClick={() => setIsShow(!isShow)}>
      <div className="flex items-center gap-2 xl:gap-3 bg-white/20 px-2.5 py-1.5 xl:px-3 xl:py-1.5 rounded-md shadow-md cursor-pointer">
        <span className="text-white font-semibold text-xs xl:text-base">{value}</span>
        <HiChevronDown className="text-white xl:text-base text-sm" />
      </div>
      <ul
        className={clsx(
          'absolute top-full mt-1 right-0 flex flex-col bg-[#4D5864] rounded-md overflow-hidden min-w-[119px] xl:min-w-[155px] shadow-xl',
          !isShow && 'hidden'
        )}
      >
        {lists.map((list, index) => (
          <li
            key={index}
            className="px-2.5 py-1.5 xl:px-3 xl:py-1.5 text-white cursor-pointer hover:bg-[#444d57] text-[10px] xl:text-sm"
            onClick={() => setValue({ title: list.title, alias: list.alias })}
          >
            {list.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

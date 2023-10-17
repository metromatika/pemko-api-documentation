import { HiOutlineCodeBracket, HiOutlineCog6Tooth, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'
import { Button } from '@/components'

import * as React from 'react'
import clsx from 'clsx'
import { useDialog, useUserInfo } from '@/store/client'
import { useNavigate } from 'react-router-dom'
import { useDeleteCollection } from '@/store/server'

interface MoreProps {
  id: string
  name: string
  userId: string
}

const itemClass = 'xl:py-[8px] py-[7px] xl:px-4 px-2 flex items-center gap-3 hover:bg-slate-100 cursor-pointer'

export default function More({ id, name, userId }: MoreProps) {
  const { dialog } = useDialog()
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)
  const [isShow, setIsShow] = React.useState(false)

  const { mutateAsync: deleteCollection, isLoading } = useDeleteCollection()

  const handleDelete = () => {
    dialog({
      title: 'Delete Documentation',
      description: `Are you sure you want to remove the ${name} api documentation project?`,
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      setIsShow(false)
      await deleteCollection(id as string)
      navigate('/')
    })
  }

  return (
    <div className="relative w-fit">
      <Button variant="outline" isHasIcon onClick={() => setIsShow(!isShow)} loading={isLoading}>
        <HiOutlineCog6Tooth />
        <span className="hidden xl:flex">Settings</span>
      </Button>
      <ul
        className={clsx(
          'absolute top-full mt-1 z-10 right-0 origin-top transition-all duration-150',
          'bg-white shadow-md text-font rounded-md border border-slate-300 overflow-hidden w-max',
          isShow ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[-10px]'
        )}
      >
        <li className={itemClass} onClick={() => navigate(`/source-code/${id}`)}>
          <HiOutlineCodeBracket className="xl:text-lg text-base" />
          <span className="w-max xl:text-sm text-xs">See source code</span>
        </li>
        {user?.id === userId && (
          <React.Fragment>
            <li className={itemClass} onClick={() => navigate(`/update/${id}`)}>
              <HiOutlinePencilSquare className="xl:text-lg text-base" />
              <span className="w-max xl:text-sm text-xs">Edit collection</span>
            </li>
            <li className={itemClass + ' text-red-500'} onClick={handleDelete}>
              <HiOutlineTrash className="xl:text-lg text-base" />
              <span className="w-max xl:text-sm text-xs">Delete collection</span>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  )
}

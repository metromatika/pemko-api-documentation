import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import * as React from 'react'

import { useGetMe, useLogout } from '@/store/server'
import { useDialog } from '@/store/client'
import { Icon, Loading } from '@/components'

export default function Auth() {
  const { dialog } = useDialog()

  const { mutate: logout, isLoading: isLoadingLogout } = useLogout()
  const { data: user, isLoading } = useGetMe()

  const handleLogout = () => {
    dialog({
      title: 'Logout Confirmation',
      description: 'Are you sure you want to logout?',
      variant: 'danger',
      submitText: 'Logout'
    }).then(() => logout())
  }

  if (isLoading || isLoadingLogout) {
    return <Loading className="text-primary w-full" />
  }

  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <span className="truncate max-w-[173px]">{user?.name}</span>
        <div className="text-xs -mt-1 font-normal text-title/50 flex items-center gap-1">
          <span>{user?.role.name}</span>
          <span>&bull;</span>
          <span className="truncate max-w-[96px]">{user?.office || user?.email}</span>
        </div>
      </div>
      <Icon className="w-9 h-9 ml-auto bg-red-500 hover:bg-red-600 cursor-pointer" onClick={handleLogout}>
        <HiArrowLeftOnRectangle className="text-base text-white" />
      </Icon>
    </React.Fragment>
  )
}

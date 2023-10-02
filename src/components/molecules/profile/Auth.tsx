import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { ImSpinner2 } from 'react-icons/im'
import * as React from 'react'

import { useGetMe, useLogout } from '@/store/server'
import { useDialog } from '@/store/client'
import { Icon } from '@/components'

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
    return <ImSpinner2 className="animate-spin text-primary m-auto" />
  }

  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <span>{user?.name}</span>
        <div className="text-xs -mt-1 font-normal text-title/50 flex items-center gap-2">
          <span>{user?.role.name}</span>
          <span>&bull;</span>
          <span>@{user?.username}</span>
        </div>
      </div>
      <Icon className="w-9 h-9 ml-auto bg-red-500 hover:bg-red-600 cursor-pointer" onClick={handleLogout}>
        <HiArrowLeftOnRectangle className="text-base text-white" />
      </Icon>
    </React.Fragment>
  )
}

import { useToken } from '@/store/client'
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedAuthProps {
  children?: React.ReactNode
}

export default function ProtectedAuth({ children }: ProtectedAuthProps) {
  const location = useLocation()
  const token = useToken((state) => state.token)

  if (token) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children || <Outlet />
}

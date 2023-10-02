import { useToken } from '@/store/client'
import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const token = useToken((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children || <Outlet />
}

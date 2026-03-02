import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import type { RootState } from '@/app/store'

export const ProtectedRoute = (): React.JSX.Element => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
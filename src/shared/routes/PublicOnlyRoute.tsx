import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import type { RootState } from '@/app/store'

export const PublicOnlyRoute = (): React.JSX.Element => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logout } from '@/features/auth/slice/authSlice'
import type { RootState } from '@/app/store'

export const Navbar = (): React.JSX.Element => {
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initials = user?.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? ''

  const handleLogout = (): void => {
    dispatch(logout())
    void navigate('/', { replace: true })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to={isAuthenticated ? '/home' : '/'}
          className="flex items-center gap-2 text-lg font-bold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-black text-white">
            A
          </span>
          <span className="gradient-text">AuthApp</span>
        </Link>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {initials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
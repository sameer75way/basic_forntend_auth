import { Link } from 'react-router-dom'
import { Navbar } from '@/shared/components/layout/Navbar'

export const LandingPage = (): React.JSX.Element => (
  <div className="flex min-h-full flex-col">
    <Navbar />
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome to AuthApp
        </h1>
        <p className="text-slate-400 mb-8">
          Login or sign up to continue to your dashboard.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  </div>
)
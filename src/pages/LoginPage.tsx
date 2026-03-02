import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { loginSchema } from '@/features/auth/model/validation'
import type { LoginInput } from '@/features/auth/model/validation'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { setCredentials } from '@/features/auth/slice/authSlice'
import { useAppDispatch } from '@/app/hooks'
import { FormInput } from '@/shared/components/form/FormInput'

export const LoginPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading, error }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginInput): Promise<void> => {
    const result = await login(data)
    if ('data' in result && result.data !== undefined) {
      dispatch(setCredentials({ user: result.data.user, accessToken: result.data.accessToken }))
      void navigate('/home', { replace: true })
    }
  }

  const apiError = error?.message ?? null

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome back</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          {apiError !== null && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email')}
              error={errors.email}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            No account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
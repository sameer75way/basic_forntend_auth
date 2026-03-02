import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { signupSchema } from '@/features/auth/model/validation'
import type { SignupInput } from '@/features/auth/model/validation'
import { useSignupMutation } from '@/features/auth/api/authApi'
import { setCredentials } from '@/features/auth/slice/authSlice'
import { useAppDispatch } from '@/app/hooks'
import { FormInput } from '@/shared/components/form/FormInput'

export const SignupPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [signup, { isLoading, error }] = useSignupMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) })

  const onSubmit = async (data: SignupInput): Promise<void> => {
    const result = await signup(data)
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
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="mt-1 text-sm text-slate-400">Get started for free</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          {apiError !== null && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              error={errors.name}
            />
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
              autoComplete="new-password"
              {...register('password')}
              error={errors.password}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
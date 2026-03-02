import { Navbar } from '@/shared/components/layout/Navbar'
import { Sidebar } from '@/shared/components/layout/Sidebar'
import { useAppSelector } from '@/app/hooks'
import type { RootState } from '@/app/store'

export const HomePage = (): React.JSX.Element => {
  const user = useAppSelector((state: RootState) => state.auth.user)

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-white mb-6">
            Dashboard
          </h1>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
              Account Details
            </h2>
            <div className="space-y-3">
              {([
                { key: 'Name',  val: user?.name },
                { key: 'Email', val: user?.email },
                { key: 'Role',  val: user?.role },
              ] as const).map(({ key, val }) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-slate-400">{key}</span>
                  <span className="text-sm font-medium text-white capitalize">{val ?? '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
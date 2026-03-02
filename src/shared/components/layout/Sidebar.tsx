import { NavLink } from 'react-router-dom'

const IconDashboard = (): React.JSX.Element => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

export const Sidebar = (): React.JSX.Element => (
  <aside className="flex w-56 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
    <div className="p-4 border-b border-slate-800">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Menu
      </p>
    </div>
    <nav className="flex flex-col gap-1 p-3">
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          [
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isActive
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent',
          ].join(' ')
        }
      >
        <IconDashboard />
        Dashboard
      </NavLink>
    </nav>
  </aside>
)
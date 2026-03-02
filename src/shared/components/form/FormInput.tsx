import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError | undefined
}

export const FormInput = ({
  label,
  error,
  id,
  ...inputProps
}: FormInputProps): React.JSX.Element => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-300"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...inputProps}
        className={[
          'w-full px-3.5 py-2.5 rounded-lg text-sm',
          'bg-slate-800 border text-white placeholder-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          'transition-all duration-200',
          error
            ? 'border-red-500/70 focus:ring-red-500'
            : 'border-slate-700 hover:border-slate-600',
        ].join(' ')}
      />
      {error?.message !== undefined && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span>
          {error.message}
        </p>
      )}
    </div>
  )
}
import { useFormContext } from 'react-hook-form'

interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  id: string
  label?: string
}

export default function Checkbox({ id, label, ...rest }: CheckboxProps) {
  const { register } = useFormContext()

  return (
    <div className="flex gap-2 items-center">
      <input
        {...register(id)}
        {...rest}
        type="checkbox"
        name={id}
        id={id}
        className="w-4 h-4 rounded-md border-2 border-slate-200 focus:border-primary accent-primary"
      />
      <label htmlFor={id} className="text-base font-semibold cursor-pointer text-font">
        {label}
      </label>
    </div>
  )
}

interface LabelProps {
  htmlFor: string
  children: React.ReactNode
}

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-title tracking-wide text-[13px] md:text-sm">
      {children}
    </label>
  )
}

interface RequestItemProps {
  label: string
  value: string
}

export default function RequestItem({ label, value }: RequestItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[13px]">{label}:</p>
      <p className="text-sm px-3 py-1.5 bg-white/10 text-white/80 rounded-md break-words">{value}</p>
    </div>
  )
}

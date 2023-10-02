import React from 'react'

interface RequestBoxProps {
  title: string
  children: React.ReactNode
}

export default function RequestBox({ title, children }: RequestBoxProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[17px] font-bold text-title">{title}</h4>
      <div className="flex flex-col gap-4 bg-dark text-white p-4 rounded-lg">{children}</div>
    </div>
  )
}

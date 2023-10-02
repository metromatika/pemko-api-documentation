import { HiArrowLeftCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Back() {
  return (
    <Link
      to="/"
      className="flex gap-2 items-center text-title bg-slate-100 hover:bg-slate-200 w-fit p-2 rounded-lg cursor-pointer"
    >
      <HiArrowLeftCircle className="text-lg" />
      <span className="font-semibold text-xs">Go to Home</span>
    </Link>
  )
}

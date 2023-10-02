import { HiPlusCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { useToken } from '@/store/client'

interface BrandProps {
  withPlus?: boolean
  width?: string
  containerClass?: string
}

export default function Brand({ withPlus, width, containerClass }: BrandProps) {
  const token = useToken((state) => state.token)

  return (
    <div className="flex justify-between items-center">
      <Link to="/" className={`${containerClass} flex items-center gap-3`}>
        <img src={Logo} alt="api doc logo" className={`${width} w-10 h-10 object-contain drop-shadow-lg`} />
        {withPlus && (
          <h1 className="font-semibold text-title flex flex-col">
            <span className="text-2xl">API</span>
            <span className="-mt-3">Documentation</span>
          </h1>
        )}
      </Link>
      {token && withPlus && (
        <Link to="/create">
          <HiPlusCircle className="text-4xl text-primary hover:text-emerald-700" />
        </Link>
      )}
    </div>
  )
}

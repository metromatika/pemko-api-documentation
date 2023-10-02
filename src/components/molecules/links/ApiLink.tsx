import { Link } from 'react-scroll'
import * as React from 'react'

import { MethodLabel } from '@/components'
import { useGetWindows } from '@/hooks'

interface ApiLink {
  name: string
  method: string
  href: string
}

export default function ApiLink({ name, method, href }: ApiLink) {
  const [isShow, setIsShow] = React.useState(false)
  const { isMobile } = useGetWindows()

  return (
    <Link className="ml-3 flex flex-col" to={href} smooth={true} duration={500} offset={isMobile ? -80 : 0} spy={true}>
      <button className="menu gap-3" onClick={() => setIsShow(!isShow)}>
        <MethodLabel method={method} />
        <span className="text-[13px] truncate max-w-[122px] text-title/80">{name}</span>
      </button>
    </Link>
  )
}

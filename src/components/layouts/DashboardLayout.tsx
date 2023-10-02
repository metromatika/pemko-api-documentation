import { Outlet } from 'react-router-dom'
import * as React from 'react'

import { LeftBar } from '@/components'

export default function DashboardLayout() {
  return (
    <React.Fragment>
      <section className="flex">
        <aside className="xl:flex-[1] font-semibold text-title">
          <LeftBar />
        </aside>
        <main className="xl:flex-[5] flex-1 max-w-full mt-[80px] xl:mt-0">
          <Outlet />
        </main>
      </section>
    </React.Fragment>
  )
}

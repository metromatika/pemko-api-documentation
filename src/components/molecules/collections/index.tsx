interface CollectionsProps {
  children: React.ReactNode
}

export default function Collections({ children }: CollectionsProps) {
  return (
    <section className="xl:w-9/12 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 w-full px-6 xl:px-0 pt-4 xl:pt-7">
      {children}
    </section>
  )
}

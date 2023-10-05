import { Button } from '@/components'
import { useTitle } from '@/hooks'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  useTitle('Not Found')

  return (
    <section className="flex flex-1 bg-white flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-title">404</h1>
      <h3 className="font-semibold text-font/50">Page could not be found</h3>
      <Button className="mt-8 px-4 shadow-button" variant="primary" onClick={() => navigate('/')}>
        Kembali ke Beranda
      </Button>
    </section>
  )
}

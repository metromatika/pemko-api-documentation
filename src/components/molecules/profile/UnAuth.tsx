import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

export default function UnAuth() {
  const navigate = useNavigate()

  return (
    <div className="flex gap-3 flex-1 justify-between">
      <Button variant="secondary" className="flex-1 text-sm" onClick={() => navigate('/register')}>
        Register
      </Button>
      <Button variant="primary" className="flex-1 text-sm" onClick={() => navigate('/login')}>
        Login
      </Button>
    </div>
  )
}

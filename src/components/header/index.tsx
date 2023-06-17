import Link from 'next/link'
import { useAuth } from '../../app/hooks/useAuth'

function Header() {
  const auth = useAuth()
  return (
    <header>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <nav>
        <Link href="/panel">Protected Route</Link>
        <br />
        <Link href="/login">Login</Link>
      </nav>
    </header>
  )
}

export default Header

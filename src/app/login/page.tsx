'use client'
import { useRouter, useSearchParams } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (event: HTMLFormElement) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password') //password should be hashed in real scenario

    const res = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const { success } = await res.json()

    if (success) {
      const nextUrl = searchParams.get('next')
      router.push('/')
    } else alert('Login failed')
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <label>
        Username
        <input type="text" name="username" className="ml-2 border-2" />
      </label>
      <label>
        Password
        <input type="password" name="password" className="ml-3 border-2" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

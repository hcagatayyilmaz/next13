import { NextRequest, NextResponse } from 'next/server'
import { verifyJwtToken } from './utils'

const AuthPages = ['/login', '/register', '/forgot-password']

const isAuthPages = (url: string) =>
  AuthPages.some((page) => page.startsWith(url))

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request
  const { value: token } = cookies.get('token') ?? { value: null }
  const hasVerifiedToken = token && (await verifyJwtToken(token))

  const isAuthPageRequested = isAuthPages(nextUrl.pathname)

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/', url))
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams)
    searchParams.set('next', nextUrl.pathname)

    return NextResponse.redirect(new URL('/login', url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/panel'],
}

import React from 'react'
import { verifyJwtToken } from '../../../utils'
import { cookies } from 'next/headers'
import Cookies from 'universal-cookie'

const fromServer = async () => {
  const cookieList = cookies()
  const { value: token } = cookieList.get('token') ?? { value: null }

  const verifiedToken = await verifyJwtToken(token)

  return token
}

export function useAuth() {
  const [auth, setAuth] = React.useState(null)

  const getVerifiedToken = async () => {
    const cookies = new Cookies()
    const token = cookies.get('token') ?? null
    const verifiedToken = await verifyJwtToken(token)
    setAuth(verifiedToken)
  }

  React.useEffect(() => {
    getVerifiedToken()
  }, [])
  return auth
}

useAuth.fromServer = fromServer

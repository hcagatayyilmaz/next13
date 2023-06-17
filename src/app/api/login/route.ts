import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { getJwtSecretKey } from '../../../utils'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(body)

  if (body.username === 'admin' && body.password === 'adminpass') {
    //generate a token
    const token = await new SignJWT({
      username: body.username,
      role: 'admin',
    })
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setExpirationTime('30s')
      .sign(getJwtSecretKey())

    //set cookie
    const response = NextResponse.json({
      success: true,
    })

    response.cookies.set({
      name: 'token',
      value: token,
      path: '/',
    })

    return response
  }
  return NextResponse.json({
    success: false,
  })
}

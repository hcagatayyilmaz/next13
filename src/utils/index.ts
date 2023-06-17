import { jwtVerify } from 'jose'

export const getJwtSecretKey = () => {
  const secretKey = process.env.JWT_SECRET
  if (!secretKey) {
    throw new Error('JWT secret key is not available!')
  }
  return new TextEncoder().encode(secretKey)
}

export async function verifyJwtToken(token: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey)
    console.log(payload)
    return token
  } catch (error) {
    return null
  }
}

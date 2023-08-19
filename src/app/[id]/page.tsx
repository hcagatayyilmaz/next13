import {FC} from 'react'

interface pageProps {
  params: {
    id: string
  }
}

export const revalidate = 600

export async function generateStaticParams() {
  const ids = ['1', '2', '3', '4']

  return ids.map((id) => {
    return {
      id
    }
  })
}

const page: FC<pageProps> = ({params}) => {
  console.log(params)
  return (
    <div>
      page
      <h1>test</h1>
    </div>
  )
}

export default page

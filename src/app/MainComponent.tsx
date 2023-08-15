import { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

interface MainComponentProps {}

const MainComponents: FC<MainComponentProps> = ({}) => {
  const { data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ['main'],
    queryFn: async () => {
      const { data } = await axios.get('myurl.com')
    },
  })

  return (
    <div>
      <h1>div</h1>
    </div>
  )
}

export default MainComponents

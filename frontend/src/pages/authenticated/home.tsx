import { useAuth } from '@/hooks/useAuthentication'
import UserTable from './components/userTable'

export default function HomePage() {
  const { currentUser } = useAuth()
  return (
    <div>
      <h1 className='px-2 text-lg'>
        Welcome <span className='font-semibold'>{currentUser?.name}</span>
      </h1>
      <div className='mt-4'>
        <UserTable />
      </div>
    </div>
  )
}

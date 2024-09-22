import { useAuth } from '@/hooks/useAuthentication'

export default function HomePage() {
  const { currentUser } = useAuth()
  return (
    <div>
      <h1 className='text-lg'>
        Welcome <span className='font-semibold'>{currentUser?.name}</span>
      </h1>
    </div>
  )
}

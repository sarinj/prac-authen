import { useAuth } from '@/hooks/useAuthentication'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

export default function Navbar() {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  const { mutate: mutateSignout, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/login')
    },
  })

  function handleSignOut() {
    mutateSignout()
  }

  return (
    <div className='border-b-1 sticky flex h-[56px] w-full items-center justify-end gap-6 border px-[30px] shadow-sm'>
      <p className='text-[14px]'>{currentUser?.email}</p>
      <Button
        size='sm'
        variant='destructive'
        isLoading={isPending}
        disabled={isPending}
        onClick={handleSignOut}
      >
        Logout
      </Button>
    </div>
  )
}

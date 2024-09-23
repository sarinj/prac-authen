import SigninForm from '@/components/form/SigninForm'
import SignupForm from '@/components/form/SignupForm'
import { useAuth } from '@/hooks/useAuthentication'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <main className='flex size-full h-screen items-center justify-center'>
      <div className='size-full rounded-none border border-gray-300 px-[68px] py-12 md:h-fit md:w-[420px] md:rounded-[4px]'>
        {isRegister ? (
          <SignupForm onSignIn={() => setIsRegister(false)} />
        ) : (
          <SigninForm onRegister={() => setIsRegister(true)} />
        )}
      </div>
    </main>
  )
}

import Navbar from '@/components/navigation/navbar'

import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='size-full overflow-hidden'>
      <Navbar />
      <div className='h-[calc(100vh-56px)] w-full overflow-y-auto px-[calc(15%-64px)] py-10'>
        <Outlet />
      </div>
    </div>
  )
}

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticationProvider } from './hooks/useAuthentication'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </QueryClientProvider>
  )
}

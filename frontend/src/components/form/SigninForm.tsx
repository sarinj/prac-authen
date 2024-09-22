import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

interface SigninFormProps {
  onRegister?: () => void
}

export default function SigninForm({ onRegister }: SigninFormProps) {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate('/home')
    },
  })

  const formSchema = z.object({
    username: z.string().email({ message: 'Please enter an email.' }),
    password: z
      .string()
      .min(4, {
        message: 'Please enter a password.',
      })
      .max(60, {
        message: 'Please enter a password.',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function handleLogin(data: z.infer<typeof formSchema>) {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form className='min-w-[230px]' onSubmit={form.handleSubmit(handleLogin)}>
        <h1 className='mb-7 text-[32px] font-bold'>Sign In</h1>
        {isError && (
          <div className='mb-4 rounded-[4px] border border-red-600 bg-red-400 p-3 text-sm'>
            <p>Invalid email or password.</p>
          </div>
        )}
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-8 w-full' isLoading={isPending}>
          Sign In
        </Button>

        <p className='mt-5 text-[12px]'>
          Don't have an account ?{' '}
          <span
            className='cursor-pointer font-semibold hover:underline'
            onClick={onRegister}
          >
            Sign up now
          </span>
          .
        </p>
      </form>
    </Form>
  )
}

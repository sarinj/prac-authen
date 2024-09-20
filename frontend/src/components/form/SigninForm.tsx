import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

interface SigninFormProps {
  onRegister?: () => void
}

export default function SigninForm({ onRegister }: SigninFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formSchema = z.object({
    username: z.string().email({ message: 'Please enter an email.' }),
    password: z
      .string()
      .min(4, {
        message: 'Your password must contain between 4 and 60 characters.',
      })
      .max(60, {
        message: 'Your password must contain between 4 and 60 characters.',
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
    setLoading(true)
    console.log(data)
  }

  return (
    <Form {...form}>
      <form className='min-w-[230px]' onSubmit={form.handleSubmit(handleLogin)}>
        <h1 className='mb-7 text-[32px] font-bold'>Sign In</h1>
        {error && (
          <div className='bg-orange mb-4 rounded-[4px] p-5 text-sm text-black'>
            {error}
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
        <Button type='submit' className='mt-8 w-full' isLoading={loading}>
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

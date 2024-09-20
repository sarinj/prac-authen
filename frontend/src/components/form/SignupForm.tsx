import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface SignupFormProps {
  onSignIn: () => void
}

export default function SignupForm({ onSignIn }: SignupFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const formSchema = z
    .object({
      name: z.string().min(1, { message: 'Name is required.' }),
      username: z.string().email({ message: 'Please enter an valid email.' }),
      password: z
        .string()
        .min(4, {
          message: 'Your password must contain between 4 and 60 characters.',
        })
        .max(60, {
          message: 'Your password must contain between 4 and 60 characters.',
        }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm password is required.' }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleRegister(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        className='min-w-[230px]'
        onSubmit={form.handleSubmit(handleRegister)}
      >
        <h1 className='mb-7 text-[32px] font-bold'>Sign Up</h1>
        {error && (
          <div className='bg-orange mb-4 rounded-[4px] p-5 text-sm text-black'>
            {error}
          </div>
        )}
        {success && (
          <div className='mb-4 rounded-[4px] bg-green-600 p-5 text-sm text-white'>
            {success}
          </div>
        )}
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Confirm Password'
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-8 w-full' isLoading={loading}>
          Sign Up
        </Button>
        <p className='text-gray mt-2 text-[12px]'>
          Already have an account ?{' '}
          <span
            className='cursor-pointer font-semibold hover:underline'
            onClick={onSignIn}
          >
            Sign in
          </span>
          .
        </p>
      </form>
    </Form>
  )
}

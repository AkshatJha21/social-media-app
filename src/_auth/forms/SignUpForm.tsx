import React from 'react'
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'
import { createUserAccount } from '@/lib/appwrite/api'
import { useToast } from "@/components/ui/use-toast"

const SignUpForm = () => {

  const isLoading = false;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const newUser = await createUserAccount(values);
    
    if(!newUser) {
      return toast({
        title: "Sign up failed. Please try again."
      });
    }

    // const session = await signInAccount()
    
  }

  return (
    <div>
      <Form {...form}>

        <div className='sm:w-420 flex-center flex-col'>

          <img src='/assets/images/logo.svg' alt="logo"/>
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
          <p className='text-light-3 small-medium md:base-regular mt-2'>To use Snapgram, sign up</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <Button className='shad-button_primary' type="submit">
              {isLoading ? (
                <div className='flex-center gap-2'>
                  <Loader /> Loading...
                </div>
              ) : "Sign Up"}
            </Button>

            <p className='text-small-regular text-light-2 text-center mt-2'>
              Already have an account? 
              <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1'>Login</Link>
            </p>
          </form>
        </div>
    </Form>
    </div>
  )
}

export default SignUpForm
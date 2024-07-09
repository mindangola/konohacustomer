'use client'

// import { ModeToggle } from '@/components/toggleTheme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuth } from '@/context/AuthContext'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Bars } from 'react-loader-spinner'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

type SignData = {
  email: string
  password: string
}

export default function SignIn() {
  const { handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  })

  const { signIn, isLoading } = useAuth()

  function handleSubmitForm(data: SignData) {
    signIn(data)
  }

  return (
    <main className="bg-[url('/background_login.png')]  relative z-10">
      <div className="absolute w-screen h-screen bg-black/70 -z-10" />

      <div className="max-w-sm mx-auto  h-screen flex flex-col justify-center items-center">
        <div className="w-full">
          {/* <div className="absolute top-8 right-8">
            <ModeToggle />
          </div> */}

          <div className=" dark:bg-zinc-900 filter  border bg-white p-8 rounded-md">
            <div className="mb-8 flex flex-col items-center">
              <h2 className="font-bold text-2xl text-center">
                Bem-vindo de volta
              </h2>
              <p className="text-muted-foreground">Entrar na sua conta</p>
            </div>
            <div className="">
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="space-y-4"
              >
                <div>
                  <Label>Email*</Label>
                  <Input {...register('email')} placeholder="Usuário" />
                </div>

                <div>
                  <Label>Senha*</Label>
                  <Input {...register('password')} placeholder="Senha" />
                </div>

                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Bars
                      height="20"
                      width="20"
                      color="rgb(234 234 234)"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

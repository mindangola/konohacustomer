import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'
import { toast } from 'sonner'

interface AuthContextProviderProps {
  children: ReactNode
}

type SignInData = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  username: string
  email: string
  phone_number: string
  status: string
  avatar_url: string | null
  url: string
  tenant_id: string
  created_at: Date
}

interface AuthContextData {
  signIn: ({ email, password }: SignInData) => void
  signOut: () => void
  isLoading: boolean
  user: User | null
}

const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { push, refresh } = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getUser() {
      const userResponse = await api.get('customer/me')

      const user = userResponse.data

      setUser(user)
    }

    getUser()
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      setIsLoading(true)
      const response = await api.post('customer/login', { email, password })

      const { token } = response.data

      console.log(token)

      setCookie(undefined, 'konahacustomer.token', token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      toast.success('Bem-vindo!')

      push('/', {})

      setIsLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error('Email ou senha errada')
      }

      toast.error(error.main)

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'konahacustomer.token')

    push('/signin')
    refresh()
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

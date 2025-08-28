import type { UserType } from '@/types/auth'
import type { ChildrenType } from '@/types/component'
import { createContext, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export type AuthContextType = {
  user: UserType | undefined
  isAuthenticated: boolean
  saveSession: (session: UserType) => void
  removeSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

const authSessionKey = 'authKey'

export function AuthProvider({ children }: ChildrenType) {
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies([authSessionKey]);

  const getSession = (): AuthContextType['user'] => {
    const fetchedCookie = cookies.authKey
    if (!fetchedCookie) return
    else return fetchedCookie;
  }

  const [user, setUser] = useState<UserType | undefined>(getSession())

  const saveSession = (user: UserType) => {
    setCookie(authSessionKey, JSON.stringify(user))
    setUser(user)
  }

  const removeSession = () => {
    removeCookie(authSessionKey);
    setUser(undefined)
    navigate('/auth/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: cookies.authKey,
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

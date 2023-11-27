import type { Metadata } from 'next'
import { LoginScreen } from 'app/features/user/login-screen'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Page() {
  return (
    <>
      <LoginScreen />
    </>
  )
}

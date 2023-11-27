import type { Metadata } from 'next'
import { RegisterScreen } from 'app/features/user/register-screen'

export const metadata: Metadata = {
  title: 'Register',
}

export default function Page() {
  return (
    <>
      <RegisterScreen />
    </>
  )
}

import type { Metadata } from 'next'
import { UserDetailScreen } from 'app/features/user/detail-screen'

export const metadata: Metadata = {
  title: 'User',
}

export default function Page() {
  return (
    <>
      <UserDetailScreen />
    </>
  )
}

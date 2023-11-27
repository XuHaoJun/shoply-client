import type { Metadata } from 'next'
import { HomeScreen } from 'app/features/home/screen'
import { HomeScreen2 } from 'app/features/home/screen2'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return <HomeScreen />
}

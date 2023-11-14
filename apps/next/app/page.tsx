import type { Metadata } from 'next'
import { HomeScreen } from 'app/features/home/screen'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return <HomeScreen />
}

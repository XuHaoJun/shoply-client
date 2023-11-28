import type { Metadata } from 'next'
import { TamaguiProvider } from './TamaguiProvider'
import { getLinguiInit2 } from 'translations/utils-server'

export const metadata: Metadata = {
  title: 'Tamagui Example App',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initializedI18n = await getLinguiInit2()
  const axiosConfig = {
    baseURL: process.env.BACKEND_API_URL,
  }
  return (
    <html>
      <body>
        <TamaguiProvider i18nProps={initializedI18n} axiosConfig={axiosConfig}>{children}</TamaguiProvider>
      </body>
    </html>
  )
}

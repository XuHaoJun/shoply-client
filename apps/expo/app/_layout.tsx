import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { messages } from '../translations/locales/zh-TW'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

i18n.loadAndActivate({ locale: 'zh-TW', messages })

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <I18nProvider i18n={i18n}>
            <Stack />
          </I18nProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

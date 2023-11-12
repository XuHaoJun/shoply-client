import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { messages } from '../translations/locales/zh-TW'

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
  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <I18nProvider i18n={i18n}>
          <Stack />
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  )
}

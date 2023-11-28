'use client'

import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'

import { config as configBase } from '@tamagui/config'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { useServerInsertedHTML } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { I18nProvider } from '@lingui/react'
import { setupI18n } from '@lingui/core'

import { Provider as JotaiProvider } from 'jotai'

import {
  createTamagui,
  CustomToast,
  isClient,
  TamaguiProvider as TamaguiProviderOG,
  ToastProvider,
} from '@my/ui'

import Tamagui from '../tamagui.config'
import { ToastViewport } from 'app/provider/ToastViewport'
import { axiosInstance } from '@my/api'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

const config = createTamagui({
  ...configBase,
  themeClassNameOnRoot: false,
})

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export const TamaguiProvider = ({
  children,
  i18nProps,
  axiosConfig,
}: {
  children: React.ReactNode
  i18nProps?: any
  axiosConfig?: any
}) => {
  const [theme, setTheme] = useRootTheme()

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
        <style
          dangerouslySetInnerHTML={{
            __html: Tamagui.getCSS({
              // if you are using "outputCSS" option, you should use this "exclude"
              // if not, then you can leave the option out
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />
      </>
    )
  })

  const { locale, messages } = i18nProps
  const i18n = useMemo(() => {
    const x = setupI18n()
    x.loadAndActivate({ locale, messages })
    return x
  }, [locale, messages])

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

  if (isClient && axiosConfig.baseURL && axiosInstance.defaults.baseURL !== axiosConfig.baseURL) {
    axiosInstance.defaults.baseURL = axiosConfig.baseURL
  }

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <TamaguiProviderOG config={config} disableRootThemeClass defaultTheme={theme}>
        <JotaiProvider>
          <I18nProvider i18n={i18n}>
            <ToastProvider
              swipeDirection="horizontal"
              duration={6000}
              native={
                [
                  /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
                  // 'mobile'
                ]
              }
            >
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
              <CustomToast />
              <ToastViewport />
            </ToastProvider>
          </I18nProvider>
        </JotaiProvider>
      </TamaguiProviderOG>
    </NextThemeProvider>
  )
}

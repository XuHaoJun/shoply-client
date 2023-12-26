'use client'

import { XStack, YStack, Text, Input, Button, Separator, Anchor } from '@my/ui'
import { Platform } from 'react-native'
import { Chrome, Facebook } from '@tamagui/lucide-icons'
import React from 'react'
import { useLink } from 'solito/navigation'

export function LoginScreen() {
  const link = useLink({
    href: '/register',
  })
  return (
    <YStack flex={1}>
      {Platform.OS === 'web' && (
        <XStack flex={1} jc="center" height={84} maxHeight={84}>
          <XStack maxWidth={1180} flex={1} ai="center">
            <Text fontSize={33} height={42} color="#ee4d2d" marginRight="$5">
              🛒蝦粒購物
            </Text>
            <Text fontSize="$8">登入</Text>
            <XStack f={1} />
            <Text fontSize="$3">需要幫助?</Text>
          </XStack>
        </XStack>
      )}
      <XStack flex={1} jc="center" height={600} backgroundColor="#ee4d2d">
        <YStack flex={1} jc="center" maxWidth={1180}>
          <XStack jc="flex-end" $sm={{ jc: 'center' }}>
            <YStack
              jc="center"
              width={400}
              $sm={{ width: '100%' }}
              height={400}
              backgroundColor="white"
              borderRadius="$4"
              elevation="$8"
              paddingHorizontal={25}
              paddingVertical={20}
              space="$3"
            >
              <Text fontSize="$7">登入</Text>
              <Input size="$4" placeholder="手機號碼或信箱" />
              <Input size="$4" placeholder="密碼" />
              <Button>登入</Button>
              <Separator alignSelf="stretch" marginVertical={20} />
              <XStack space>
                <Button flex={1} icon={Facebook}>
                  Facebook
                </Button>
                <Button flex={1} icon={Chrome}>
                  Google
                </Button>
              </XStack>
              <XStack jc="center">
                <Text color="gray">蝦粒新朋友?</Text>
                <Anchor color="#ee4d2d" marginLeft="$2" {...link}>
                  註冊
                </Anchor>
              </XStack>
            </YStack>
          </XStack>
        </YStack>
      </XStack>

      <XStack backgroundColor="#F5F5F5" jc="center">
        <XStack maxWidth={1180} flex={1}>
          <Text>關於蝦粒</Text>
        </XStack>
      </XStack>
    </YStack>
  )
}

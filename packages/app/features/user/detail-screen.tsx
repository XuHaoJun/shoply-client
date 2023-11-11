import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { MyCarousel } from '../home/MyCarousel'
// import { MyCarousel2 } from '../home/MyCarousel2'
import { Platform } from 'react-native'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="700">{`User ID: ${id}`}</Paragraph>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
      <MyCarousel />
      {/* {Platform.OS === 'web' ? <MyCarousel /> : <MyCarousel2 />} */}
    </YStack>
  )
}

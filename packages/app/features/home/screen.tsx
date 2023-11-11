import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useLink } from 'solito/link'

// import { GreeterClient } from '@my/proto'
// import { HelloRequest, HelloReply } from '@my/proto'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
    replace: true,
    experimental: {
      nativeBehavior: 'stack-replace',
      isNestedNavigator: false
    },
  })

  const [hello, setHello] = useState<any>()

  useEffect(() => {
    // const client = new GreeterClient('http://192.168.230.17:5000')
    // const request = new HelloRequest()
    // request.setName('World 222')
    // client.sayHello(request, {}, (err, response) => {
    //   console.log(err, response)
    //   const msg = response?.getMessage()
    //   console.log(response?.getMessage())
    //   setHello(msg)
    // })
    // setInterval(() => {
    //   client.sayHello(request, {}, (err, response) => {
    //     console.log(err, response)
    //     const msg = response?.getMessage()
    //     console.log(response?.getMessage())
    //     setHello(msg)
    //   })
    // }, 3000)
  }, [])

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui aaabc aaa.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>
        <Paragraph ta="center">hello: {hello}</Paragraph>
        <Separator />
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>
      <XStack>
        <Button {...linkProps}>Link to user abc</Button>
      </XStack>
      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              try {
                toast.show('Sheet closed!', {
                  message: 'Just showing how toast works...',
                  burntOptions: { preset: 'done' },
                })
              } catch (e: any) {
                console.log(e)
              }
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

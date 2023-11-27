'use client'

import { Paragraph, XStack, YStack, isClient, styled } from '@my/ui'

const variants = {
  hide: {
    true: {
      pointerEvents: 'none',
      opacity: 0,
    },
  },
} as const

export const ContainerLarge = styled(YStack, {
  mx: 'auto',
  px: '$4',
  width: '100%',

  $gtSm: {
    maxWidth: 980,
  },

  $gtMd: {
    maxWidth: 1140,
  },

  variants,
})

import { createTsForm } from '@ts-react/form'
import { z } from 'zod'

// create the mapping
// const mapping = [
//   [z.string(), TextField],
//   [z.boolean(), CheckBoxField],
//   [z.number(), NumberField],
// ] as const; // 👈 `as const` is necessary

// A typesafe React component
// const MyForm = createTsForm(mapping);

export function HomeScreen2() {
  return (
    <YStack f={1}>
      <XStack
        // @ts-ignore
        pos="fixed"
        top={0}
        left={0}
        right={0}
        ai="center"
        jc="center"
        zi={50000}
        $gtSm={{
          px: '$4',
        }}
        backgroundColor="#ee4d2d"
        height="$2"
      >
        <Paragraph color="#ffffff">test</Paragraph>
      </XStack>
      <Paragraph>test</Paragraph>
    </YStack>
  )
}

// export const HeaderContents = React.memo((props) => {
//   return (
//     <XStack
//       ai="center"
//       position="relative"
//       tag="header"
//       jc="space-between"
//       pos="relative"
//       py={0}
//       zi={50000}
//     >
//       <Paragraph>1234</Paragraph>
//     </XStack>
//   )
// })

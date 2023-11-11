import { Paragraph, YStack } from '@my/ui'
import * as React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import { useWindowDimensions } from '@tamagui/use-window-dimensions'
import { View, Text } from 'react-native'

export function MyCarousel() {
  const { width } = useWindowDimensions()
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={100}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>{index} asfd</Text>
          </View>
        )}
      />
    </View>
  )
}

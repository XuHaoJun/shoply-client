/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')
const million = require('million/compiler')
const linguiConfig = require('./lingui.config')

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

console.log(`

Welcome to Tamagui!

You can update this monorepo to the latest Tamagui release just by running:

yarn upgrade:tamagui

We've set up a few things for you.

See the "excludeReactNativeWebExports" setting in next.config.js, which omits these
from the bundle: Switch, ProgressBar Picker, CheckBox, Touchable. To save more,
you can add ones you don't need like: AnimatedFlatList, FlatList, SectionList,
VirtualizedList, VirtualizedSectionList.

🐣

Remove this log in next.config.js.

`)

const plugins = [
  withTamagui({
    appDir: true,
    config: './tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    reactStrictMode: false,
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
      'expo-linear-gradient',
      'react-native-reanimated',
      'react-native-gesture-handler',
      'react-native-swiper-flatlist',
    ],
    experimental: {
      scrollRestoration: true,
      swcPlugins: [
        ['@lingui/swc-plugin', {}],
        ['@swc-jotai/react-refresh', {}],
        ['@swc-jotai/debug-label', {}],
      ],
    },
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  const millionConfig = {
    auto: true,
    mute: true,
  }

  config = million.next(config, millionConfig)

  return config
}

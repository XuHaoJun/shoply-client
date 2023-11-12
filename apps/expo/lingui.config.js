// https://bravo-kernel.com/blog/2023/05/how-to-build-a-fully-internationalized-nextjs-application-using-lingui-v4

const { formatter } = require('@lingui/format-po')

const locales = ['zh-TW', 'en-us']

if (process.env.NODE_ENV !== 'production') {
  locales.push('pseudo')
}

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: locales,
  sourceLocale: 'zh-TW',
  pseudoLocale: 'pseudo',
  catalogs: [
    {
      path: 'translations/locales/{locale}',
      include: ['app', '../../packages/app', '../../packages/ui'],
    },
  ],
  format: formatter({ origins: false }),
}

import { cookies, headers } from 'next/headers'
import acceptLanguage from 'accept-language'

export async function loadCatalog(locale: string) {
  const { messages } = await import(`@lingui/loader!./locales/${locale}.po`)

  return messages
}

const languages = ['zh-TW', 'en-us']
const cookieName = 'i18next'
acceptLanguage.languages(languages)

// TODO
// fallback to default if locale not support
export function detectLanguage() {
  const ckies = cookies()
  const hders = headers()
  let lng
  // const nextUrlHeader = hders.has('next-url') && hders.get('next-url')
  // if (nextUrlHeader && nextUrlHeader.indexOf(`"lng":"`) > -1) {
  //   const qsObj = JSON.parse(
  //     nextUrlHeader.substring(nextUrlHeader.indexOf('{'), nextUrlHeader.indexOf(`}`) + 1)
  //   )
  //   lng = qsObj.lng
  // }

  if (!lng && ckies.has(cookieName)) lng = ckies.get(cookieName)?.value
  if (!lng) lng = acceptLanguage.get(hders.get('Accept-Language'))
  if (!lng) lng = languages[0]
  return lng
}

export async function getLinguiInit2() {
  const locale = detectLanguage()
  const messages = await loadCatalog(locale)
  return { locale, messages }
}

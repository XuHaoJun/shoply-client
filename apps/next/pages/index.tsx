import { HomeScreen } from 'app/features/home/screen'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { loadCatalog } from 'translations/utils'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      i18n: await loadCatalog(ctx.locale as string),
    },
  }
}

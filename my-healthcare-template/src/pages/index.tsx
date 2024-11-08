import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zdravotnické zařízení</title>
        <meta name="description" content="Webové stránky zdravotnického zařízení" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">
          Vítejte na stránkách našeho zdravotnického zařízení
        </h1>
      </main>
    </div>
  )
}

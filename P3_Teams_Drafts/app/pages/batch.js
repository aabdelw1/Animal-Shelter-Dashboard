import React from 'react'
import Head from 'next/head'
import Batch from '../components/Batch'

const batch = props => (
  <div>
    <Head>
      <title>Batch - Interview Tool</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Batch />
  </div>
)

export default batch

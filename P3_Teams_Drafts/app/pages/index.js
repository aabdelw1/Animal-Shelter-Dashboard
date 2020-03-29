import React from 'react'
import Head from 'next/head'
import Home from '../components/Home'

const home = () => (
  <div>
    <Head>
      <title>Ingie's Animal Shelter</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Home />
  </div>
)

export default home

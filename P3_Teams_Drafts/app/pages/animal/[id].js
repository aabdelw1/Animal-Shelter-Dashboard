import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AnimalDetails from '../../components/AnimalDetails'

const animal = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Animal Details</title>
      </Head>
      <AnimalDetails id={router.query.id}/>
    </>
  )
}

export default animal

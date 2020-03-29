import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CandidateDetail from '../../components/CandidateDetail'

const candidate = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Candidate Detail</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CandidateDetail id={router.query.id} />
    </>
  )
}

export default candidate

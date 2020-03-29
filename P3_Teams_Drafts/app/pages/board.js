import React, { useState } from 'react'
import Head from 'next/head'
import { Heading } from 'evergreen-ui'
import Board from '../components/Board'
import BoardFilters from '../components/BoardFilters'

const board = () => {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [sort, setSort] = useState('')
  const [batch, setBatch] = useState('')

  return (
    <>
      <Head>
        <title>Board - Interview Tool</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading size={900}>Board</Heading>
      {/* USE CONTEXT FOR THIS */}
      <BoardFilters search={search} setSearch={setSearch} role={role} setRole={setRole} location={location} setLocation={setLocation} sort={sort} setSort={setSort} batch={batch} setBatch={setBatch} />
      <Board search={search} role={role} location={location} sort={sort} />
    </>
  )
}

export default board

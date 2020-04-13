import React, { useState } from 'react'
import Head from 'next/head'
import { Heading } from 'evergreen-ui'
import Reports from '../components/Reports'

const reports = () => {
  const [scheduleButton, setScheduleButton] = useState(true)

  return (
      <div>
        <Head>
          <title>Reports</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Heading size={900}>Reports</Heading>
        <Reports scheduleButton={scheduleButton}/>
      </div>
  )
}

export default reports

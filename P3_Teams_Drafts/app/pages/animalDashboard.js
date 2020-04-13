import React, { useState } from 'react'
import Head from 'next/head'
import { Heading } from 'evergreen-ui'
import AnimalDashboard from '../components/AnimalDashboard'
import AnimalDashboardFilters from '../components/AnimalDashboardFilters'

const animalDashboard = () => {
  const [scheduleButton, setScheduleButton] = useState(true)

  return (
    <div>
      <Head>
        <title>Animal Dashboard - Ingies Animal Shelter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading size={900}>Animal Dashboard</Heading>
      <AnimalDashboardFilters scheduleButton={scheduleButton}/>
      <AnimalDashboard setScheduleButton={setScheduleButton}/>
    </div>
  )
}

export default animalDashboard

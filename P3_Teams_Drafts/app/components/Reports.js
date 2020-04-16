import React, { useState, useContext, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toaster, Spinner, Pane, BackButton, Button, Table, Tablist, Paragraph, Tab, TextInputField } from 'evergreen-ui'
import { Context } from './Context'
import Router, { useRouter } from 'next/router'
import axios from 'axios'

import Component from '@reactions/component'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  flex: 1;
  min-height: 70vh;
`

const Reports = (props) => {
  const { setScheduleButton } = props
  const [loading, setLoading] = useState(true)
  const [animalsContol, setAnimalsContol] = useState([])
  const [volunteerMonth, setVolunteerMonth] = useState([])
  const [monthlyAdopt, setMonthlyAdopt] = useState([])
  const [volunteerLookup, setVolunteerLookup] = useState([])
  const [vaccineReminderReport, setVaccineReminderReport] = useState([])
  const [surrenders, setSurrenders] = useState([])
  const [rescuesOver60, setRescuesOver60] = useState([])

  const [showAnimalsContol, setShowAnimalsContol] = useState(true)
  const [showVolunteerMonth, setShowVolunteerMonth] = useState(false)
  const [showMonthlyAdopt, setShowMonthlyAdopt] = useState(false)
  const [showVolunteerLookup, setShowVolunteerLookup] = useState(false)
  const [showVaccineReminderReport, setShowVaccineReminderReport] = useState(false)
  const [volLastName, setVolLastName] = useState('')
  const [volFirstName, setVolFirstName] = useState('')
  const [yearMonth, setYearMonth] = useState('')


  const whenClickedArray = ['animalControl', 'MonthlyAdopt', 'default', 'VolunteerMonth', 'VolunteerLookup']

  async function fetchControlinfo () {
    const promises = animalsContol.map( async info => {
      const fetchAnimalControlInfo = await axios({
        method: 'GET',
        url: `http://localhost:4000/viewAnimalControlSurrenders/${info.yearMonth}`})   
        return fetchAnimalControlInfo.data

    })
    const surrenderResults = await Promise.all(promises)
    setSurrenders(surrenderResults)
  }
  
  async function fetch60info () {
    const promises = animalsContol.map( async info => {
      const fetchAnimalControlInfo = await axios({
        method: 'GET',
        url: `http://localhost:4000/viewAnimalAdoptedOver60Days/${info.yearMonth}`})   
        return fetchAnimalControlInfo.data
    })
    const rescureOver60Results = await Promise.all(promises)
    setRescuesOver60(rescureOver60Results)
  }


  useEffect(() => {
    fetchControlinfo()
    fetch60info()
  }, [animalsContol])

  const fetchAnimalControl = async () => {
    const response = await fetch('http://localhost:4000/viewAnimalControlReportLists', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setAnimalsContol(result)
  }


  const fetchVolunteerMonth = async () => {
    const response = await fetch(`http://localhost:4000/volunteeroftheMonth/${yearMonth}`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setVolunteerMonth(result)
  }

  const fetchMonthlyAdopt = async () => {
    const response = await fetch('http://localhost:4000/adoption/report', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setMonthlyAdopt(result)
  }

  const fetchVolunteerLookup = async () => {
    const response = await fetch(`http://localhost:4000/users/volunteers?lastName=${volLastName}&firstName=${volFirstName}`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setVolunteerLookup(result)
  }

  const fetchVaccineReminderReport = async () => {
    const response = await fetch('http://localhost:4000/vaccineReminderReport', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setVaccineReminderReport(result)
  }

  useEffect(() => {
    fetchAnimalControl()
    fetchVaccineReminderReport()
    fetchMonthlyAdopt()
  }, [])


  const stringDate = function (date) {
    const year = date.substring(0,4)
    const month = date.substring(4,6)
    const stringDate = monthNames[Number(month)-1]

    return `${stringDate}, ${year}`
  }
  
  function renderRowAnimalControl (data) {
      return data.map((student, index) => {
        const { yearMonth } = student 
        return (
          <Table.Row>
            <Table.TextCell>{stringDate(yearMonth.toString())}</Table.TextCell>
            <Table.TextCell marginLeft="12rem">{surrenders.length > 0 && surrenders[index].length}</Table.TextCell>
            <Table.TextCell marginLeft="7rem">{rescuesOver60.length > 0 && rescuesOver60[index].length}</Table.TextCell>
          </Table.Row>
        )
      })
  }

  function renderHeaderAnimalControl () {
    return (
      <Table.Head>
        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Surrender By Animal Control Count</Table.TextHeaderCell>
        <Table.TextHeaderCell>Rescue Over 60 Count</Table.TextHeaderCell>
      </Table.Head>
    )
  }

  function renderHeaderVaccine () {
    return (
      <Table.Head>
        <Table.TextHeaderCell>PetID</Table.TextHeaderCell>
        <Table.TextHeaderCell>Species</Table.TextHeaderCell>
        <Table.TextHeaderCell>Vaccine type</Table.TextHeaderCell>
        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Vaccine submitter</Table.TextHeaderCell>
        <Table.TextHeaderCell>Breed</Table.TextHeaderCell>
        <Table.TextHeaderCell>Alteration Status</Table.TextHeaderCell>
        <Table.TextHeaderCell>Surrender Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Microchip ID</Table.TextHeaderCell>
        <Table.TextHeaderCell>Sex</Table.TextHeaderCell>
      </Table.Head>
    )
  }

  function renderRowVaccine (data) {
    return data.map((student, index) => {
      const { petID, speciesName, vaccineType, dateAdministired, vaccineSubmitter, breedName, alterationStatus, surrenderDate, microchipID, sex } = student 
      return (
        <Table.Row key={index}>
          <Table.TextCell>{petID}</Table.TextCell>
          <Table.TextCell>{speciesName}</Table.TextCell>
          <Table.TextCell>{vaccineType}</Table.TextCell>
          <Table.TextCell>{dateAdministired}</Table.TextCell>
          <Table.TextCell>{vaccineSubmitter}</Table.TextCell>
          <Table.TextCell>{breedName}</Table.TextCell>
          <Table.TextCell>{alterationStatus}</Table.TextCell>
          <Table.TextCell>{surrenderDate}</Table.TextCell>
          <Table.TextCell>{microchipID}</Table.TextCell>
          <Table.TextCell>{sex}</Table.TextCell>
        </Table.Row>
      )
    })
  }

  function renderHeaderAdoption () {
    return (
      <Table.Head>
        <Table.TextHeaderCell>yrMonth</Table.TextHeaderCell>
        <Table.TextHeaderCell>Species</Table.TextHeaderCell>
        <Table.TextHeaderCell>Breed</Table.TextHeaderCell>
        <Table.TextHeaderCell>Adoption Count</Table.TextHeaderCell>
        <Table.TextHeaderCell>Surrender Count</Table.TextHeaderCell>
      </Table.Head>
    )
  }

  function renderRowAdoption (data) {
    return data.map((student, index) => {
      const { yrMonth, species, breedName, adoptionCount, surrenderCount } = student 
      return (
        <Table.Row key={index}>
          <Table.TextCell>{yrMonth}</Table.TextCell>
          <Table.TextCell>{species}</Table.TextCell>
          <Table.TextCell>{breedName}</Table.TextCell>
          <Table.TextCell>{adoptionCount}</Table.TextCell>
          <Table.TextCell>{surrenderCount}</Table.TextCell>
        </Table.Row>
      )
    })
  }

  function renderHeaderVolunteerLookup () {
    return (
      <Table.Row>
        <Table.TextCell>First Name </Table.TextCell>
        <Table.TextCell>Last Name</Table.TextCell>
        <Table.TextCell>Email</Table.TextCell>
        <Table.TextCell>Phone number</Table.TextCell>
      </Table.Row>
    )
  }

  function renderRowVolunteerLookup (data) {
    return data.map((volunteer, index) => {
      const { firstName, lastName, emailAddress, phoneNumber } = volunteer 
      return (
        <Table.Row>
          <Table.TextCell>{firstName}</Table.TextCell>
          <Table.TextCell>{lastName}</Table.TextCell>
          <Table.TextCell>{emailAddress}</Table.TextCell>
          <Table.TextCell>{phoneNumber}</Table.TextCell>
        </Table.Row>
      )
    })
  }

  function renderHeaderVolunteerMonth () {
    return (
      <Table.Row>
        <Table.TextCell>First Name </Table.TextCell>
        <Table.TextCell>Last Name</Table.TextCell>
        <Table.TextCell>Email</Table.TextCell>
        <Table.TextCell>Hours</Table.TextCell>
      </Table.Row>
    )
  }

  function renderRowVolunteerMonth (data) {
    return data.map((volunteer, index) => {
      const { firstName, lastName, emailAddress, hours } = volunteer 
      return (
        <Table.Row>
          <Table.TextCell>{firstName}</Table.TextCell>
          <Table.TextCell>{lastName}</Table.TextCell>
          <Table.TextCell>{emailAddress}</Table.TextCell>
          <Table.TextCell>{hours}</Table.TextCell>
        </Table.Row>
      )
    })
  }

  function whenClicked (state) {
    if (state == 'animalControl') {
      setShowAnimalsContol(true)
      setShowVolunteerMonth(false)
      setShowMonthlyAdopt(false)
      setShowVolunteerLookup(false)
      setShowVaccineReminderReport(false)
    } else if (state == 'VolunteerMonth') {
      setShowAnimalsContol(false)
      setShowVolunteerMonth(true)
      setShowMonthlyAdopt(false)
      setShowVolunteerLookup(false)
      setShowVaccineReminderReport(false)
    } else if (state == 'MonthlyAdopt') {
      setShowAnimalsContol(false)
      setShowVolunteerMonth(false)
      setShowMonthlyAdopt(true)
      setShowVolunteerLookup(false)
      setShowVaccineReminderReport(false)
    } else if (state == 'VolunteerLookup') {
      setShowAnimalsContol(false)
      setShowVolunteerMonth(false)
      setShowMonthlyAdopt(false)
      setShowVolunteerLookup(true)
      setShowVaccineReminderReport(false)
    } else {
      setShowAnimalsContol(false)
      setShowVolunteerMonth(false)
      setShowMonthlyAdopt(false)
      setShowVolunteerLookup(false)
      setShowVaccineReminderReport(true)
    }
  }

  return (
    <Pane display="flex" flexDirection="column" marginY='2rem'>
      <Component
        initialState={{
          selectedIndex: 0,
          tabs: ['Animal Control Report', 'Monthly Adoption', 'Vaccine Reminder Report', 'Volunteer of the Month', 'Volunteer lookup']
        }}
      >
        {({ state, setState }) => (
          <Pane height={120}>
            <Pane>
              <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                {state.tabs.map((tab, index) => (
                  <Tab
                    key={tab}
                    id={tab}
                    onSelect={() => {
                      setState({ selectedIndex: index })
                      whenClicked(whenClickedArray[index])
                    }
                    }
                    isSelected={index === state.selectedIndex}
                    aria-controls={`panel-${tab}`}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tablist>
              { loading &&
                  <Pane>
                    <Spinner margin="auto" marginTop="2rem"/>
                  </Pane>
              }
            </Pane>
            <Pane padding={16} background="tint1" flex="1">
              {state.tabs.map((tab, index) => (
                <Pane
                  key={tab}
                  id={`panel-${tab}`}
                  role="tabpanel"
                  aria-labelledby={tab}
                  aria-hidden={index !== state.selectedIndex}
                  display={index === state.selectedIndex ? 'block' : 'none'}
                >
                  <Pane>
                    {
                      showVolunteerLookup &&
                        <Pane display="flex" flexDirection="row">
                          <TextInputField
                            autoFocus
                            label=""
                            marginRight="2rem"
                            value={volLastName}
                            placeholder="Last Name"
                            onChange={e => setVolLastName(e.target.value)}
                          />
                          <TextInputField
                            autoFocus
                            label=""
                            marginRight="2rem"
                            value={volFirstName}
                            placeholder="First Name"
                            onChange={e => setVolFirstName(e.target.value)}
                          />
                          <Button marginRight="2rem" marginY={'0.4rem'} onClick={() => {
                            fetchVolunteerLookup()
                          }} iconBefore="search">Search</Button>

                        </Pane>
                    }
                    {
                      showVolunteerMonth &&
                        <Pane display="flex" flexDirection="row">
                          <TextInputField
                            autoFocus
                            label=""
                            marginRight="2rem"
                            value={yearMonth}
                            placeholder="yearMonth = 202002"
                            onChange={e => setYearMonth(e.target.value)}
                          />
                          <Button marginRight="2rem" marginY={'0.4rem'} onClick={() => {
                            fetchVolunteerMonth()
                          }} iconBefore="search">Search</Button>

                        </Pane>
                    }
                    <Table>
                      <Table.Body>
                        {showVaccineReminderReport && renderHeaderVaccine()}
                        {showVaccineReminderReport && renderRowVaccine(vaccineReminderReport)}
                        {showMonthlyAdopt && renderHeaderAdoption()}
                        {showMonthlyAdopt && renderRowAdoption(monthlyAdopt)}
                        {showAnimalsContol && renderHeaderAnimalControl()}
                        {showAnimalsContol && renderRowAnimalControl(animalsContol)}
                        {showVolunteerLookup && renderHeaderVolunteerLookup()}
                        {showVolunteerLookup && renderRowVolunteerLookup(volunteerLookup)}
                        {showVolunteerMonth && renderHeaderVolunteerMonth()}
                        {showVolunteerMonth && renderRowVolunteerMonth(volunteerMonth)}
                      </Table.Body>
                    </Table>
                  </Pane>
                </Pane>
              ))}
            </Pane>
          </Pane>
        )}
      </Component>
    </Pane>
  )
}

Reports.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default Reports

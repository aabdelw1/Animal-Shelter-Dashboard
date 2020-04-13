import React, { useState, useContext, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toaster, Spinner, Pane,BackButton, Button, Table } from 'evergreen-ui'
import { Query } from 'react-apollo'
import { Context } from './Context'
import { useRouter } from 'next/router'
import Router from 'next/router'
import AnimalDashboardColumn from './AnimalDashboardColumn'
import AnimalCard from './AnimalCard'
import AdoptionCard from './AdoptionCard'

import Queries from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
const Categories = ['Animals ']

const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  flex: 1;
  min-height: 70vh;
  /* max-height: 70vh; */
`

const Reports = (props) => {
  const { setScheduleButton } = props
  const [loading, setLoading] = useState(true)
  const [animalsContol, setAnimalsContol] = useState([])
  const [volunteerMonth, setVolunteerMonth] = useState([])
  const [monthlyAdopt, setMonthlyAdopt] = useState([])
  const [volunteerLookup, setVolunteerLookup] = useState([])
  const [vaccineReminderReport, setVaccineReminderReport] = useState([])

  const [showAnimalsContol, setShowAnimalsContol] = useState(false)
  const [showVolunteerMonth, setShowVolunteerMonth] = useState(false)
  const [showMonthlyAdopt, setShowMonthlyAdopt] = useState(false)
  const [showVolunteerLookup, setShowVolunteerLookup] = useState(false)
  const [showVaccineReminderReport, setShowVaccineReminderReport] = useState(false)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  const fetchAnimalControl = async () => {
    const response = await fetch(`http://localhost:4000/viewAnimalControlReportLists`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setAnimalsContol(result)
  }

  const fetchVolunteerMonth = async () => {
    const response = await fetch(`http://localhost:4000/volunteeroftheMonth/${yearAndMonth}`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setVolunteerMonth(result)
  }

  const fetchMonthlyAdopt = async () => {
    const response = await fetch(`http://localhost:4000/adoption/report`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setMonthlyAdopt(result)
  }

  const fetchVolunteerLookup = async () => {
    const response = await fetch(`http://localhost:4000/users/volunteers?lastName=${volLastName}&firstName=${volFirstName}`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setVolunteerLookup(result)
  }

  const fetchVaccineReminderReport = async () => {
    const response = await fetch(`http://localhost:4000/vaccineReminderReport`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setVaccineReminderReport(result)
  }

  useEffect(() => {
    fetchVaccineReminderReport()
    fetchMonthlyAdopt()
  }, [])

  function renderRowAnimalControl(data){
    return data.map((student, index) => {
        const { id, name, age, email } = student //destructuring
        return (
           <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{email}</td>
           </tr>
        )
     })
  }
  function renderVaccine(data){
    renderRowVaccine(data)
  }
  function renderHeaderVaccine(){
      return(
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

  function renderRowVaccine(data){
    return data.map((student, index) => {
        const { petID, speciesName, vaccineType, dateAdministired, vaccineSubmitter, breedName, alterationStatus, surrenderDate, microchipID, sex  } = student //destructuring
        return (
           <Table.Row key={petID}>
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

  function renderHeaderAdoption(){
    return(
      <Table.Head>
          <Table.TextHeaderCell>yrMonth</Table.TextHeaderCell>
          <Table.TextHeaderCell>Species</Table.TextHeaderCell>
          <Table.TextHeaderCell>Breed</Table.TextHeaderCell>
          <Table.TextHeaderCell>Adoption Count</Table.TextHeaderCell>
          <Table.TextHeaderCell>Surrender Count</Table.TextHeaderCell>
      </Table.Head>
    )
}

function renderRowAdoption(data){
  return data.map((student, index) => {
      const { yrMonth, species, breedName, adoptionCount, surrenderCount } = student //destructuring
      return (
         <Table.Row key={yrMonth}>
            <Table.TextCell>{yrMonth}</Table.TextCell>
            <Table.TextCell>{species}</Table.TextCell>
            <Table.TextCell>{breedName}</Table.TextCell>
            <Table.TextCell>{adoptionCount}</Table.TextCell>
            <Table.TextCell>{surrenderCount}</Table.TextCell>
         </Table.Row>
      )
   })
}

function whenClicked(boolean){
    if(boolean == 'animalControl'){
        setShowAnimalsContol(true)
        setShowVolunteerMonth(false)
        setShowMonthlyAdopt(false)
        setShowVolunteerLookup(false)
        setShowVaccineReminderReport(false)
    }else if(boolean == 'VolunteerMonth'){
        setShowAnimalsContol(false)
        setShowVolunteerMonth(true)
        setShowMonthlyAdopt(false)
        setShowVolunteerLookup(false)
        setShowVaccineReminderReport(false)
    }else if(boolean == 'MonthlyAdopt'){
        setShowAnimalsContol(false)
        setShowVolunteerMonth(false)
        setShowMonthlyAdopt(true)
        setShowVolunteerLookup(false)
        setShowVaccineReminderReport(false)
    }else if(boolean == 'VolunteerLookup'){
        setShowAnimalsContol(false)
        setShowVolunteerMonth(false)
        setShowMonthlyAdopt(false)
        setShowVolunteerLookup(true)
        setShowVaccineReminderReport(false)
    }else{
        setShowAnimalsContol(false)
        setShowVolunteerMonth(false)
        setShowMonthlyAdopt(false)
        setShowVolunteerLookup(false)
        setShowVaccineReminderReport(true)
    }
}

    return (
    <Fragment>
      <Pane display="flex" flex="1" flexDirection="row">
        <BackButton intent="none" height={40} onClick={() => Router.back() }/>
      </Pane>
      <Pane>
        <Button marginRight="2rem" onClick={() => whenClicked('animalControl')}>Animal Control Report</Button>
        <Button marginRight="2rem" onClick={() => whenClicked('VolunteerMonth')}>Volunteer of the Month</Button>
        <Button marginRight="2rem" onClick={() => whenClicked('MonthlyAdopt')}>Monthly Adoption</Button>
        <Button marginRight="2rem" onClick={() => whenClicked('VolunteerLookup')}>Volunteer lookup</Button>
        <Button marginRight="2rem" onClick={() => whenClicked('default')}>Vaccine Reminder Report</Button>
     </Pane>
     <Pane>
        {loading &&
            <Table>
                <Table.Body>
                </Table.Body>
            </Table>
        }{
            <Table>
                <Table.Body>
                    {showVaccineReminderReport && renderHeaderVaccine()}
                    {showVaccineReminderReport && renderRowVaccine(vaccineReminderReport)}
                    {showMonthlyAdopt && renderHeaderAdoption()}
                    {showMonthlyAdopt && renderRowAdoption(monthlyAdopt)}
                </Table.Body>
            </Table>
        }
     </Pane>
    </Fragment>
      )
}

Reports.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default Reports
import React, { useState, useContext, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Context } from './Context'
import AnimalDashboardColumn from './AnimalDashboardColumn'

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 70vh;
  max-height: 70vh;
`

const AnimalDashboard = (props) => {
  const { setScheduleButton } = props
  const [animals, setAnimals] = useState([])
  const [pendingAdoptions, setPendingAdoptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)
  let Categories = ['Animals', 'Adoptions']

  if (userType != 'Admin') Categories = ['Animals']

  const fetchAnimals = async () => {
    const response = await fetch('http://localhost:4000/animals', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setAnimals(result)
  }

  const fetchPending = async () => {
    const response = await fetch('http://localhost:4000/adoptionApplicationsPendingApproval', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setPendingAdoptions(result)
  }

  useEffect(() => {
    if (localStorage.getItem('userType') != userType) setUserType(localStorage.getItem('userType'))
    fetchAnimals()
    fetchPending()
  }, [])

  return (
    <DashboardContainer>
      {
        Categories.map((label, index) => {
          return <AnimalDashboardColumn key={index} label={label} loading={loading}
            data={label === 'Animals' ? animals : pendingAdoptions}/>
        })
      }
    </DashboardContainer>
  )
}

AnimalDashboard.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default AnimalDashboard

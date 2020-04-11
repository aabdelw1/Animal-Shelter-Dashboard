import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toaster, Spinner, Pane } from 'evergreen-ui'
import { Query } from 'react-apollo'
import { Context } from './Context'
import { useRouter } from 'next/router'
import AnimalDashboardColumn from './AnimalDashboardColumn'
import AnimalCard from './AnimalCard'

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

const AnimalDashboard = (props) => {
  const { setScheduleButton } = props
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  const fetchAnimals = async () => {
    const response = await fetch(`http://localhost:4000/animals`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setAnimals(result)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

    return (
        <Container>
            {
              loading && 
              <Pane>
                <Spinner margin='auto' marginTop='2rem'/>
              </Pane>
            }
            {
              animals.map((animal, index) => { 
                if((species === 'All' || animal.species === species) && (adoptionStatus === 'All' || animal.adoptability === adoptionStatus)) {
                  return <AnimalCard index={index} data={animal}/>
                }
              })
            }
        </Container>
      )
}

AnimalDashboard.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default AnimalDashboard

import React, { useState, useContext, useEffect } from 'react'
import { Select, Button, Pane, Tooltip, Position, toaster, TextInput, SearchInput } from 'evergreen-ui'
import PropTypes from 'prop-types'
import AddAnimalModal from './AddAnimalModal'
import { Context } from './Context'
import { useRouter } from 'next/router'

const AnimalDashboardFilters = (props) => {
  const { scheduleButton } = props
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [speciesList, setSpeciesList] = useState([])
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  
  const getSpecies = async () => {
    const response = await fetch(`http://localhost:4000/species`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setSpeciesList(result)
  }
  useEffect(() => {
    getSpecies()
  }, [])


  return (
    <Pane display="flex" marginY='2rem'>
      <Pane>
        <Select marginRight="2rem" value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
          <option value="All" defaultValue>{loading ? 'Loading' : 'All Species'}</option>
          <option value="Cat">Cats</option>
          <option value="Dog">Dogs</option>
        </Select>
      </Pane>
      <Pane>
        <Select marginRight="2rem" value={adoptionStatus} onChange={e => setAdoptionStatus(e.target.value)}>
         <option value="All" defaultValue>All Statuses</option>
         <option value="Pending">Pending</option>
         <option value="Approved">Approved</option>
         <option value="Rejected">Rejected</option>
        </Select>
      </Pane>
      <Pane>
        <Button marginRight="2rem" onClick={() => setShowModal(true)}>Add Animal</Button>
        <AddAnimalModal showModal={showModal} setShowModal={setShowModal}/>
      </Pane> 
    </Pane>
  )
}
AnimalDashboardFilters.propTypes = {
  specialty: PropTypes.string,
  setSpecialty: PropTypes.func,
  acceptance: PropTypes.string,
  setAcceptance: PropTypes.func,
  date: PropTypes.string,
  setDate: PropTypes.func,
  scheduleButton: PropTypes.bool,
  duration: PropTypes.string,
  setDuration: PropTypes.string
}

export default AnimalDashboardFilters

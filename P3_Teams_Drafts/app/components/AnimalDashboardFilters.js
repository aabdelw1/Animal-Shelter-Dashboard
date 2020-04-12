import React, { useState, useContext, useEffect } from 'react'
import { Select, Button, Pane, Tooltip, Position, toaster, TextInput, SearchInput } from 'evergreen-ui'
import PropTypes from 'prop-types'
import AddAnimalModal from './AddAnimalModal'
import AddNewAdoptionApplication from './AddNewAdoptionApplication'
import { Context } from './Context'
import { useRouter } from 'next/router'

const AnimalDashboardFilters = (props) => {
  const { scheduleButton } = props
  const [showModal, setShowModal] = useState(false)
  const [showModalApp, setShowModalApp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [speciesList, setSpeciesList] = useState([{ label: "Loading ...", value: ""}])
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  
  const getSpecies = async () => {
    const response = await fetch(`http://localhost:4000/species`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    var newList = []
    for(var x = 0; x<result.length;x++){
        newList[x] = result[x].name
    }
    let list = newList.map(name => {return {label: name, value: name}});
    setSpeciesList(list);
    //setSpeciesList(result)
  }
  useEffect(() => {
    getSpecies()
  }, [])


  return (
    <Pane display="flex" marginY='2rem'>
      <Pane>
        <Select marginRight="2rem" value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
          <option value="All" defaultValue>{loading ? 'Loading' : 'All Species'}</option>
          {speciesList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
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
      <Pane>
        <Button marginRight="2rem" onClick={() => setShowModalApp(true)}>New Adoption Application</Button>
        <AddNewAdoptionApplication showModal={showModalApp} setShowModal={setShowModalApp}/>
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

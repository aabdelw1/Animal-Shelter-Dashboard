import React, { useState, useContext, useEffect } from 'react'
import { Select, Button, Pane, Spinner, Tooltip, Position, toaster, TextInput, SearchInput, Badge, Link, Avatar, Text } from 'evergreen-ui'
import PropTypes from 'prop-types'
import AddAnimalModal from './AddAnimalModal'
import AddNewAdoptionApplication from './AddNewAdoptionApplication'
import { Context } from './Context'
import { useRouter } from 'next/router'

const AnimalDashboardFilters = (props) => {
  const { scheduleButton } = props
  const router = useRouter();
  const [showModal, setShowModal] = useState(false)
  const [showModalApp, setShowModalApp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [speciesList, setSpeciesList] = useState([{ label: "Loading ...", value: ""}])
  const [inShelterCount, setInShelterCount] = useState([{ label: "Loading ...", value: ""}])
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  
  const getSpecies = async () => {
    const response = await fetch(`http://localhost:4000/species`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    var newList = []
    var countList = []
    var animalList = []
    for(var x = 0; x<result.length;x++){
        newList[x] = result[x].name
        if(result[x].maxPerShelter > result[x].countWaitingAdoption){
          animalList[x] = [result[x].name, (result[x].maxPerShelter - result[x].countWaitingAdoption - result[x].countNotReadyForAdoption)]
          countList[x] = (result[x].name + " Space Left: " + (result[x].maxPerShelter - result[x].countWaitingAdoption - result[x].countNotReadyForAdoption))
        }
    }
    let list = newList.map(name => {return {label: name, value: name}});
    let count = countList.map(name => {return {label: name, value: name}});
    setSpeciesList(list);
    setInShelterCount(animalList);
  }
  useEffect(() => {
    if(localStorage.getItem('userType') != userType) setUserType(localStorage.getItem('userType'))
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
         <option value="Ready">Ready</option>
         <option value="Adopted">Adopted</option>
        </Select>
      </Pane>
      <Pane>
        <Button marginRight="2rem" disabled={userType == 'Volunteer' ? true: false} onClick={() => setShowModal(true)}>Add Animal</Button>
        <AddAnimalModal showModal={showModal} setShowModal={setShowModal}/>
      </Pane> 
      <Pane>
        <Button marginRight="2rem" onClick={() => setShowModalApp(true)}>New Adoption Application</Button>
        <AddNewAdoptionApplication showModal={showModalApp} setShowModal={setShowModalApp}/>
      </Pane>
      <Pane marginLeft="auto" display="flex">
      { 
      userType == 'Admin' &&
          inShelterCount.map((label, value) => {
            return <Pane display="flex" flexDirection="row">
              <Avatar src={label[0] == 'Dog' ? "/static/dog-face.png" : "/static/cat-face.png"} size={20} marginRight={'0.5rem'} marginLeft={'1rem'}/>
              <Text>: {100 - label[1]} / 100</Text>
            </Pane>
          })
      }
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

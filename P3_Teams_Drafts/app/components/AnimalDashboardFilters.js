import React, { useState, useContext, useEffect } from 'react'
import { Select, Button, Pane, Tooltip, Position, toaster, TextInput, SearchInput } from 'evergreen-ui'
import PropTypes from 'prop-types'
import AddAnimalModal from './AddAnimalModal'
import { Context } from './Context'
import { useRouter } from 'next/router'

const AnimalDashboardFilters = (props) => {
  const { scheduleButton } = props
  const [showModal, setShowModal] = useState(false)
  const [species, setSpecies] = useState("")
  const [speciesList, getSpecies] = useState([{ label: "Loading ...", value: ""}]);
  const [adopt, setAdopt] = useState("Pending")
  const [breedsList, getBreeds] = useState([{ label: "Loading ...", value: ""}]);
  const [loading, setLoading] = useState(true);
  const [,,,,,, date, setDate, specialty, setSpecialty, acceptance, setAcceptance, duration, setDuration, , setReset, candidate, setCandidate, position, setPosition] = useContext(Context)
  // const debouncedCandidate = useDebounce(candidate, 0.0001)

  // useEffect(() => {
  //   setReset(true)
  // }, [date, specialty, acceptance, duration])

    
  
  useEffect(() => {
    let unmounted = false;
    async function getSpeciesAPI() {
      const response = await fetch(`http://localhost:4000/species`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        var newList = []
        for(var x = 0; x<result.length;x++){
            newList[x] = result[x].name
        }
        let list = newList.map(name => {return {label: name, value: name}});
        getSpecies(list);
        setLoading(false);
      }
    }
    getSpeciesAPI();

    /*
    async function getBreedAPI() {
      const response = await fetch(`http://localhost:4000/breeds/${species}`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        let list = result.map(name => {return {label: name, value: name}});
        getBreeds(list);
        setLoading(false);
      }
    }
    getBreedAPI();
    */
    return () => {
      unmounted = true;
    };
  });

  function filterAnimal(e) {
    localStorage.setItem('filterSpecies', species);
    localStorage.setItem('filterAdopt', adopt);
  }


  return (
    <Pane display="flex" marginY='2rem'>
      <Pane>
        <Select marginRight="2rem" value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
          {speciesList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
        </Select>
      </Pane>
      <Pane>
        <Select marginRight="2rem" value={adopt} onChange={e => setAdopt(e.target.value)}>
         <option key="pending" value="Pending">Pending</option>
         <option key="approved" value="Approved">Approved</option>
         <option key="rejected" value="Rejected">Rejected</option>
        </Select>
      </Pane>
      <Pane>
          <Button marginRight="2rem" appearance="primary" onClick={filterAnimal} type="submit">Filter</Button>
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

function useDebounce (value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    },
    [value]
  )
  return debouncedValue
}

export default AnimalDashboardFilters

import React, { useState, useContext, useEffect } from 'react'
import { Select, Button, Pane, Tooltip, Position, toaster, TextInput, SearchInput } from 'evergreen-ui'
import PropTypes from 'prop-types'
import AddAnimalModal from './AddAnimalModal'
import { Context } from './Context'

const AnimalDashboardFilters = (props) => {
  const { scheduleButton } = props
  const [showModal, setShowModal] = useState(false)
  const [,,,,,, date, setDate, specialty, setSpecialty, acceptance, setAcceptance, duration, setDuration, , setReset, candidate, setCandidate, position, setPosition] = useContext(Context)
  // const debouncedCandidate = useDebounce(candidate, 0.0001)

  // useEffect(() => {
  //   setReset(true)
  // }, [date, specialty, acceptance, duration])

  return (
    <Pane display="flex" marginY='2rem'>
      <Pane>
        <SearchInput width="20rem" marginRight="2rem" placeholder="Search for an Animal..." />
      </Pane>
      <Pane>
        <Select marginRight="2rem" value={specialty} onChange={e => setSpecialty(e.target.value)}>
          <option value="Dogs" defaultValue>Dogs</option>
          <option value="Cats">Cats</option>
        </Select>
      </Pane>
      <Pane>
        <Select marginRight="2rem" value={acceptance} onChange={e => setAcceptance(e.target.value)}>
          <option value="All Breeds" defaultValue>All Breeds</option>
          <option value="Some Other Breeds">Some Other Breeds</option>
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

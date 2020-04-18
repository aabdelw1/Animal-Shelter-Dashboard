import React, { useState } from 'react'

const Context = React.createContext({})

const ContextProvider = (props) => {
  const [userType, setUserType] = useState('')
  const [species, setSpecies] = useState('All')
  const [adoptionStatus, setAdoptionStatus] = useState('All')

  return (
    <Context.Provider value={[userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus]}>
      {props.children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }

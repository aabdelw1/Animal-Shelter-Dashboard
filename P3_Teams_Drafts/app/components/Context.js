import React, { useState } from 'react'

const Context = React.createContext({})

const ContextProvider = (props) => {
  // const { children } = props
  // const [AssoDir, setAD] = useState('bb9209')
  // const [smes, setSmes] = useState(['aa573g', 'pd967n'])
  // const [interviewTime, setInterviewTime] = useState('8:00 am')
  // const [date, setDate] = useState(new Date())
  // const [specialty, setSpecialty] = useState('Software Engineer')
  // const [acceptance, setAcceptance] = useState('Free')
  // const [duration, setDuration] = useState(90)
  // const [reset, setReset] = useState(false)
  // const [candidate, setCandidate] = useState('')
  // const [position, setPosition] = useState('Full Time')
  const [isOwner, setIsOwner] = useState(false)
  const [isVolunteer, setIsVolunteer] = useState(false)
  const [isEmployee, setIsEmployee] = useState(false)

  return (
    <Context.Provider value={[isOwner, setIsOwner, isVolunteer, setIsVolunteer, isEmployee, setIsEmployee]}>
      {props.children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }

// const [
//   AssoDir,
//   setAD,
//   smes,
//   setSmes,
//   interviewTime,
//   setInterviewTime,
//   date,
//   setDate,
//   specialty,
//   setSpecialty,
//   acceptance,
//   setAcceptance,
//   duration,
//   setDuration,
//   reset,
//   setReset,
//   candidate,
//   setCandidate
//   postion,
//   setPosition ] = useContext(Context)

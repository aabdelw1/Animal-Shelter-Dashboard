import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddNewAdoptionApplication = (props) => {
  const { showModalApp, setShowModalApp } = props
  const [emailAddress, setEmailAddress] = useState('')
  const [dateOfApplication, setDateOfApplication] = useState('')
  const [cofirstName, setCoFirstName] = useState('')
  const [colastName, setCoLastName] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [loading, setLoading] = useState(true);

  return (
    <Dialog
      isShown={showModalApp}
      title="🐶 Add New Adoption Info"
      onCloseComplete={() => setShowModalApp(false)}
      onConfirm={() => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              emailAddress: `${emailAddress}`,
              phoneNumber: `${phoneNumber}`,
              street: `${street}`,
              city: `${city}`,
              state: `${state}`,
              zipCode: `${zipCode}`,
              applicantFirstName: `${firstName}`,
              applicantLastName: `${lastName}`
            })
          };
          console.log(requestOptions)
        fetch(`http://localhost:4000/newAdopter`, requestOptions)
            .then((Response) => Response.json())
            .then((result) => {
                console.log(result)
                if (result.status != "200"){
                    toaster.warning('Error with adding new adoption info :(')
                }else{
                    toaster.success('I got here')
                }
            })
        setShowModalApp(false)
      }}
      >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="4rem">
            <Heading size={500} marginY="0.5rem">Email Address</Heading>
                <TextInputField
                width={200}
                autoFocus
                placeholder="xxx@yyy.com"
                label=""
                marginRight="2rem"
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">Application Date</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="YYYY-DD-MM"
                label=""
                marginRight="2rem"
                value={dateOfApplication}
                onChange={e => setDateOfApplication(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">Phone Number</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="1111231223"
                label=""
                marginRight="2rem"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="2em">
            <Heading size={500} marginY="0.5rem">Street</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="123 Main st"
                label=""
                marginRight="2rem"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">City</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="Dallas"
                label=""
                marginRight="2rem"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">State</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="TX"
                label=""
                marginRight="2rem"
                value={state}
                onChange={e => setState(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">Zip Code</Heading>
                <TextInputField
                width={100}
                autoFocus
                placeholder="75007"
                label=""
                marginRight="2rem"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
              />
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <Heading size={500} marginY="0.5rem">First Name</Heading>
                <TextInputField
                width={100}
                autoFocus
                label=""
                marginRight="2rem"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">Last Name</Heading>
                <TextInputField
                width={100}
                autoFocus
                label=""
                marginRight="2rem"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <Heading size={500} marginY="0.5rem">Co First Name</Heading>
                <TextInputField
                width={100}
                autoFocus
                label=""
                marginRight="2rem"
                value={cofirstName}
                onChange={e => setCoFirstName(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
          <Heading size={500} marginY="0.5rem">Co Last Name</Heading>
                <TextInputField
                width={100}
                autoFocus
                label=""
                marginRight="2rem"
                value={colastName}
                onChange={e => setCoLastName(e.target.value)}
              />
          </Pane>
        </Pane>
      </Pane>
    </Dialog>
  )
}

AddNewAdoptionApplication.propTypes = {
  Interviewer: PropTypes.object,
  showModalApp: PropTypes.bool,
  setShowModalApp: PropTypes.func
}

export default AddNewAdoptionApplication
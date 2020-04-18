import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button, InlineAlert } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddNewAdoptionApplication = (props) => {
  const { showModal, setShowModal } = props
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

  const [loading, setLoading] = useState(true)

  const [errors, setErrors] = useState({emailAddress: 'Must have valid Email',
                                        dateOfApplication: 'Must have valid date', 
                                        phoneNumber: 'Must have valid phone',
                                        street: 'Must have street',
                                        city: 'Must have city',
                                        state: 'Must have state',
                                        zipCode: 'Must have Zipcode',
                                        firstName: 'Must have First Name',
                                        lastName: 'Must have Last Name'})

  function HandleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'emailAddress': 
        errors.emailAddress = 
          !emailRegex(value)
            ? 'Must have valid Email'
            : '';
        break;
      case 'dateOfApplication': 
        errors.dateOfApplication = 
          !dateRegex(value)
            ? 'Must have valid date'
            : '';
        break;
      case 'phoneNumber': 
        errors.phoneNumber = 
          !phoneRegex(value)
            ? 'Must have valid phone'
            : '';
        break;
      case 'street': 
        errors.street = 
          !streetRegex(value)
            ? 'Must have street'
            : '';
        break;
      case 'state': 
        errors.state = 
          !statesRegex(value)
            ? 'Must have state'
            : '';
        break;
      case 'city': 
        errors.city = 
          !cityRegex(value)
            ? 'Must have city'
            : '';
        break;
      case 'zipCode': 
        errors.zipCode = 
          !zipRegex(value)
            ? 'Must have Zipcode'
            : '';
        break;
      case 'firstName': 
        errors.firstName = 
          value.length <= 1
            ? 'Must have First Name'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
          value.length <= 1
            ? 'Must have Last Name'
            : '';
        break;
      default:
        break;
    }
  }

  function dateRegex(date){
    var re = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return re.test(date);
  }

  function emailRegex(date){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(date);
  }

  function zipRegex(date){
    var re = /^\d{5}$|^\d{5}-\d{4}$/;
    return re.test(date);
  }

  function statesRegex(date){
    var re = /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/;
    return re.test(date);
  }

  function cityRegex(date){
    var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return re.test(date);
  }

  function streetRegex(date){
    var re = /^\s*\S+(?:\s+\S+){2}/;
    return re.test(date);
  }

  function phoneRegex(date){
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(date);
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid

  }                                    

  return (
    <Dialog
      isShown={showModal}
      title="📝 Add New Adoption Info"
      isConfirmDisabled = {!validateForm(errors)}
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        const requestOptionsNewApplication = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emailAddress: `${emailAddress}`,
            dateOfApplication: `${dateOfApplication}`,
            coApplicantFirstName: `${cofirstName}`,
            coApplicantLastName: `${colastName}`
          })
        }
        const requestOptionsNewAdopter = {
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
        }
        fetch('http://localhost:4000/newAdopter', requestOptionsNewAdopter)
          .then((result) => {
            console.log(result)
            if (result.status != '200') {
              toaster.warning('Error with adding new adoption info :(')
            } else {
              fetch('http://localhost:4000/newAdoptionApplication', requestOptionsNewApplication)
                .then((result) => {
                  console.log(result)
                  if (result.status != '200') {
                    toaster.warning('Error with adding new adoption info :(')
                  } else {
                    fetch(`http://localhost:4000/adoptionApplicationsNumber?EmailAddress=${emailAddress}&DateOfApplication=${dateOfApplication}&CoApplicantFirstName=${cofirstName}&CoApplicantLastName=${colastName}`, { method: 'get' })
                      .then((response) => response.json())
                      .then((result) => {
                        toaster.success('Successfully added new adoption info, application ID is: ' + result.applicationNumber)
                      })
                  }
                })
            }
          })
        setShowModal(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="3rem">
            <TextInputField
              width={150}
              autoFocus
              required
              name="emailAddress"
              placeholder="xxx@yyy.com"
              label="Email Address"
              marginRight="2rem"
              value={emailAddress}
              onChange={e => {HandleChange(e);  setEmailAddress(e.target.value)}}
              validationMessage={errors.emailAddress ? errors.emailAddress : false}

            />
            {/* {errors.emailAddress && <InlineAlert intent="danger">{errors.emailAddress}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={150}
              autoFocus
              placeholder="YYYY-DD-MM"
              label="Application Date"
              required
              name="dateOfApplication"
              marginRight="2rem"
              value={dateOfApplication}
              onChange={e => {HandleChange(e); setDateOfApplication(e.target.value)}}
              validationMessage={errors.dateOfApplication ? errors.dateOfApplication : false}

            />
            {/* {errors.dateOfApplication && <InlineAlert intent="danger">{errors.dateOfApplication}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={100}
              autoFocus
              placeholder="1111231223"
              label="Phone Number"
              marginRight="2rem"
              name="phoneNumber"
              value={phoneNumber}
              onChange={e => {HandleChange(e); setPhoneNumber(e.target.value)}}
              validationMessage={errors.phoneNumber ? errors.phoneNumber : false}

            />
            {/* {errors.phoneNumber && <InlineAlert intent="danger">{errors.phoneNumber}</InlineAlert>} */}
          </Pane>
        </Pane>
        <Pane display="flex" justifyContent="space-between">
          <Pane display="flex" flexDirection="column" marginRight="2em">
            <TextInputField
              // width={'25%'}
              autoFocus
              placeholder="123 Main st"
              label="Street"
              name="street"
              marginRight="2rem"
              value={street}
              onChange={e => {HandleChange(e); setStreet(e.target.value)}}
              validationMessage={errors.street ? errors.street : false}

            />
            {/* {errors.street && <InlineAlert intent="danger">{errors.street}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              // width={'25%'}
              autoFocus
              placeholder="Dallas"
              label="City"
              name="city"
              marginRight="2rem"
              value={city}
              onChange={e => {HandleChange(e); setCity(e.target.value)}}
              validationMessage={errors.city ? errors.city : false}

            />
            {/* {errors.city && <InlineAlert intent="danger">{errors.city}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              // width={'25%'}
              autoFocus
              placeholder="TX"
              label="State"
              name="state"
              marginRight="2rem"
              value={state}
              onChange={e => {HandleChange(e); setState(e.target.value)}}
              validationMessage={errors.state ? errors.state : false}

            />
            {/* {errors.state && <InlineAlert intent="danger">{errors.state}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              // width={'25%'}
              autoFocus
              placeholder="75007"
              label="Zip Code"
              name="zipCode"
              marginRight="2rem"
              value={zipCode}
              onChange={e => {HandleChange(e); setZipCode(e.target.value)}}
              validationMessage={errors.zipCode ? errors.zipCode : false}

            />
            {/* {errors.zipCode && <InlineAlert intent="danger">{errors.zipCode}</InlineAlert>} */}
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={100}
              autoFocus
              label="First Name"
              marginRight="2rem"
              name="firstName"
              value={firstName}
              onChange={e => {HandleChange(e); setFirstName(e.target.value)}}
              validationMessage={errors.firstName ? errors.firstName : false}

            />
            {/* {errors.firstName && <InlineAlert intent="danger">{errors.firstName}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={100}
              autoFocus
              label="Last Name"
              marginRight="2rem"
              name="lastName"
              value={lastName}
              onChange={e => {HandleChange(e); setLastName(e.target.value)}}
              validationMessage={errors.lastName ? errors.lastName : false}

            />
            {/* {errors.lastName && <InlineAlert intent="danger">{errors.lastName}</InlineAlert>} */}
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={100}
              autoFocus
              label="Co First Name"
              marginRight="2rem"
              value={cofirstName}
              onChange={e => setCoFirstName(e.target.value)}
              
            />
          </Pane>
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={100}
              autoFocus
              label="Co Last Name"
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
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}

export default AddNewAdoptionApplication

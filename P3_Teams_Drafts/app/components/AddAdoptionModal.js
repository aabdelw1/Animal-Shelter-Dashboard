import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button, InlineAlert } from 'evergreen-ui'
import Component from '@reactions/component'

const AddAdoptionModal = (props) => {
  const { showModal, setShowModal, id } = props
  const [adopterList, setAdopterList] = useState([])
  const [adopter, setAdopter] = useState('')
  const [adoptionDate, setAdoptionDate] = useState('')
  const [adoptionFee, setAdoptionFee] = useState('')
  const [selectedAdopt, setSelectedAdopt] = useState(false)

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({adoptionFee: 'Must have valid Money value',adoptionDate: 'Must have valid date'})


  const getAdopters = async () => {
    const response = await fetch('http://localhost:4000/adoptionApplications?applicantLastName=&coApplicantLastName=', { method: 'get' })
    const result = await response.json()
    setLoading(false)

    var newList = []
    for (var x = 0; x < result.length; x++) {
      var newString = result[x].applicationNumber + ' | ' + result[x].applicantFirstName + ' ' + result[x].applicantLastName + ' | ' + result[x].street + ' | ' + result[x].city + ' | ' + result[x].state + ' | ' + result[x].zipCode + ' | ' + result[x].phoneNumber + ' | ' + result[x].emailAddress + ' | ' + result[x].coApplicantFirstName + ' | ' + result[x].coApplicantLastName
      newList[x] = newString
    }
    setAdopterList(newList)
  }
  useEffect(() => {
    getAdopters()
  }, [])

  function HandleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'adoptionDate': 
        errors.adoptionDate = 
          !dateRegex(value)
            ? 'Must have valid date'
            : '';
        break;
      case 'adoptionFee': 
        errors.adoptionFee = 
          !moneyRegex(value)
            ? 'Must have valid Money value'
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

  function moneyRegex(date){
    var re = /^\d+(?:\.\d\d)*$/;

    if(Number(date) > 0 && re.test(date)){
      return true
    }else{
      return false
    }
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
      title="🐶 Add Adoption"
      isConfirmDisabled = {!validateForm(errors)}
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        const requestOptions = {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationNumber: `${adopter}`,
            adoptionDate: `${adoptionDate}`,
            adoptionFee: `${adoptionFee}`
          })
        }
        fetch(`http://localhost:4000/updateAnimalAdoptionInformation/${id}`, requestOptions)
          .then((result) => {
            if (result.status != '200') {
              toaster.warning('Error with adding pet adoption info :( ')
            } else {
              toaster.success('Successfully added pet adoption info')
            }
          })
        setShowModal(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Heading size={400} marginY="0.5rem">Select Adopter</Heading>
          <Pane marginLeft="2rem">
            <Component
              initialState={{
                options: adopterList.map(label => ({ label, value: label })),
                selected: ['Select name...']
              }}
            >
              {({ state, setState }) => (
                <SelectMenu
                  width={700}
                  hasTitle={false}
                  hasFilter={true}
                  marginRight="2rem"
                  title="Select adopter"
                  options={
                    adopterList.map(label => ({ label, value: label }))
                  }
                  selected={state.selected}
                  onSelect={item => {
                    setState({ selected: (item.value).split(' | ')[1] })
                    setAdopter(item.value.split(' | ')[0])
                    setSelectedAdopt(true)
                  }}
                  closeOnSelect={true}
                >
                  <Button>{state.selected || 'Select name...'}</Button>
                </SelectMenu>
              )}
            </Component>
          </Pane>
        </Pane>
        { selectedAdopt &&
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <TextInputField
              width={50}
              autoFocus
              required
              name="adoptionFee"
              placeholder="20"
              label="Adoption Fee"
              marginRight="2rem"
              value={adoptionFee}
              onChange={e => {HandleChange(e); setAdoptionFee(e.target.value)}}
            />
            {errors.adoptionFee && <InlineAlert intent="danger">{errors.adoptionFee}</InlineAlert>}
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              width={100}
              autoFocus
              required
              name="adoptionDate"
              placeholder="YYYY-DD-MM"
              label="Adoption Date"
              marginRight="2rem"
              value={adoptionDate}
              onChange={e => {HandleChange(e); setAdoptionDate(e.target.value)}}
            />
            {errors.adoptionDate && <InlineAlert intent="danger">{errors.adoptionDate}</InlineAlert>}
          </Pane>
        </Pane>
      }
      </Pane>
    </Dialog>
  )
}

AddAdoptionModal.propTypes = {
  Interviewer: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}

export default AddAdoptionModal

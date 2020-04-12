import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddAdoptionModal = (props) => {
  const { showModal, setShowModal, id } = props
  const [adopterList, setAdopterList] = useState([])
  const [adopter, setAdopter] = useState('')
  const [adoptionDate, setAdoptionDate] = useState('')
  const [adoptionFee, setAdoptionFee] = useState('')
  const [adoptionID, setAdoptionID] = useState('')

  const [loading, setLoading] = useState(true);


  const getAdopters = async () => {
    const response = await fetch(`http://localhost:4000/adoptionApplications?applicantLastName=&coApplicantLastName=`, {method: 'get'})
    const result = await response.json()
    setLoading(false)

    var newList = []
    for(var x = 0; x<result.length;x++){
        var newString = result[x].applicationNumber + " | " +result[x].applicantFirstName + " " + result[x].applicantLastName + " | " + result[x].street + " | " + result[x].city + " | " + result[x].state + " | " + result[x].zipCode + " | " + result[x].phoneNumber + " | " + result[x].emailAddress + " | " + result[x].coApplicantFirstName + " | " +result[x].coApplicantLastName
        newList[x] = newString
    }
    setAdopterList(newList)
  }
  useEffect(() => {
    getAdopters()
  }, [])

  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add Adoption"
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
        };
        fetch(`http://localhost:4000/updateAnimalAdoptionInformation/${id}`, requestOptions)
            .then((result) => {
                  if (result.status != "200"){
                      toaster.warning('Error with adding pet adoption info :(')
                  }else{
                      toaster.success('Successfully added pet adoption info');
                    }
                  })
        setShowModal(false)
      }}
      >
      <Pane>
        <Pane display="flex">
            <Heading size={500} marginY="0.5rem">Select Adopter</Heading>
            <Pane marginLeft="2rem">
            <Component
                initialState={{
                  options: adopterList.map(label => ({ label, value: label })),
                  selected: ["Select name..."]
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
                          setState({ selected: (item.value).split(" | ")[1] })
                          setAdopter(item.value.split(" | ")[0])
                          }}
                        closeOnSelect={true}
                        >
                        <Button>{state.selected || 'Select name...'}</Button>
                    </SelectMenu>
                    )}
            </Component>
            </Pane> 
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column" marginRight="2rem">
            <Heading size={500} marginY="0.5rem">Adoption Fee</Heading>
                <TextInputField
                width={50}
                autoFocus
                required={true}
                placeholder="$20"
                label=""
                marginRight="2rem"
                value={adoptionFee}
                onChange={e => setAdoptionFee(e.target.value)}
              />
          </Pane>
          <Pane display="flex" flexDirection="column">
          <Heading size={500} marginY="0.5rem">Adoption Date</Heading>
                <TextInputField
                width={100}
                autoFocus
                required={true}
                placeholder="YYYY-DD-MM"
                label=""
                marginRight="2rem"
                value={adoptionDate}
                onChange={e => setAdoptionDate(e.target.value)}
              />
          </Pane>
        </Pane>
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

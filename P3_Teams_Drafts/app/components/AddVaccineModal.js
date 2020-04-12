import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'
import { useRouter } from 'next/router'

const AddVaccineModal = (props) => {
  const { showModal, setShowModal, id, species } = props
  const router = useRouter();
  const [vaccine, setVaccine] = useState("")
  const [vaccineList, setVaccineList] = useState([])
  const [vaccinationDate, setVaccinationDate] = useState('')
  const [nextDate, setNextDate] = useState('')
  const [vaccineTagNumber, setVaccineTagNumber] = useState(null)
  const [loading, setLoading] = useState(true);


  const getVaccine = async () => {
    const response = await fetch(`http://localhost:4000/vaccines/${id}`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    var newList = []
    for(var x = 0; x<result.length;x++){
        newList[x] = result[x]
    }
    let list = newList.map(name => {return {label: name, value: name}});
    setVaccineList(list);
  }


  useEffect(() => {
    getVaccine()
  }, [])

  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add New Vaccine"
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        var num = (vaccineTagNumber == null) ? null : vaccineTagNumber
        const requestOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            speciesName: `${species}`,
            vaccineType: `${vaccine}`,
            vaccinationNumber: num,
            dateAdministered: `${vaccinationDate}`,
            expirationDate: `${nextDate}`,
            vaccineSubmitter: `${localStorage.getItem('UserName')}`
          })
        };
        console.log(requestOptions)
        fetch(`http://localhost:4000/animal/${id}/vaccines/add`, requestOptions)
            .then((Response) => Response.json())
            .then((result) => {
                  if (result.status != 'success'){
                      toaster.warning('Error with adding vaccine info :( ')
                  }else{
                      toaster.success('Successfully added vaccine info');
                      router.push('/animal/'+id);
                    }
                 })
        setShowModal(false)
      }}
      >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Choose Vaccine *</Heading>
            <Pane>
              <Select marginRight="2rem" value={vaccine} disabled={loading} onChange={e => setVaccine(e.target.value)}>
                {vaccineList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </Select>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Vaccination Date</Heading>
            <TextInputField
              autoFocus
              label=""
              required={true}
              marginRight="1rem"
              value={vaccinationDate}
              placeholder="YYYY-DD-MM"
              onChange={e => setVaccinationDate(e.target.value)}
            />
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Next dose Date</Heading>
            <TextInputField
              autoFocus
              label=""
              required={true}
              marginRight="1rem"
              value={nextDate}
              placeholder="YYYY-DD-MM"
              onChange={e => setNextDate(e.target.value)}
            />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Vaccine Tag number</Heading>
            <TextInputField
              autoFocus
              label=""
              marginRight="2rem"
              value={vaccineTagNumber}
              placeholder=""
              onChange={e => setVaccineTagNumber(e.target.value)}
            />
          </Pane>
        </Pane>
      </Pane>
    </Dialog>
  )
}

AddVaccineModal.propTypes = {
  Interviewer: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}

export default AddVaccineModal
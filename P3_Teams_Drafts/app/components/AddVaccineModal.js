import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button, SelectField, InlineAlert } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'
import { useRouter } from 'next/router'

const AddVaccineModal = (props) => {
  const { showModal, setShowModal, id, species } = props
  const router = useRouter()
  const [vaccine, setVaccine] = useState('')
  const [vaccineList, setVaccineList] = useState([])
  const [vaccinationDate, setVaccinationDate] = useState('')
  const [nextDate, setNextDate] = useState('')
  const [vaccineTagNumber, setVaccineTagNumber] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({vaccinationDate: 'Must have valid date',nextDate: 'Must have valid date'})


  const getVaccine = async () => {
    const response = await fetch(`http://localhost:4000/vaccines/${id}`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    var newList = []
    for (var x = 0; x < result.length; x++) {
      newList[x] = result[x]
    }
    const list = newList.map(name => { return { label: name, value: name } })
    setVaccineList(list)
  }

  useEffect(() => {
    getVaccine()
  }, [])

  function HandleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'vaccinationDate': 
        errors.vaccinationDate = 
          !dateRegex(value)
            ? 'Must have valid date'
            : '';
        break;
      case 'nextDate': 
        errors.nextDate = 
          !dateRegex(value)
            ? 'Must have valid date'
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
      title="🐶 Add New Vaccine"
      isConfirmDisabled = {!validateForm(errors)}
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
        }
        fetch(`http://localhost:4000/animal/${id}/vaccines/add`, requestOptions)
          .then((Response) => Response.json())
          .then((result) => {
            if (result.status != 'success') {
              toaster.warning('Error with adding vaccine info :( ')
            } else {
              toaster.success('Successfully added vaccine info')
              router.push('/animal/' + id)
            }
          })
        setShowModal(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Pane>
              <SelectField label="Choose Vaccine" marginRight="2rem" value={vaccine} disabled={loading} onChange={e => setVaccine(e.target.value)}>
                {vaccineList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </SelectField>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              required
              autoFocus
              name="vaccinationDate"
              label="Vaccination Date"
              required={true}
              marginRight="1rem"
              value={vaccinationDate}
              placeholder="YYYY-DD-MM"
              onChange={e => {HandleChange(e); setVaccinationDate(e.target.value)}}
            />
            {errors.vaccinationDate && <InlineAlert intent="danger">{errors.vaccinationDate}</InlineAlert>}
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <TextInputField
              autoFocus
              required
              label="Next Dose Date"
              required={true}
              marginRight="1rem"
              name="nextDate"
              value={nextDate}
              placeholder="YYYY-DD-MM"
              onChange={e => {HandleChange(e); setNextDate(e.target.value)}}
            />
             {errors.nextDate && <InlineAlert intent="danger">{errors.nextDate}</InlineAlert>}
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              autoFocus
              label="Vaccine Tag number"
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

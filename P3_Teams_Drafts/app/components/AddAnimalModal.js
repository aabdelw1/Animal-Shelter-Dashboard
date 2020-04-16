import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button,SelectField, InlineAlert } from 'evergreen-ui'
import Component from '@reactions/component'
import { useRouter } from 'next/router'

const AddAnimalModal = (props) => {
  const { showModal, setShowModal } = props
  const router = useRouter()

  //Vaccine values
  const [vaccine, setVaccine] = useState('')
  const [vaccineList, setVaccineList] = useState([])
  const [vaccinationDate, setVaccinationDate] = useState('')
  const [nextDate, setNextDate] = useState('')
  const [vaccineTagNumber, setVaccineTagNumber] = useState(null)


  //normal animal values
  const [animalName, setAnimalName] = useState('')
  const [species, setSpecies] = useState('Dog')
  const [breeds, setBreeds] = useState([])
  const [breedsList, setBreedsList] = useState([])
  const [speciesList, setSpeciesList] = useState([])
  const [sex, setSex] = useState('Unknown')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')
  const [microchipId, setMicrochipId] = useState('')
  const [surrenderDate, setSurrenderDate] = useState(getTodaysDate())
  const [surrenderReason, setSurrenderReason] = useState('')
  const [surrenderSubmitter, setSurrenderSubmitter] = useState('')
  const [loading, setLoading] = useState(true)
  const [alterationStatus, setAlterationStatus] = useState('0')
  const [surrenderByAnimalControl, setSurrenderByAnimalControl] = useState('0')
  const [animalCount, setAnimalCount] = useState([{ species: '', maxPerShelter: '', countWaitingAdoption: '' }])
  const [adoptability, setAdoptability] = useState('true')
  const [errors, setErrors] = useState({date: '',age: 'Enter valid age', name: 'Enter Name', surrenderReason: 'Need Surrender Reason', vaccinationDate: 'Must have valid date', nextDate: 'Must have valid date'})

  


  const getBreeds = async () => {
    const response = await fetch(`http://localhost:4000/breeds/${species}`, { method: 'get' })
    const result = await response.json()
    result.push('Unknown')
    result.push('Mixed')
    setLoading(false)
    setBreedsList(result)
  }

  const getSpecies = async () => {
    const response = await fetch('http://localhost:4000/species', { method: 'get' })
    const result = await response.json()
    setLoading(false)
    var newList = []
    var countList = []
    for (var x = 0; x < result.length; x++) {
      newList[x] = result[x].name
      countList[x] = { species: result[x].name, maxPerShelter: result[x].maxPerShelter, countWaitingAdoption: result[x].countWaitingAdoption, countNotReadyForAdoption: result[x].countNotReadyForAdoption }
    }
    const list = newList.map(name => { return { label: name, value: name } })
    setSpeciesList(list)
    setAnimalCount(countList)
  }

  const getVaccine = async () => {
    const response = await fetch(`http://localhost:4000/species/${species}/vaccines`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    var newList = []
    for (var x = 0; x < result.length; x++) {
      newList[x] = result[x].vaccineType
    }
    const list = newList.map(name => { return { label: name, value: name } })
    setVaccineList(list)
  }

  useEffect(() => {
    getSpecies()
    getBreeds()
    getVaccine()
  }, [species])

  function getTodaysDate(){
  var dateObj = new Date();
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  var date = ('0' + dateObj.getDate()).slice(-2);
  var year = dateObj.getFullYear();
  var shortDate = year + '-' + month + '-' + date;
  return shortDate
  }

  function HandleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'surrenderDate': 
        errors.date = 
          !dateRegex(value)
            ? 'Must have valid date'
            : '';
        break;
      case 'age': 
        errors.age = 
          !ageRegex(value)
            ? 'Enter valid age'
            : '';
        break;
      case 'name': 
        errors.name = 
          value.length <= 1
            ? 'Enter Name'
            : '';
        break;
      case 'surrenderReason': 
        errors.surrenderReason = 
          value.length <= 1
            ? 'Need Surrender Reason'
            : '';
        break;
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

  function ageRegex(age){
    var re = /^\d{1,4}$/;
    return re.test(age);
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
      title="🐶 Add New Animal"
      isConfirmDisabled = {!validateForm(errors)}
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        for (var x = 0; x < animalCount.length; x++) {
          if (species == animalCount[x].name && animalCount[x].maxPerShelter < (animalCount[x].countWaitingAdoption + animalCount[x].countNotReadyForAdoption)) return setShowModal(false)
        }

        var newBreeds = (breeds.length == 0) ? ['Unknown'] : breeds.selected

        const requestOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${animalName}`,
            description: `${description}`,
            age: `${age}`,
            sex: `${sex}`,
            microchipId: `${microchipId}`,
            surrenderDate: `${surrenderDate}`,
            surrenderSubmitter: `${localStorage.getItem('UserName')}`,
            surrenderReason: `${surrenderReason}`,
            surrenderByAnimalControl: `${surrenderByAnimalControl}`,
            alterationStatus: `${alterationStatus}`,
            breeds: `${newBreeds.join(',')}`,
            species: `${species}`
          })
        }
        fetch('http://localhost:4000/animal/add', requestOptions)
          .then((Response) => Response.json())
          .then((result) => {
            if (!result.petId) {
              toaster.warning('Error with adding pet :( ')
            } else {
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
                fetch(`http://localhost:4000/animal/${result.petId}/vaccines/add`, requestOptions)
                  .then((Response) => Response.json())
                  .then((result) => {
                    if (result.status != 'success') {
                      toaster.warning('Error with adding pet :( ')
                    } else {
                      toaster.success('Successfully added pet')
                      window.location.reload();
                    }
                  })
                    
            }
        })

        setShowModal(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <TextInputField
              autoFocus
              label="Enter Animal Name"
              required
              name="name"
              marginRight="2rem"
              value={animalName}
              placeholder="Sol"
              onChange={e => {HandleChange(e); setAnimalName(e.target.value)}}
            />
            {errors.name && <InlineAlert intent="danger">{errors.name}</InlineAlert>}
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Pane>
              <SelectField label="Species" marginRight="2rem" required value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
                {speciesList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </SelectField>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Pane>
              <SelectField label="Sex" marginRight="2rem" value={sex} width={100} onChange={e => setSex(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown" defaultValue>Unknown</option>
              </SelectField>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              width={50}
              autoFocus
              name="age"
              placeholder={1}
              label="Age"
              marginRight="2rem"
              value={age}
              onChange={e => {HandleChange(e); Number(setAge(e.target.value)); }}
            />
            {errors.age && <InlineAlert intent="danger">{errors.age}</InlineAlert>}
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={400} marginY="0.5rem">Breed *</Heading>
              <Pane marginRight="2rem">
                <Component
                  initialState={{
                    options: breedsList.map(label => ({ label, value: label })),
                    selected: []
                  }}
                >
                  {({ state, setState }) => (
                    <SelectMenu
                      isMultiSelect
                      title="Select multiple Breeds"
                      options={breedsList.map(label => ({ label, value: label }))}
                      selected={state.selected}
                      onSelect={item => {
                        const selected = [...state.selected, item.value]
                        const selectedItems = selected
                        const selectedItemsLength = selectedItems.length
                        let selectedNames = ''
                        if (selectedItemsLength === 0) {
                          selectedNames = ''
                        } else if (selectedItemsLength === 1) {
                          selectedNames = selectedItems.toString()
                        } else if (selectedItemsLength > 1) {
                          selectedNames = selectedItemsLength.toString() + ' selected...'
                        }
                        setBreeds({ selected, selectedNames })
                        setState({
                          selected,
                          selectedNames
                        })
                      }}
                      onDeselect={item => {
                        const deselectedItemIndex = state.selected.indexOf(item.value)
                        const selectedItems = state.selected.filter(
                          (_item, i) => i !== deselectedItemIndex
                        )
                        const selectedItemsLength = selectedItems.length
                        let selectedNames = ''
                        if (selectedItemsLength === 0) {
                          selectedNames = ''
                        } else if (selectedItemsLength === 1) {
                          selectedNames = selectedItems.toString()
                        } else if (selectedItemsLength > 1) {
                          selectedNames = selectedItemsLength.toString() + ' selected...'
                        }
                        setState({ selected: selectedItems, selectedNames })
                        setBreeds({ selected: selectedItems, selectedNames })
                      }}
                    >
                      <Button>{state.selectedNames || 'Select multiple...'}</Button>
                    </SelectMenu>
                  )}
                </Component>
              </Pane>

              {/* change this to a tagInput */}
              {/* <Select marginRight="2rem" value={breedsAdd} disabled={loading} onChange={e => setBreedsAdd(e.target.value)}>
                {breedsListAdd.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </Select> */}
            </Pane>
          </Pane>
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={400} marginY="0.5rem">Alteration Status *</Heading>
              <Combobox
                width={150}
                openOnFocus
                marginRight="2rem"
                items={['true', 'false']}
                autocompleteProps={{ title: 'Alteration Status' }}
                initialSelectedItem={''}
                onChange={selected =>  setAlterationStatus(selected == 'true' ? 1 : 0)}
                value={alterationStatus}
              />
              {errors.alterationStatus && <InlineAlert intent="danger">{errors.alterationStatus}</InlineAlert>}
            </Pane>
          </Pane>
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <TextInputField
                width={70}
                autoFocus
                placeholder={7089353147}
                label="MicrochipID"
                marginRight="2rem"
                value={microchipId}
                onChange={e => Number(setMicrochipId(e.target.value))}
              />
            </Pane>
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <TextInputField
              autoFocus
              label="Enter Description"
              marginRight="2rem"
              value={description}
              placeholder="Enter Description"
              onChange={e => setDescription(e.target.value)}
            />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              label="Surrender Date"
              required
              name="surrenderDate"
              marginRight="2rem"
              value={surrenderDate}
              placeholder="YYYY-DD-MM"
              onChange={e => {HandleChange(e);  setSurrenderDate(e.target.value)}}
            />
            {errors.surrenderDate && <InlineAlert intent="danger">{errors.surrenderDate}</InlineAlert>}
          </Pane>
          <Pane display="flex" flexDirection="column">
            <TextInputField
              required
              autoFocus
              name="surrenderReason"
              label="Surrender Reason"
              marginRight="2rem"
              value={surrenderReason}
              placeholder="Surrender Reason"
              onChange={e =>  {HandleChange(e);  setSurrenderReason(e.target.value)}}
            />
            {errors.surrenderReason && <InlineAlert intent="danger">{errors.surrenderReason}</InlineAlert>}
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={400} marginY="0.5rem">Surrendered by Animal control</Heading>
            <Combobox
              width={150}
              openOnFocus
              marginRight="2rem"
              items={['true', 'false']}
              autocompleteProps={{ title: 'Surrendered by animal control' }}
              initialSelectedItem={''}
              onChange={selected => setSurrenderByAnimalControl(selected == 'true' ? 1 : 0)}
              value={surrenderByAnimalControl}
            />
          </Pane>
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

AddAnimalModal.propTypes = {
  Interviewer: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}

export default AddAnimalModal

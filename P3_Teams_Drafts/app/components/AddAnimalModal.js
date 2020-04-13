import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useRouter } from 'next/router'

const AddAnimalModal = (props) => {
  const { showModal, setShowModal } = props
  const router = useRouter()
  const [animalName, setAnimalName] = useState('')
  const [species, setSpecies] = useState('Dog')
  const [breeds, setBreeds] = useState([])
  const [breedsList, setBreedsList] = useState([])
  const [speciesList, setSpeciesList] = useState([])
  const [sex, setSex] = useState('Male')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')
  const [microchipId, setMicrochipId] = useState('')
  const [surrenderDate, setSurrenderDate] = useState('')
  const [surrenderReason, setSurrenderReason] = useState('')
  const [surrenderSubmitter, setSurrenderSubmitter] = useState('')
  const [loading, setLoading] = useState(true)
  const [alterationStatus, setAlterationStatus] = useState('')
  const [surrenderByAnimalControl, setSurrenderByAnimalControl] = useState('')
  const [animalCount, setAnimalCount] = useState([{ species: '', maxPerShelter: '', countWaitingAdoption: '' }])
  const [adoptability, setAdoptability] = useState('true')

  const getBreeds = async () => {
    const response = await fetch(`http://localhost:4000/breeds/${species}`, { method: 'get' })
    const result = await response.json()
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

  useEffect(() => {
    getSpecies()
    getBreeds()
  }, [species])

  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add New Animal"
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        for (var x = 0; x < animalCount.length; x++) {
          if (species == animalCount[x].name && animalCount[x].maxPerShelter < (animalCount[x].countWaitingAdoption + animalCount[x].countNotReadyForAdoption)) return setShowModal(false)
        }
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
            breeds: `${breeds.selected.join(',')}`,
            species: `${species}`
          })
        }
        fetch('http://localhost:4000/animal/add', requestOptions)
          .then((Response) => Response.json())
          .then((result) => {
            if (!result.petId) {
              toaster.warning('Error with adding pet :( ')
            } else {
              toaster.success('Successfully added pet')
              router.push('/animalDashboard')
            }
          })
        setShowModal(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Enter Animal Name *</Heading>
            <TextInputField
              autoFocus
              label=""
              marginRight="2rem"
              value={animalName}
              placeholder="Sol"
              onChange={e => setAnimalName(e.target.value)}
            />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Species *</Heading>
            <Pane>
              <Select marginRight="2rem" value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
                {speciesList.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </Select>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Sex *</Heading>
            <Pane>
              <Select marginRight="2rem" value={sex} width={100} onChange={e => setSex(e.target.value)}>
                <option value="Male" defaultValue>Male</option>
                <option value="Female">Female</option>
                <option value="Female">Unknown</option>
              </Select>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Age *</Heading>
            <TextInputField
              width={50}
              autoFocus
              placeholder={1}
              label=""
              marginRight="2rem"
              value={age}
              onChange={e => Number(setAge(e.target.value))}
            />
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={500} marginY="0.5rem">Breed *</Heading>
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
              <Heading size={500} marginY="0.5rem">Alteration Status *</Heading>
              <Combobox
                width={150}
                openOnFocus
                marginRight="2rem"
                items={['true', 'false']}
                autocompleteProps={{ title: 'Alteration Status' }}
                initialSelectedItem={alterationStatus || ''}
                onChange={selected => setAlterationStatus(selected == 'true' ? 1 : 0)}
                value={alterationStatus}
              />
            </Pane>
          </Pane>
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={500} marginY="0.5rem">MicrochipID</Heading>
              <TextInputField
                width={70}
                autoFocus
                placeholder={7089353147}
                label=""
                marginRight="2rem"
                value={microchipId}
                onChange={e => Number(setMicrochipId(e.target.value))}
              />
            </Pane>
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Enter Description</Heading>
            <TextInputField
              autoFocus
              label=""
              marginRight="2rem"
              value={description}
              placeholder="Enter Description"
              onChange={e => setDescription(e.target.value)}
            />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Surrender Date</Heading>
            <TextInputField
              autoFocus
              label=""
              marginRight="2rem"
              value={surrenderDate}
              placeholder="YYYY-DD-MM"
              onChange={e => setSurrenderDate(e.target.value)}
            />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Surrender Reason</Heading>
            <TextInputField
              autoFocus
              label=""
              marginRight="2rem"
              value={surrenderReason}
              placeholder="Surrender Reason"
              onChange={e => setSurrenderReason(e.target.value)}
            />
          </Pane>
        </Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Surrendered by Animal control</Heading>
            <Combobox
              width={150}
              openOnFocus
              marginRight="2rem"
              items={['true', 'false']}
              autocompleteProps={{ title: 'Surrendered by animal control' }}
              initialSelectedItem={surrenderByAnimalControl || ''}
              onChange={selected => setSurrenderByAnimalControl(selected == 'true' ? 1 : 0)}
              value={surrenderByAnimalControl}
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

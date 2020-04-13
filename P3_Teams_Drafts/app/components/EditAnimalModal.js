import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useRouter } from 'next/router'

const EditAnimalModal = (props) => {
  const { animal, visible, setVisible } = props
  const { petId, name, species, breeds, sex, alterationStatus, age, adoptability, microchipId } = animal
  const [newBreeds, setNewBreeds] = useState(breeds.split('/'))
  const [breedsList, setBreedsList] = useState([])
  let [newSex, setNewSex] = useState('')
  let [newMicrochipId, setNewMicrochipId] = useState('')
  const [loading, setLoading] = useState(true)
  let [newAlterationStatus, setNewAlterationStatus] = useState('')

  if(sex != 'Unknown') [newSex, setNewSex] = useState(sex)
  if(microchipId != '') [newMicrochipId, setNewMicrochipId] = useState(microchipId)
  if(alterationStatus != '') [newAlterationStatus, setNewAlterationStatus] = useState(alterationStatus)

  const getBreeds = async () => {
    const response = await fetch(`http://localhost:4000/breeds/${species}`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setBreedsList(result)
  }


  useEffect(() => {
    getBreeds()
  }, [])

  
  return (
    <Dialog
      isShown={visible}
      title="🐶 Edit Animal"
      onCloseComplete={() => setVisible(false)}
      onConfirm={() => {
        const requestOptions = {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sex: `${newSex}`,
            microchipId: `${newMicrochipId}`,
            alterationStatus: `${newAlterationStatus}`,
            breeds: `${newBreeds.selected.join(',')}`,
          })
        }
        fetch(`http://localhost:4000/updateAnimalInformation/${petId}`, requestOptions)
          .then((result) => {
            if (result.status != '200') {
              toaster.warning('Error when updating pet :( ')
            } else {
              toaster.success('Successfully updated pet')
            }
          })
        setVisible(false)
      }}
    >
      <Pane>
        <Pane display="flex">
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.5rem">Sex *</Heading>
            <Pane>
              <Select marginRight="2rem" value={newSex} width={100} onChange={e => setNewSex(e.target.value)}>
                <option value="Male" defaultValue>Male</option>
                <option value="Female">Female</option>
              </Select>
            </Pane>
          </Pane>

          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={500} marginY="0.5rem">Breed *</Heading>
              <Pane marginRight="2rem">
                <Component
                  initialState={{
                    options: breedsList.map(label => ({ label, value: label })),
                    selected: newBreeds
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
                        setNewBreeds({ selected, selectedNames })
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
                        setNewBreeds({ selected: selectedItems, selectedNames })
                      }}
                    >
                      <Button>{state.selectedNames || 'Select multiple...'}</Button>
                    </SelectMenu>
                  )}
                </Component>
              </Pane>
            </Pane>
          </Pane>
        </Pane>
        <Pane display="flex">
          
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
                onChange={selected => setNewAlterationStatus(selected == 'true' ? 1 : 0)}
                value={newAlterationStatus}
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
                value={newMicrochipId}
                onChange={e => Number(setNewMicrochipId(e.target.value))}
              />
            </Pane>
          </Pane>
        </Pane>
      
      </Pane>
    </Dialog>
  )
}

EditAnimalModal.propTypes = {
  Interviewer: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}

export default EditAnimalModal

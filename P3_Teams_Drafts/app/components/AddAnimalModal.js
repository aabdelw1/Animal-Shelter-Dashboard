import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select, SelectMenu, Button } from 'evergreen-ui'
import Component from '@reactions/component'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddAnimalModal = (props) => {
  const { showModal, setShowModal } = props
  const [animalName, setAnimalName] = useState('')
  const [species, setSpecies] = useState("Dog")
  const [breeds, setBreeds] = useState([])
  const [breedsList, setBreedsList] = useState([])
  const [sex, setSex] = useState('Male')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(true);
  const [alterationStatus, setAlterationStatus] = useState('false')
  const [adoptability, setAdoptability] = useState('true')

  const getBreeds = async () => {
    const response = await fetch(`http://localhost:4000/breeds/${species}`, {method: 'get'})
    const result = await response.json()
    setLoading(false)
    setBreedsList(result)
  }
  useEffect(() => {
    getBreeds()
  }, [species])

  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add New Animal"
      onCloseComplete={() => setShowModal(false)}
      // onConfirm={() => {
      //   const requestOptions = {
      //     method: 'post',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ 
      //       name: `${animalName}`,
      //       description: "cute",
      //       age: `${age}`,
      //       microchipId: "123",
      //       sex: `${sex}`,
      //       surrenderDate: "2020/4/09",
      //       surrenderSubmitter: "123",
      //       surrenderReason: "123",
      //       surrenderByAnimalControl: "123",
      //       alterationStatus: "123",
      //       species: `${speciesAdd}` 
      //     })
      //   };
      //   console.log(requestOptions)
      //   fetch(`http://localhost:4000/animal/add`, requestOptions)
      //       .then((Response) => Response.json())
      //       .then((result) => {
      //             console.log(result)
      //             if (result.status != 200){
      //                 toaster.warning('Error with adding pet :( ')
      //             }else{
      //                 toaster.success('Successfully added pet');
      //                 router.push('/animalDashboard');
      //               }
      //             })
      //   setShowModal(false)
      // }}
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
            <Heading size={500} marginY="0.7rem">Species *</Heading>
            <Pane>
              <Select marginRight="2rem" value={species} disabled={loading} onChange={e => setSpecies(e.target.value)}>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
              </Select>
            </Pane>
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={500} marginY="0.7rem">Sex *</Heading>
            <Pane>
              <Select marginRight="2rem" value={sex} width={100} onChange={e => setSex(e.target.value)}>
                <option value="Male" defaultValue>Male</option>
                <option value="Female">Female</option>
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
                      setBreeds({selected, selectedNames})
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
                onChange={selected => setAlterationStatus(selected)}
                value={alterationStatus}
              />
            </Pane>
          </Pane>
          <Pane display="flex" marginBottom="3rem">
            <Pane display="flex" flexDirection="column">
              <Heading size={500} marginY="0.5rem">Adoptability</Heading>
              <Combobox
                width={150}
                openOnFocus
                marginRight="2rem"
                items={['true', 'false']}
                autocompleteProps={{ title: 'Adoptability' }}
                initialSelectedItem={adoptability || ''}
                onChange={selected => setAdoptability(selected)}
                value={adoptability}
              />
            </Pane>
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

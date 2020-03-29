import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select } from 'evergreen-ui'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddAnimalModal = (props) => {
  const { showModal, setShowModal } = props
  const [animalName, setAnimalName] = useState('')
  const [species, setSpecies] = useState('')
  const [breed, setBreed] = useState('')
  const [sex, setSex] = useState('')
  const [age, setAge] = useState('')
  const [alterationStatus, setAlterationStatus] = useState('false')
  const [adoptability, setAdoptability] = useState('true')

  const [addAnimal, { loading: mutationLoading, error: mutationError }] = useMutation(Mutations.ADD_ANIMAL)

  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add New Animal"
      onCloseComplete={() => setShowModal(false)}
      confirmLabel={mutationLoading ? 'Loading... ' : 'Create'}
      isConfirmLoading={mutationLoading}
      isConfirmDisabled={!animalName || !species || !breed}
      onConfirm={() => {
        // ADD BACKEND STUFF
        setShowModal(false)
        mutationError ? toaster.danger('An error has occured when adding a new Animal') : toaster.success('Your Animal was added!')
      }}>
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
              <Select marginRight="2rem" width={100} value={species} onChange={e => setSpecies(e.target.value)}>
                <option value="Dog" defaultValue>Dog</option>
                <option value="Cat">Cat</option>
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
              {/* change this to a tagInput */}
              <Combobox
                width={200}
                openOnFocus
                marginRight="2rem"
                items={species === 'Cat' ? ['CatBreed1', 'CatBreed2'] : ['DogBreed1', 'DogBreed2']}
                placeholder="Select Breed"
                autocompleteProps={{ title: 'Breed' }}
                initialSelectedItem={breed || ''}
                onChange={selected => setBreed(selected)}
                value={breed}
              />
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, Combobox, Pane, Dialog, TextInputField, toaster, Select } from 'evergreen-ui'
import { useMutation } from 'react-apollo'
import Mutations from '../graphql/mutations'

const AddAnimalModal = (props) => {
  const { showModal, setShowModal } = props
  const [animalName, setAnimalName] = useState('')
  const [speciesAdd, setSpeciesAdd] = useState("Dog")
  const [speciesListAdd, getSpeciesAdd] = useState([{ label: "Loading ...", value: ""}]);
  const [breedsAdd, setBreedsAdd] = useState("Dog")
  const [breedsListAdd, getBreedsAdd] = useState([{ label: "Loading ...", value: ""}]);
  const [sex, setSex] = useState('Male')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(true);
  const [alterationStatus, setAlterationStatus] = useState('false')
  const [adoptability, setAdoptability] = useState('true')

  useEffect(() => {
    let unmounted = false;
    async function getSpeciesAddAPI() {
      const response = await fetch(`http://localhost:4000/species`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        var newList = []
        for(var x = 0; x<result.length;x++){
            newList[x] = result[x].name
        }
        let list = newList.map(name => {return {label: name, value: name}});
        getSpeciesAdd(list);
        setLoading(false);
      }
    }
    getSpeciesAddAPI();

    async function getBreedAddAPI() {
      const response = await fetch(`http://localhost:4000/breeds/${speciesAdd}`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        let list = result.map(name => {return {label: name, value: name}});
        getBreedsAdd(list);
        setLoading(false);
      }
    }
    getBreedAddAPI();
    return () => {
      unmounted = true;
    };
  });


  return (
    <Dialog
      isShown={showModal}
      title="🐶 Add New Animal"
      onCloseComplete={() => setShowModal(false)}
      onConfirm={() => {
        const requestOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: `${animalName}`,
            description: "cute",
            age: `${age}`,
            microchipId: "123",
            sex: `${sex}`,
            surrenderDate: "2020/4/09",
            surrenderSubmitter: "123",
            surrenderReason: "123",
            surrenderByAnimalControl: "123",
            alterationStatus: "123",
            species: `${speciesAdd}` 
          })
        };
        console.log(requestOptions)
        fetch(`http://localhost:4000/animal/add`, requestOptions)
            .then((Response) => Response.json())
            .then((result) => {
                  console.log(result)
                  if (result.status != 200){
                      toaster.warning('Error with adding pet :( ')
                  }else{
                      toaster.success('Successfully added pet');
                      router.push('/animalDashboard');
                    }
                  })
        setShowModal(false)
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
              <Select marginRight="2rem" value={speciesAdd} disabled={loading} onChange={e => setSpeciesAdd(e.target.value)}>
                {speciesListAdd.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
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
              <Select marginRight="2rem" value={breedsAdd} disabled={loading} onChange={e => setBreedsAdd(e.target.value)}>
                {breedsListAdd.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </Select>
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Heading, BackButton, Pane, Button, Tooltip, Position, Icon, Link, Badge, Text, Table, Avatar } from 'evergreen-ui'
import Router from 'next/router'
import AddAnimalModal from './AddAnimalModal'


const Profile = (props) => {
  const { _id } = props
  const [animal, setAnimal] = useState(null)
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const data = null

  const animalInfo = async () => {
    const response = await fetch(`http://localhost:4000/animal/${_id}`, {method: 'get'})
    const result = await response.json()
    setAnimal(result)
  }

  useEffect(() => {
    animalInfo()
  }, [])

  return (
    <>
      <Pane display="flex" flex="1" flexDirection="row">
        <BackButton intent="none" height={40} onClick={() => Router.back() }/>
      </Pane>
      { animal && 
      <Pane display="flex" flex="1" flexDirection="row" marginTop="2rem">
        <Heading size={800}>{animal.name} </Heading>
        <Avatar src={animal.species == 'Dog' ? "/static/dog-face.png" : "/static/cat-face.png"} name={animal.species} size={40} marginY={'-0.5rem'} marginLeft={'1rem'}/>
      </Pane> }
      <Pane display="flex" flex="1" flexDirection="row">
        <Pane flex="1">
          {animal && <Pane display="flex" flexDirection="column" flex="1">
            <Pane marginY="0.75rem">
              { (animal.adoptability == 'Approved' || animal.adoptability == 'Rejected') && <Badge marginLeft={'1rem'} marginY="0.5rem" color={animal.adoptability == 'Approved' ? 'green' : 'red'}>{animal.adoptability}</Badge> }
              { (animal.adoptability == 'Pending' || animal.adoptability == null) && <Badge marginLeft={'1rem'} marginY="0.5rem" color='blue'>Pending</Badge> }
            </Pane>
            <Pane marginY="0.75rem"><Icon icon="circle" color="#425A70" marginY='-0.2rem' marginRight="1rem"/><Text size={500}>{animal.sex}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="git-merge" color="#425A70" marginRight="1rem"/><Text size={500}>{animal.breeds}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="calendar" color="#425A70" marginY='-0.3rem' marginRight="1rem"/><Text size={500}>Age: {animal.age}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="barcode" color="#425A70" marginY='-0.3rem' marginRight="1rem"/><Text size={500}>{animal.microchipId == '' ? 'None' : animal.microchipId}</Text></Pane>

            <Pane>
              <Tooltip content="Edit Candidate" position={Position.BOTTOM}>
                <Button marginY="0.75rem" iconBefore="edit" disabled={!data || error} onClick={() => setVisible(true)}>Edit</Button>
              </Tooltip>
                <Button marginRight="2rem" onClick={() => setShowModal(true)}>Add Adoption</Button>
                <AddAnimalModal showModal={showModal} setShowModal={setShowModal} id={_id}/>
            </Pane>
          </Pane>}
        </Pane>
        <Pane flex="3">
          <Pane marginTop="-8rem" display="flex" flexDirection="column" flex="1" marginX="3rem">
            <Heading size={700}>Description</Heading>
            <Text marginY="1rem" size={500}>Surrender Information</Text>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Reason</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Date</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender By Anial Control</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Submitter</Table.TextCell>
            </Table.Row>
            <Text marginY="1rem" size={500}>Adoption Information</Text>
            <Table.Row isSelectable>
              <Table.TextCell>Adoptoion Date</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Adoption Fee</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Adoption Application Number</Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Other</Table.TextCell>
            </Table.Row>
            <Heading marginTop="2rem" size={500}>Comments</Heading>

            <Pane borderRadius={3} elevation={1} marginY="1rem" padding="2rem" display="flex" flexDirection="row" flex="1">
              <Avatar name="Brian Smith" marginRight="1rem" size={30}/>
              <Pane display="flex" flexDirection="column" flex="1" justifyContent="flex-start">
                { animal && <Pane>
                  <Heading size={400}>Brian Smith</Heading>
                  <Pane><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text></Pane>
                </Pane>}
              </Pane>
            </Pane>

            <Pane borderRadius={3} elevation={1} marginY="1rem" padding="2rem" display="flex" flexDirection="row" flex="1">
              <Avatar name="Ingie" marginRight="1rem" size={30}/>
              <Pane display="flex" flexDirection="column" flex="1" justifyContent="flex-start">
                { animal && <Pane>
                  <Heading size={400}>Ingie</Heading>
                  <Pane><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text></Pane>
                </Pane>}
              </Pane>
            </Pane>

            <Pane marginY="1rem" marginBottom="4rem" display="flex" flexDirection="row" flex="1" justifyContent="center">
              <Text>End of comments</Text>
            </Pane>

          </Pane>
        </Pane>
        <Pane flex="1">
          <Pane marginTop="-8rem" display="flex" flexDirection="column" flex="1">
            <Heading size={600}>Vaccinations</Heading>
            <Text marginY="1rem" size={500}>Last Updated: Tuesday, November 5th, 2019</Text>
            <Table.Row isSelectable>
              <Table.TextCell>No Vaccinations</Table.TextCell>
            </Table.Row>
          </Pane>
        </Pane>
      </Pane>
    </>
  )
}

Profile.propTypes = {
  _id: PropTypes.string
}

export default Profile

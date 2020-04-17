import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Heading, BackButton, Pane, Button, Tooltip, Position, Icon, Link, Badge, Text, Table, Avatar } from 'evergreen-ui'
import Router from 'next/router'
import styled from 'styled-components'
import AddAdoptionModal from './AddAdoptionModal'
import { Context } from './Context'
import AddVaccineModal from './AddVaccineModal'
import VaccineCard from './VaccineCard'
import EditAnimalModal from './EditAnimalModal'


const Container = styled.div`
  max-height: 70vh;
`

const VaccineColumn = styled.div`
  max-height: 70vh;
  overflow: auto;
  
`

const Profile = (props) => {
  const { _id } = props
  const [animal, setAnimal] = useState(null)
  const [vaccines, setVaccines] = useState([])
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [showModalVacc, setShowModalVacc] = useState(false)
  const [loading, setLoading] = useState(true)

  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)
  const data = null

  const animalInfo = async () => {
    const response = await fetch(`http://localhost:4000/animal/${_id}`, { method: 'get' })
    const result = await response.json()
    setAnimal(result)
  }

  const vaccineList = async () => {
    const response = await fetch(`http://localhost:4000/animal/${_id}/vaccines`, { method: 'get' })
    const result = await response.json()
    setLoading(false)
    setVaccines(result)
  }

  useEffect(() => {
    animalInfo()
    vaccineList()
  }, [])

  return (
    <>
    <Container>
      <Pane display="flex" flex="1" flexDirection="row">
        <BackButton intent="none" height={40} onClick={() => Router.back() }/>
      </Pane>
      { animal &&
      <Pane display="flex" flex="1" flexDirection="row" marginTop="2rem">
        <Heading size={800}>{animal.name} </Heading>
        <Avatar src={animal.species == 'Dog' ? '/static/dog-face.png' : '/static/cat-face.png'} name={animal.species} size={40} marginY={'-0.5rem'} marginLeft={'1rem'}/>
      </Pane> }
      <Pane display="flex" flex="1" flexDirection="row">
        <Pane flex="1">
          {animal && <Pane display="flex" flexDirection="column" flex="1">
            <Pane marginY="0.75rem">
              { (animal.adoptability == 'Ready' || animal.adoptability == 'Adopted') && <Badge marginLeft={'1rem'} marginY="0.5rem" color={animal.adoptability == 'Adopted' ? 'green' : 'blue'}>{animal.adoptability}</Badge> }
              { (animal.adoptability == 'Pending' || animal.adoptability == null) && <Badge marginLeft={'1rem'} marginY="0.5rem" color='blue'>Pending</Badge> }
            </Pane>
            <Pane marginY="0.75rem"><Icon icon="circle" color="#425A70" marginY='-0.2rem' marginRight="1rem"/><Text size={500}>{animal.sex}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="git-merge" color="#425A70" marginRight="1rem"/><Text size={500}>{animal.breeds}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="calendar" color="#425A70" marginY='-0.3rem' marginRight="1rem"/><Text size={500}>Age: {(animal.age/12).toFixed(1)}</Text></Pane>
            <Pane marginY="0.75rem"><Icon icon="barcode" color="#425A70" marginY='-0.3rem' marginRight="1rem"/><Text size={500}>{animal.microchipId == '' ? 'None' : animal.microchipId}</Text></Pane>

            <Pane>
              <Tooltip content="Editing is restricted after Adoption" position={Position.TOP} isShown={animal.adoptability == 'Adopted' ? null : false}>
                <Button marginRight="2rem" marginY="2rem" disabled={animal.adoptability == 'Adopted'} onClick={() => { setEditVisible(true) }}>Edit Animal</Button>
              </Tooltip>
              <Button marginRight="2rem" marginY="2rem" disabled={userType == 'Volunteer' || animal.adoptability == 'Pending' || animal.adoptability == 'Adopted'} onClick={() => setShowModal(true)}>Add Adoption</Button>
              <EditAnimalModal animal={animal} visible={editVisible} setVisible={setEditVisible}/>
              <AddAdoptionModal showModal={showModal} setShowModal={setShowModal} id={_id}/>
            </Pane>
          </Pane>}
        </Pane>
        {animal && <Pane flex="3">
          <Pane marginTop="-8rem" display="flex" flexDirection="column" flex="1" marginX="3rem">
            <Heading size={700}>Animal Details</Heading>
            <Text marginY="1rem" size={500}>Surrender Information</Text>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Reason: <b>{animal.surrenderReason == null ? 'None' : animal.surrenderReason}</b></Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Date: <b>{animal.surrenderDate == null ? 'None' : animal.surrenderDate}</b></Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender By Animal Control: <b>{animal.surrenderByAnimalControl == '1' ? 'Yes' : 'No'}</b></Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Surrender Submitter: <b>{animal.surrenderSubmitter == null ? 'None' : animal.surrenderSubmitter}</b></Table.TextCell>
            </Table.Row>
            <Text marginY="1rem" size={500}>Adoption Information</Text>
            <Table.Row isSelectable>
              <Table.TextCell>Adoption Date: <b>{animal.adoptionDate == null ? 'None' : animal.adoptionDate}</b></Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Adoption Fee: <b>{animal.adoptionFee == null ? 'None' : animal.adoptionFee}</b></Table.TextCell>
            </Table.Row>
            <Table.Row isSelectable>
              <Table.TextCell>Adoption Application Number: <b>{animal.adoptionApplicationNumber == null ? 'None' : animal.adoptionApplicationNumber}</b></Table.TextCell>
            </Table.Row>
            <Heading marginTop="2rem" size={500}>Animal Description</Heading>

            <Pane borderRadius={3} elevation={1} marginY="1rem" padding="2rem" display="flex" flexDirection="row" flex="1">
              <Pane display="flex" flexDirection="column" flex="1" justifyContent="flex-start">
                { animal && <Pane>
                  <Pane><Text>{animal.description}</Text></Pane>
                </Pane>}
              </Pane>
            </Pane>

          </Pane>
        </Pane>}
        
        <Pane flex="1">
        
          <Pane marginTop="-8rem" display="flex" flexDirection="column" flex="1">
            <Pane display="flex" flexDirection="row">
              <Heading size={600}>Vaccinations</Heading>
              {animal &&
             <Pane>
               <Tooltip content="Can't Add Vaccine if Adopted" position={Position.TOP} isShown={animal.adoptability == 'Adopted' ? null : false}>
                <Button marginLeft="2rem" marginY="-.3rem" appearance="minimal" disabled={animal.adoptability == 'Adopted'} onClick={() => setShowModalVacc(true)}>Add Vaccine</Button>
              </Tooltip> 
              <AddVaccineModal showModal={showModalVacc} setShowModal={setShowModalVacc} id={_id} species={animal.species}/>
            </Pane>
            }
            </Pane>
            <Text marginY="1rem" size={500}>Last Updated: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            <VaccineColumn>
            {
              vaccines.map((vaccines, index) => {
                return <VaccineCard index={index} data={vaccines}/>
              })
            }
            </VaccineColumn>
          </Pane>
          
        </Pane>
        
      </Pane>
      </Container>

    </>
  )
}

Profile.propTypes = {
  _id: PropTypes.string
}

export default Profile

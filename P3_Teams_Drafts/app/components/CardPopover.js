import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Menu, Position, Pane, Popover, IconButton, Strong, toaster } from 'evergreen-ui'
import Link from 'next/link'
import { Context } from './Context'
import EditAnimalModal from './EditAnimalModal'

const CardPopover = (props) => {
  const { animal } = props

  const [editVisible, setEditVisible] = useState(false)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  let [showSex, setShowSex] = useState(false)
  let [showMicroID, setShowMicroID] = useState(false)
  let [showAlteration, setShowAlteration] = useState(false)
  let [showBreed, setShowBreed] = useState(false)


  useEffect(() => {
    if(animal.sex == 'Unknown') setShowSex(true)
    if(animal.microchipId == '' || animal.microchipId == null) setShowMicroID(true)
    if(animal.alterationStatus == 'false' || animal.alterationStatus == '') setShowAlteration(true)
    if(animal.breeds == 'Mixed' || animal.breeds == 'Unknown') setShowBreed(true)
  }, [])

  function showEdit(){
    if(showSex || showMicroID || showAlteration || showBreed){
      return true
    }else{
      return false
    }
  }

  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              { showEdit() && 
              <Menu.Item onSelect={() => { setEditVisible(true) }} icon="edit" intent="none">Edit <Strong>{animal.name}</Strong>...</Menu.Item>
              }
              <Link href="/animal/[id]" as={`/animal/${animal.petId}`}><Menu.Item icon="person" intent="none">View Details...</Menu.Item></Link>
            </Menu.Group>
          </Menu>
        }
      >
        <IconButton appearance="minimal" icon="more" iconSize={10} />
      </Popover>
        <EditAnimalModal animal={animal} visible={editVisible} setVisible={setEditVisible}/>
    </Pane>
  )
}

CardPopover.propTypes = {
  candidate: PropTypes.object,
  flink: PropTypes.string,
  blink: PropTypes.string
}

export default CardPopover

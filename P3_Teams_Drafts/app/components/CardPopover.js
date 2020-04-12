import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Menu, Position, Pane, Popover, IconButton, Strong, toaster } from 'evergreen-ui'
import Link from 'next/link'
import { Context } from './Context'


const CardPopover = (props) => {
  const { animal } = props

  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)


  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={() => { setEditVisible(true) }} icon="edit" intent="none">Edit <Strong>{animal.name}</Strong>...</Menu.Item>
              <Link href="/animal/[id]" as={`/animal/${animal.petId}`}><Menu.Item icon="person" intent="none">View Details...</Menu.Item></Link>
            </Menu.Group>
          </Menu>
        }
      >
        <IconButton appearance="minimal" icon="more" iconSize={10} />
      </Popover>
    </Pane>
  )
}

CardPopover.propTypes = {
  candidate: PropTypes.object,
  flink: PropTypes.string,
  blink: PropTypes.string
}

export default CardPopover

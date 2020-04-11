import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, Position, Pane, Popover, IconButton, Strong, toaster } from 'evergreen-ui'
import Link from 'next/link'

const CardPopover = (props) => {
  const { animal } = props

  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

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
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item onSelect={() => { setDeleteVisible(true) }} icon="trash" intent="danger">Delete...</Menu.Item>
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

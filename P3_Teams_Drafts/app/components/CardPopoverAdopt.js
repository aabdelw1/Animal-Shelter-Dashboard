import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Menu, Position, Pane, Popover, IconButton, Strong, toaster } from 'evergreen-ui'
import Link from 'next/link'
import { Context } from './Context'
import { useRouter, Router } from 'next/router'


const CardPopoverAdopt = (props) => {
  const { adoption } = props
  const router = useRouter()

  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [userType, setUserType, species, setSpecies, adoptionStatus, setAdoptionStatus] = useContext(Context)

  function ApproveAdoption() {
    const requestOptions = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`http://localhost:4000/adoptionApplicationApprove/${adoption.applicationNumber}`, requestOptions)
          .then((result) => {
                if (result.status != "200"){
                    toaster.warning('Error :(')
                }else{
                    toaster.success('Successfully approved the adoption application');
                  }
                })
    router.push('/animalDashboard');
  }

  function RejectAdoption() {
    const requestOptions = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`http://localhost:4000/adoptionApplicationReject/${adoption.applicationNumber}`, requestOptions)
          .then((result) => {
                if (result.status != "200"){
                    toaster.warning('Error :(')
                }else{
                    toaster.success('Successfully rejected the adoption application');
                  }
                })
    router.push('/animalDashboard');
    
  }




  return (
    <Pane>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
                <Menu.Item onSelect={() => { ApproveAdoption() }} intent="success" icon="tick-circle">Approve Application</Menu.Item>
                <Menu.Item onSelect={() => { RejectAdoption() }} intent="danger" icon="cross">Reject Application</Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <IconButton appearance="minimal" icon="more" iconSize={10} />
      </Popover>
    </Pane>
  )
}

CardPopoverAdopt.propTypes = {
  candidate: PropTypes.object,
  flink: PropTypes.string,
  blink: PropTypes.string
}

export default CardPopoverAdopt

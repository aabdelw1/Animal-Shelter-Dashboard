import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Badge, Pane, Avatar, Text } from 'evergreen-ui'
import CardPopoverAdopt from './CardPopoverAdopt'
import Head from 'next/head'

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const VaccineCard = (props) => {
  const { data } = props
  const { type, number, dateAdministered, expDate, submitter } = data
  const [visible, setVisible] = useState(false)

  return (
    <Pane border="default" marginBottom="1rem" display="flex" justifyContent='space-between' flexDirection="row" borderRadius={6} hoverElevation={1} width="70%">
      <Pane display="flex" flexDirection="row" paddingY="0.5rem" margin="1rem">
        <Pane marginY="auto">
          <Pane display="flex" flexDirection="row">
            {/* <Heading size={600} marginLeft=".5rem" color={sex == 'Male' ? '#1070CA' : '#735DD0'}>{name}</Heading> */}
            <Heading size={600}>{type}</Heading>
          </Pane>
          <Pane><Text size={300} marginLeft=".5rem">{'Vacc # : '} <b>{(number == null ? 'None' : number)}</b></Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem">{'Date admin: '} <b>{dateAdministered.split('T')[0]}</b></Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem">{'Ex Date: '} <b>{expDate.split('T')[0]}</b></Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem">{'Submitter: '} <b>{submitter}</b></Text></Pane>
        </Pane>
      </Pane>
    </Pane>
  )
}

VaccineCard.propTypes = {
  meeting: PropTypes.object
}

export default VaccineCard

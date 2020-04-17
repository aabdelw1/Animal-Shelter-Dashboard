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

  const stringDate = function (date) {
    const year = date.split('T')[0].split('-')[0]
    const month = months[Number(date.split('T')[0].split('-')[1])-1]
    const day = date.split('T')[0].split('-')[2]

    return `${month} ${day}, ${year}`
  }
  
  return (
    <Pane border="default" marginBottom="1rem" display="flex" justifyContent='space-between' flexDirection="row" borderRadius={6} hoverElevation={1}>
      <Pane display="flex" flexDirection="row" margin="1rem">
        <Pane>
          <Pane display="flex" paddingY="0.5rem">
            <Heading size={500}>{type}</Heading>
          </Pane>
          <Pane><Text size={300} marginLeft=".5rem"> <b>{'Vacc # : '}</b>{(number == null ? 'None' : number)}</Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem"><b>{'Date admin: '}</b> {stringDate(dateAdministered)}</Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem"><b>{'Ex Date: '} </b>{stringDate(expDate)}</Text></Pane>
          <Pane><Text size={300} marginLeft=".5rem"><b>{'Submitter: '}</b> {submitter}</Text></Pane>
        </Pane>
      </Pane>
    </Pane>
  )
}

VaccineCard.propTypes = {
  meeting: PropTypes.object
}

export default VaccineCard

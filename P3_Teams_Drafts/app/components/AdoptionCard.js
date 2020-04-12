import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Badge, Pane, Avatar, Text } from 'evergreen-ui'
import CardPopoverAdopt from './CardPopoverAdopt'
import Head from 'next/head'

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const AdoptionCard = (props) => {
  const { data } = props
  const { applicationNumber, applicantFirstName, applicantLastName, street, city, state, zipCode, phoneNumber, emailAddress,  coApplicantFirstName, coApplicantLastName } = data
  const [visible, setVisible] = useState(false)

  return (
    <Pane border="default" marginBottom="2rem" display="flex" margin="1rem" justifyContent='space-between' flexDirection="row" borderRadius={6} hoverElevation={1} width="65%">
      <Pane display="flex" flexDirection="row" paddingY="0.5rem" margin="1rem">
        <Pane marginY="auto">
          <Pane display="flex" flexDirection="row">
            {/* <Heading size={600} marginLeft=".5rem" color={sex == 'Male' ? '#1070CA' : '#735DD0'}>{name}</Heading> */}
            <Heading size={600}>{applicantFirstName + " " + applicantLastName + " #" + applicationNumber}</Heading>
          </Pane>
        <Pane><Text size={300} marginLeft=".5rem">{street} - {city}, {state}, {zipCode} - {phoneNumber} - {emailAddress}</Text></Pane>
        </Pane>
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Pane marginY='0.1rem' marginRight='0.5rem'>
          <CardPopoverAdopt adoption={data}/>
        </Pane>
      </Pane>
    </Pane>
  )
}

AdoptionCard.propTypes = {
  meeting: PropTypes.object
}

export default AdoptionCard
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Badge, Pane, Avatar, Text } from 'evergreen-ui'
import CardPopover from './CardPopover'

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const AnimalCard = (props) => {
  const { data } = props
  const { petId, name, species, breeds, sex, alterationStatus, age, adoptability, microchipId } = data
  const [visible, setVisible] = useState(false)

  return (
    <Pane border="default" marginBottom="2rem" display="flex" margin="1rem" justifyContent='space-between' flexDirection="row" borderRadius={6} hoverElevation={1}>
      <Pane display="flex" flexDirection="row" paddingY="0.5rem" margin="1rem">
        <Avatar src={species == 'Dog' ? '/static/dog-face.png' : '/static/cat-face.png'} name={species} size={40} marginRight={'1rem'} marginLeft={'1rem'}/>
        <Pane marginY="auto">
          <Pane display="flex" flexDirection="row">
            {/* <Heading size={600} marginLeft=".5rem" color={sex == 'Male' ? '#1070CA' : '#735DD0'}>{name}</Heading> */}
            <Heading size={600}>{name}</Heading>
            { (adoptability == 'Adopted' || adoptability == 'Ready') && <Badge marginLeft={'1rem'} marginY="0.5rem" color={adoptability == 'Adopted' ? 'purple' : 'green'}>{adoptability}</Badge> }
            { (adoptability == 'Pending' || adoptability == null) && <Badge marginLeft={'1rem'} marginY="0.5rem" color='blue'>Pending</Badge> }
          </Pane>
          <Pane><Text size={300}>{ breeds } - {(age/12).toFixed(1)}</Text></Pane>
        </Pane>
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Pane display="flex" flexDirection="column" marginRight={'2rem'} marginY='auto' textAlign="right">
          {/* <Text size={500}>Sex:</Text> */}
          { (sex == 'Male' || sex == 'Female') && <Text marginLeft=".5rem" size={500} fontWeight='bold'color={sex == 'Male' ? '#1070CA' : '#735DD0'}> {sex}</Text> }
          { sex == 'Unknown' && <Text marginLeft=".5rem" size={500} fontWeight='bold'color={'neutral'}> {sex}</Text> }
          <Pane><Text size={300} marginLeft=".5rem">{alterationStatus == '1' ? ( sex == 'Female' ? 'Spayed' : 'Neutured') : 'Not Altered'} </Text></Pane>

        </Pane>
        
        <Pane marginY='0.1rem' marginRight='0.5rem'>
          <CardPopover animal={data}/>
        </Pane>
      </Pane>
    </Pane>
  )
}

AnimalCard.propTypes = {
  meeting: PropTypes.object
}

export default AnimalCard

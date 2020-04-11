import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import Profile from './Profile'

const AnimalDetails = (props) => {
  const { id } = props
  return (
    <Pane>
      { id && <Profile _id={id}/> }
    </Pane>
  )
}

AnimalDetails.PropTypes = {
  id: PropTypes.number
}

export default AnimalDetails
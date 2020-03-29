import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Pane, Text, Icon, Spinner } from 'evergreen-ui'
import { Context } from './Context'

const _ = require('lodash')

const ColumnContainer = styled.div`
  flex: 1;
  background-color: #fafafa;
  border-radius: .5rem;
  margin-right: 1rem;
  :last-of-type {
    margin-right: 0;
  }
  overflow: auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
`

const AnimalDashboardColumn = (props) => {
  const { stage, data, error, loading, columnIndex } = props
  let data2 = ''

  const Species = 'Dog'
  let targetUrl = ''

  const [adActiveIndex, setAdActiveIndex] = useState(null)
  const [, setAD,,,,,,, specialty] = useContext(Context)

  if (stage === 'Animals') {
    targetUrl = 'http://localhost:4000/animals'
  } else if (stage === 'Breed') {
    targetUrl = `http://localhost:4000/breeds/${Species}`
  } else if (stage === 'Vaccines') {
    targetUrl = ''
  }

  data2 = fetch(targetUrl, { method: 'get' }).then(res => res.json()).then(json => console.log(json))

  console.log("this is data2,", data2)



  return (
    <ColumnContainer>
      <Pane display="flex" flexDirection="row" marginTop="1rem">
        <Text marginLeft="1rem" size={500} color="muted">{stage}</Text>
        <Text marginLeft=".5rem" fontWeight="bold" size={400}>{data && data.length}</Text>
      </Pane>
      { loading &&
        <Pane>
          <Spinner margin="auto" marginTop="2rem"/>
        </Pane>
      }
      { error &&
        <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Pane><Icon size="20" marginX="auto" marginTop="2rem" icon="warning-sign" color="muted"/></Pane>
          <Pane><Text color="muted">Error</Text></Pane>
        </Pane>
      }
    </ColumnContainer>
  )
}

AnimalDashboardColumn.propTypes = {
  stage: PropTypes.string,
  search: PropTypes.string,
  role: PropTypes.string,
  location: PropTypes.string,
  sort: PropTypes.string,
  count: PropTypes.number,
  data: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
  columnIndex: PropTypes.number,
  smes: PropTypes.array,
  clickedSME: PropTypes.any,
  activeAD: PropTypes.any,
  setActiveAD: PropTypes.any
}

export default AnimalDashboardColumn

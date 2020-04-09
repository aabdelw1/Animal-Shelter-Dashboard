import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Pane, Text, Icon, Spinner, Table } from 'evergreen-ui'
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
  const [searchQuery, setSearchQuery] = useState(null)
  const [, setAD,,,,,,, specialty] = useContext(Context)

  if (stage === 'Animals') {
    targetUrl = 'http://localhost:4000/animals'
  } else if (stage === 'Breed') {
    targetUrl = `http://localhost:4000/breeds/${Species}`
  } else if (stage === 'Vaccines') {
    targetUrl = ''
  }
  //data2 = fetch(targetUrl, { method: 'get' }).then(res => res.json()).then(json => console.log(json))

  //console.log("this is data2,", data2)

  return (
    <ColumnContainer>
      <Pane display="flex" flexDirection="row" marginTop="1rem">
        <Text marginLeft="1rem" size={500} color="muted">{stage}</Text>
      </Pane>

      <Table>
        <Table.Head>
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Species</Table.TextHeaderCell>
              <Table.TextHeaderCell>Breeds</Table.TextHeaderCell>
              <Table.TextHeaderCell>Sex</Table.TextHeaderCell>
              <Table.TextHeaderCell>Alteration Status</Table.TextHeaderCell>
              <Table.TextHeaderCell>Age</Table.TextHeaderCell>
              <Table.TextHeaderCell>Adoptability</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {data.map(animal => (
            <Table.Row key={animal.petId} isSelectable onSelect={() => alert("This will lead to animal detail: ")}>
              <Table.TextCell>{animal.name}</Table.TextCell>
              <Table.TextCell>{animal.species}</Table.TextCell>
              <Table.TextCell>{animal.breeds}</Table.TextCell>
              <Table.TextCell>{animal.sex}</Table.TextCell>
              <Table.TextCell>{animal.alterationStatus}</Table.TextCell>
              <Table.TextCell isNumber>{animal.age}</Table.TextCell>
              <Table.TextCell>{animal.adoptability}</Table.TextCell>
            </Table.Row>
            ))}
        </Table.Body>
      </Table>
 
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

import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Pane, Text, Icon, Spinner, Table, Popover, Menu, Position } from 'evergreen-ui'
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
  const { stage, data, error, columnIndex } = props
  let data2 = ''

  const Species = 'Dog'
  let targetUrl = ''

  const [filteredSpecies, setFilteredSpecies] = useState("");
  const [filteredAdopt, setFilteredAdopt] = useState("");

  const [adActiveIndex, setAdActiveIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState(null)
  const [, setAD,,,,,,, specialty] = useContext(Context)
  const [species, setSpecies] = useState("")
  const [speciesList, getSpecies] = useState([{ label: "Loading ...", value: ""}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    async function getSpeciesAPI() {
      const response = await fetch(`http://localhost:4000/species`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        var newList = []
        for(var x = 0; x<result.length;x++){
            newList[x] = result[x].name
        }
        let list = newList.map(name => {return {label: name, value: name}});
        getSpecies(list);
        setLoading(false);
      }
    }
    getSpeciesAPI();

    if (localStorage.getItem('filterSpecies')) {
      setFilteredSpecies(localStorage.getItem('filterSpecies'));
    }
    if(localStorage.getItem('filterAdopt')){
      setFilteredAdopt(localStorage.getItem('filterAdopt'));
    }
    return () => {
      unmounted = true;
    };


  });

  function filterVal(data){
    if(filteredSpecies || filteredAdopt){
      return data.filter((row) => (row.species === filteredSpecies && row.adoptability === filteredAdopt))
    }else{
      return data
    }
  }



  function renderRow ({ animal }) {
    return (
      <Table.Row key={animal.petId} isSelectable onSelect={() => alert("This will lead to animal detail: ")}>
        <Table.TextCell>{animal.name}</Table.TextCell>
        <Table.TextCell>{animal.species}</Table.TextCell>
        <Table.TextCell>{animal.breeds}</Table.TextCell>
        <Table.TextCell>{animal.sex}</Table.TextCell>
        <Table.TextCell>{animal.alterationStatus}</Table.TextCell>
        <Table.TextCell isNumber>{animal.age}</Table.TextCell>
        <Table.TextCell>{animal.adoptability}</Table.TextCell>
      </Table.Row>
    )
  }

  return (
    <ColumnContainer>
      <Pane display="flex" flexDirection="row" marginTop="1rem">
        <Text marginLeft="1rem" size={500} color="muted">{stage}</Text>
      </Pane>
      <Table>
        <Table.Head>
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Breeds</Table.TextHeaderCell>
              <Table.TextHeaderCell>Species</Table.TextHeaderCell>
              <Table.TextHeaderCell>Sex</Table.TextHeaderCell>
              <Table.TextHeaderCell>Alteration Status</Table.TextHeaderCell>
              <Table.TextHeaderCell>Age</Table.TextHeaderCell>
              <Table.TextHeaderCell>Adoptability</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body >
          {filterVal(data).map(animal => (renderRow({ animal: animal })))}
        </Table.Body >
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
  columnIndex: PropTypes.number,
  smes: PropTypes.array,
  clickedSME: PropTypes.any,
  activeAD: PropTypes.any,
  setActiveAD: PropTypes.any
}

export default AnimalDashboardColumn

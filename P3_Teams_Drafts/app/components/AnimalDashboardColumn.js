import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Pane, Text, Icon, Spinner, Table, Popover, Menu, Position } from 'evergreen-ui'
import { Context } from './Context'
import AnimalCard from './AnimalCard'
import AdoptionCard from './AdoptionCard'

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
  const { label, loading, data } = props
  const [userType,, species,, adoptionStatus,] = useContext(Context)

  return (
    <ColumnContainer>
      <Pane display="flex" flexDirection="row" marginTop="1rem">
        <Text marginLeft="1rem" size={400} color="muted">{label}</Text>
        <Text marginLeft=".5rem" fontWeight="bold" size={400}>{data && data.length}</Text>
      </Pane>
      { loading &&
        <Pane>
          <Spinner margin="auto" marginTop="2rem"/>
        </Pane>
      }
      { !loading && !data &&
        <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Pane><Icon size="20" marginX="auto" marginTop="2rem" icon="warning-sign" color="muted"/></Pane>
          <Pane><Text color="muted">Error</Text></Pane>
        </Pane>
      }
      {
        label == 'Animals' &&
        data.map((animal, index) => { 
          if((species === 'All' || animal.species === species) && (adoptionStatus === 'All' || animal.adoptability === adoptionStatus)) {
            return <AnimalCard index={index} data={animal}/>
          }
        })
      }   
      { label == 'Adoptions' &&
        data.map((pendingAdoptions, index) => { 
            if(userType == 'Admin') return <AdoptionCard index={index} data={pendingAdoptions}/>
        })
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
  columnIndex: PropTypes.number,
  smes: PropTypes.array,
  clickedSME: PropTypes.any,
  activeAD: PropTypes.any,
  setActiveAD: PropTypes.any
}

export default AnimalDashboardColumn

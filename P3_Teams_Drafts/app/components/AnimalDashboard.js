import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toaster } from 'evergreen-ui'
import { Query } from 'react-apollo'
import { Context } from './Context'
import { useRouter } from 'next/router'
import AnimalDashboardColumn from './AnimalDashboardColumn'

import Queries from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
const Categories = ['Animals ']

const SchedulerContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 70vh;
  max-height: 70vh;

`

const AnimalDashboard = (props) => {
  const { setScheduleButton } = props
  const [,,, setSmes] = useContext(Context)
  const [animals, getAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    async function getAnimalsAPI() {
      const response = await fetch(`http://localhost:4000/animals`, {method: 'get'});
      const result = await response.json();
      if (!unmounted) {
        //var newList = []
        //for(var x = 0; x<result.length;x++){
        //    newList[x] = result[x]
        //}
        // let list = newList.map(name => {return {label: name, value: name}});
        getAnimals(result);
        setLoading(false);
      }
    }
    getAnimalsAPI();

    return () => {
      unmounted = true;
    };
  });


  // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  // var targetUrl = 'http://localhost:4000/animals'
  // fetch(targetUrl)
  //   .then(res => {
  //     res.json()
  //     console.log(blob)
  //   })
  //   .then(data => {
  //     console.table(data)
  //     document.querySelector('pre').innerHTML = JSON.stringify(data, null, 2)
  //     return data
  //   })
  //   .catch(e => {
  //     console.log(e)
  //     return e
    // })

    
    return (
        <SchedulerContainer>
          {
            Categories.map((role, index) => {
              return <AnimalDashboardColumn key={index} columnIndex={index} stage={role} data={animals}
              />
            })
          }
        </SchedulerContainer>
      )
}

AnimalDashboard.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default AnimalDashboard

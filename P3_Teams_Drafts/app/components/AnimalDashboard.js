import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { toaster } from 'evergreen-ui'
import { Query } from 'react-apollo'
import { Context } from './Context'
import AnimalDashboardColumn from './AnimalDashboardColumn'

import Queries from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
const Categories = ['Animals ', 'Breeds', 'Vaccines']

const SchedulerContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 70vh;
  max-height: 70vh;

`

const AnimalDashboard = (props) => {
  const { setScheduleButton } = props
  const [,,, setSmes] = useContext(Context)

  var targetUrl = 'http://localhost:4000/animals'
  fetch(targetUrl, { method: 'get' }).then(res => res.json()).then(json => console.log(json))

  // const { loading, error, data } = useQuery(Queries.ALL_ANIMALS)

  // if (data) {
  //   data.map((animal, index) => {
  //     console.log(animal)
  //   })
  // }

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
  //   })

  return (
    <SchedulerContainer>
      <Query query={Queries.ALL_ANIMALS}>
        {({ data, error, loading }) => {
          if (error) {
            toaster.danger(
              'Something went wrong when fetching the Animals', {
                id: 'animalDashboard',
                description: 'Check your network connection or try again later.'
              })
          }
          return (
            Categories.map((role, index) => {
              return <AnimalDashboardColumn key={index} columnIndex={index} stage={role}
                data={data && data.filter((c) => { return c.role === role })}
                error={error} loading={loading}

              />
            })
          )
        }}
      </Query>
    </SchedulerContainer>
  )
}

AnimalDashboard.propTypes = {
  setScheduleButton: PropTypes.any,
  setSmes: PropTypes.func
}

export default AnimalDashboard

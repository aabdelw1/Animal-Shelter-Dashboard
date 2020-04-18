import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Heading, Pane, Text, TextInput, Button, toaster } from 'evergreen-ui'
import { Context } from './Context'

const Home = () => {
  const router = useRouter()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [, setUserType] = useContext(Context)

  function login (event) {
    const data = username
    fetch(`http://localhost:4000/login?username=${data}`, {
      method: 'get'
    }).then((Response) => Response.json())
      .then((result) => {
        if (result[0].password != password || result == 'User not found') {
          toaster.warning('Seems like you entered wrong username/password, please enter again')
        } else {
          localStorage.setItem('UserName', username)
          localStorage.setItem('isLoggedin', true)
          localStorage.setItem('userType', result[0].userType)
          setUserType(result[0].userType)
          toaster.success('Successfully signed in')
          router.push('/animalDashboard')
        }
      })
  }

  return <>
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
      borderRadius={10}
      padding={30}
      maxWidth={500}
      margin="auto"
      marginY="10%"
      elevation={4}
    >
      <Heading size={900} marginBottom="1rem"> Ingie's Animal Shelter</Heading>
      <Heading size={700} marginBottom="default">User Log-In</Heading>

      <Pane display="flex" flexDirection="row" marginY="1.5rem">
        <Heading size={500} marginY="0.5rem" marginRight="1rem">User Name</Heading>
        <TextInput
          autoFocus
          label=""
          width={250}
          marginRight="2rem"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          // onChange={e => setUsername(e.target.value)}
        />
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Heading size={500} marginY="0.5rem" marginRight="2rem">Password</Heading>
        <TextInput
          autoFocus
          label=""
          width={250}
          marginRight="2rem"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </Pane>
      <Pane marginY="1.5rem" alignItems="center"
        justifyContent="center" display="flex" flexDirection="column">
        <Button appearance="primary" onClick={login} disabled={!(username && password)} type="submit">Log In</Button></Pane>
    </Pane>
  </>
}

export default Home

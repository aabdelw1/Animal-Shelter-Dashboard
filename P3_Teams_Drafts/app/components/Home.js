import React, { useState } from 'react'
import { Heading, Pane, Text, TextInput, Button } from 'evergreen-ui'

const Home = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  var targetUrl = 'http://localhost:4000/animals'
  fetch(targetUrl, { method: 'get' }).then(res => res.json()).then(animals => console.log(animals))

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
        />
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Heading size={500} marginY="0.5rem" marginRight="2rem">Password</Heading>
        <TextInput
          autoFocus
          label=""
          width={250}
          marginRight="2rem"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Pane>
      <Pane marginY="1.5rem" alignItems="center"
        justifyContent="center" display="flex" flexDirection="column">
        <Button appearance="primary" disabled={username && password ? false : true}>Log In</Button></Pane>
    </Pane>

  </>
}

export default Home

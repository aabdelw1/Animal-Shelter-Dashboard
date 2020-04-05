import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Heading, Pane, Text, TextInput, Button, toaster } from 'evergreen-ui'
import { Context } from './Context'

const Home = () => {
      const router = useRouter()
      const [username, setUsername] = useState(null)
      const [password, setPassword] = useState(null)
      const [, setIsOwner, isVolunteer, setIsVolunteer,, setIsEmployee] = useContext(Context)



      function login(event) {
          const data = username
          fetch(`http://localhost:4000/login?username=${data}`, {
              method: 'get'
          }).then((Response) => Response.json())
            .then((result) => {
                  if (result.password != password){
                      toaster.warning('Seems like you entered wrong username/password, please enter again')
                  }else{
                    fetch(`http://localhost:4000/user/${data}`, {
                      method: 'get'
                      }).then((Response) => Response.json())
                        .then((result) => {
                          if(result.isAdmin){
                            setIsOwner(true);
                            setIsEmployee(true);
                          }else{
                            setIsVolunteer(true);
                          }
                          localStorage.setItem('UserName', username);
                          localStorage.setItem('isLoggedin', true);
                          toaster.success('Successfully signed in')
                          router.push('/animalDashboard');
                      })
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
            //onChange={e => setUsername(e.target.value)}
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
            placeholder="Enter Password"
          />
        </Pane>
        <Pane marginY="1.5rem" alignItems="center"
          justifyContent="center" display="flex" flexDirection="column">
          <Button appearance="primary" onClick={login} disabled={username && password ? false : true} type="submit">Log In</Button></Pane>
      </Pane>
    </>
}

export default Home

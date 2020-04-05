import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Text, Avatar, Tooltip, Pane, Heading, Button, toaster } from 'evergreen-ui'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 .5rem rgba(35, 67, 97, 0.5);
  padding: 0.4rem 0;
`

const StyledUl = styled.ul`
  display: flex;
  margin-right: 1rem;
`

const StyledLi = styled.li`
  display: flex;
  margin: auto 2.5rem;
  margin-left: 0;
  a {
    text-decoration: none;
  }
  :nth-child(1) {
    margin-left: 0;
    margin-right: 0.75rem;
  }
`

const Logo = styled.div`
  border-radius: .75rem;
  height: 3rem;
  width: 3rem;
  background-color: #f1f1f1;
  border: 3px dashed rgba(35, 67, 97, 0.5);
`

const RouteList = [
  {
    title: 'Ingie\'s Animal Shelter',
    href: '/',
    default: true
  }, {
    title: 'Animal Dashboard',
    href: '/animalDashboard'
  }, {
    title: 'Adoptions'
  }, {
    title: 'Users'
  }
]

const RouteListSignedOut = [
  {
    title: 'Ingie\'s Animal Shelter',
    href: '/',
    default: true
  }, {
    title: 'Animal Dashboard'
  }, {
    title: 'Adoptions'
  }, {
    title: 'Users'
  }
]

const Nav = () => {
  const [loggedin, setLoggedin] = useState(null);
  const router = useRouter();

  
  useEffect (() => {
    if (localStorage.getItem('isLoggedin')) {
      setLoggedin(true);
    }else {
      setLoggedin(false);
    }
  });

  function logout() {
    toaster.success('Successfully signed out')
    localStorage.clear();
    router.push('/');
  }

  return (
    <StyledNav>
      <StyledUl>
        <StyledLi>
          <Pane marginY="auto">
            <img height="30" src="/static/puppy2.png" />
          </Pane>
        </StyledLi>
        {
          loggedin ?
            RouteList.map((r, index) => {
              return (
                <StyledLi key={index}>
                  <Link href={r.href}>
                    <Pane marginY="auto" cursor="pointer">
                      {r.default ? <Heading size={600} color={r.href === router.pathname ? '#234361' : 'rgba(35, 67, 97, 0.65)' }>{r.title}</Heading> : <Heading color={r.href === router.pathname ? '#234361' : 'rgba(35, 67, 97, 0.65)' } size={500}>{r.title}</Heading>}
                    </Pane>
                  </Link>
                </StyledLi>
              )
            })
            :
            RouteListSignedOut.map((r, index) => {
              return (
                <StyledLi key={index}>
                  <Link href={r.href}>
                    <Pane marginY="auto" cursor="pointer">
                      {r.default ? <Heading size={600} color={r.href === router.pathname ? '#234361' : 'rgba(35, 67, 97, 0.65)' }>{r.title}</Heading> : <Heading color={r.href === router.pathname ? '#234361' : 'rgba(35, 67, 97, 0.65)' } size={500}>{r.title}</Heading>}
                    </Pane>
                  </Link>
                </StyledLi>
              )
            })
          }
      </StyledUl>

      { loggedin ?
        <Pane display="flex" flexDirection="row">
          <Pane marginY="auto" marginRight="1rem">
            <Text>{localStorage.getItem('UserName')}</Text>
          </Pane>
          <Tooltip content={"Signed in as " + localStorage.getItem('UserName')}>
            <Avatar
              src=""
              name={localStorage.getItem('UserName')}
              size={35}
              marginY="auto"
              marginRight="2rem"/>
          </Tooltip>
          <Pane marginY="auto" marginRight="1rem">
            <Button appearance="primary" onClick={logout} type="submit">Log out</Button>
          </Pane>
        </Pane>
        :
        <Pane display="flex" flexDirection="row">
        <Pane marginY="auto" marginRight="1rem">
          <Text></Text>
        </Pane>
      </Pane>
      }
    </StyledNav>)
}

Nav.propTypes = {
  active: PropTypes.string
}

export default Nav

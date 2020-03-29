import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Text, Avatar, Tooltip, Pane, Heading } from 'evergreen-ui'

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

const Nav = () => {
  const router = useRouter()
  return (
    <StyledNav>
      <StyledUl>
        <StyledLi>
          <Pane marginY="auto">
            <img height="30" src="/static/puppy2.png" />
          </Pane>
        </StyledLi>
        {
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
        }
      </StyledUl>
      <Pane display="flex" flexDirection="row">
        <Pane marginY="auto" marginRight="1rem">
          <Text>John Smith</Text>
        </Pane>
        <Tooltip content="Signed in as John Smith">
          <Avatar
            src=""
            name="John Smith"
            size={35}
            marginY="auto"
            marginRight="4rem"/>
        </Tooltip>
      </Pane>
    </StyledNav>)
}

Nav.propTypes = {
  active: PropTypes.string
}

export default Nav

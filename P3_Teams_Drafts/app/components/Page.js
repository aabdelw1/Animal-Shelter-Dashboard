import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'

const theme = {
  blue: '#009FDB',
  cobalt: '#0057B8',
  purple: '#AF29BB',
  berry: '#FF585D',
  tangerine: '#FFB000',
  lime: '#91DC00',
  mint: '#49EEDC'
}

const StyledPage = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Content = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
`

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body {
    padding: 0;
    margin: 0;
  }
`

class Page extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledPage>
          <Meta />
          <Header />
          <Content>
            {this.props.children}
          </Content>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    )
  }
}

Page.propTypes = {
  children: PropTypes.any
}

export default Page

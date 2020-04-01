import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import Nav from '../components/Nav'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => (
  <Nav active={Router.active}/>
)

export default Header

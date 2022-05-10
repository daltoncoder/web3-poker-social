import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Cashier from './Cashier'
import JoinGame from './JoinGame'
import HostGame from './HostGame'
import CreateAccount from './CreateAccount'

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Body>
        <Switch>
          <Route path='/join'>
            <JoinGame />
          </Route>
          <Route path='/host'>
            <HostGame />
          </Route>
          <Route path='/createAccount'>
            <CreateAccount />
          </Route>
          <Route path='/'>
            <Cashier />
          </Route>
        </Switch>
      </Body>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`
const Body = styled.div`
  height: 80vh;
  width: 100%;
`

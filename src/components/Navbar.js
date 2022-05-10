import React from 'react'
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'

import WalletConnect from './Navbar/WalletConnect'

const Navbar = () => {
  return (
    <Container>
      <Logo>W3PC</Logo>
      <PageRoute to='/'>Cashier</PageRoute>
      <PageRoute to='/join'>Join Game</PageRoute>
      <PageRoute to='/host'>Host Game</PageRoute>
      <WalletConnect />
    </Container>
  )
}

const Container = tw.div`
  container
  mx-auto  
  flex 
  flex-row
`

const Logo = tw.div`
  underline
  basis-1/5
`


const PageRoute = tw(Link)`
  flex-auto
  font-bold 
  underline
`

export default Navbar

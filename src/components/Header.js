import React from 'react'
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'

import WalletConnect from './WalletConnect'

const Header = () => {
  return (
    <Container>
      <div
        style={{
          width: '33%',
          display: 'flex',
          justifyContent: 'space-around',
          paddingLeft: '5%',
        }}
      >
        <PageRoute to='/'>Cashier</PageRoute>
        <PageRoute to='/join'>Join Game</PageRoute>
        <PageRoute to='/host'>Host Game</PageRoute>
      </div>
      <WalletConnect />
    </Container>
  )
  
}

const Container = tw.div`
  flex
  items-center
  justify-center
  flex-col
  w-full
  bg-indigo-600
`

const PageRoute = tw(Link)`
  text-3xl 
  font-bold 
  underline
`

export default Header

import React from 'react'
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'

import WalletConnect from './Navbar/WalletConnect'

const Navbar = () => {
  return (
    <Container>
      <div class="m-auto max-w-screen-lg	flex flex-row justify-between items-center">
        <Logo>W3PC</Logo>
          <div class="flex">
            <PageRoute to='/'>Cashier</PageRoute>
            <PageRoute to='/join'>Join Game</PageRoute>
            <PageRoute to='/host'>Host Game</PageRoute>
          </div>
        <WalletConnect />
      </div>
    </Container>
  )
}

const Container = tw.div`
  bg-slate-700
`

const Logo = tw.div`
  flex-initial
  px-3
  py-2
  mx-10
  my-3

  font-mono
  font-black
  text-xl
  text-white
`


const PageRoute = tw(Link)`
  flex-none

  px-3
  py-2
  mx-4

  bg-gray-900
  rounded-md

  font-sans
  font-medium
  text-sm
  text-white

  text-gray-300 
  hover:bg-slate-600 
  hover:text-white
`

export default Navbar

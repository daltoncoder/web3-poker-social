import React from 'react'
import tw from 'tailwind-styled-components'
import { useConnect } from 'wagmi'

const WalletModal = ({ setShowModal }) => {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect()

  if (activeConnector) {
    setShowModal(false)
  }
  console.log(connectors)
  return (
    <Container onClick={() => setShowModal(false)}>
        <Window onClick={(e) => e.stopPropagation()}>
          <div class="flex flex-col items-center py-5 px-3">
            {connectors.map((x) => (
              <Button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
                {x.name}
                {isConnecting && pendingConnector?.id === x.id && ' (connecting)'}
              </Button>
            ))}
          </div>
        </Window>
      {error && <div>{error.message}</div>}
    </Container>
  )
}

const Container = tw.div`
  fixed 
  inset-0

  flex
  justify-center

  bg-gray-500
  bg-opacity-75
  transition-opacity
`
const Window = tw.div`
  relative

  mt-48
  w-96
  h-fit

  flex
  flex-col
  justify-center
  border-2
  border-slate-600
  
  text-center
  bg-gray-900
  rounded-lg

  `

const Button = tw.button`

  w-full
  bg-gray-600
  rounded-md
  
  mx-2
  my-1
  px-3
  py-2

  
  font-semibold
  text-white
  hover:bg-gray-500

`

export default WalletModal

import React from 'react'
import styled from 'styled-components'
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
        {connectors.map((x) => (
          <Button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
            {x.name}
            {isConnecting && pendingConnector?.id === x.id && ' (connecting)'}
          </Button>
        ))}
        {error && <div>{error.message}</div>}
      </Window>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Window = styled.div``
const Button = styled.button`
  color: white;
  background-color: #ff7a00;
  font-size: 1.5em;
  padding: 0.8em;
  margin-right: 5%;
  border: 1px solid #ff7a00;
  border-radius: 5px;
`

export default WalletModal

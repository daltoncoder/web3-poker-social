import React from 'react'
import { useConnect } from 'wagmi'

const EthersTest = () => {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect()
  return (
    <div>
      <button onClick={() => connect(connectors[0])}>Connect to Wallet</button>
    </div>
  )
}

export default EthersTest

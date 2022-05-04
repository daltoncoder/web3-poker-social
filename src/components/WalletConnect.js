import React, { useState } from 'react'
import styled from 'styled-components'
import { useConnect, useAccount, useNetwork } from 'wagmi'
import WalletModal from './WalletModal'
import AccountInfo from './AccountInfo'

const WalletConnect = () => {
  const [showModal, setShowModal] = useState(false)
  const { activeConnector } = useConnect({ chainId: 137 })
  const network = useNetwork({
    onSettled(data, error) {
      console.log('Network CHanged')
    },
  })
  const account = useAccount()

  return (
    <>
      {activeConnector && network?.activeChain?.id !== 137 && (
        <Button
          onClick={() => {
            //Using Wagmi hooks to switch to Polygon network was not functioning properly, So we have to do it the old fashion way until i can look into it
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x89',
                  rpcUrls: ['https://rpc-mainnet.matic.network/'],
                  chainName: 'Matic Mainnet',
                  nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://polygonscan.com/'],
                },
                network.reset(),
              ],
            })
          }}
        >
          Please Switch to Polygon Chain
        </Button>
      )}
      {!activeConnector && (
        <Button onClick={() => setShowModal(true)}>Connect Wallet</Button>
      )}
      {showModal && <WalletModal setShowModal={setShowModal} />}
      {account.isSuccess && <AccountInfo account={account} />}
    </>
  )
}

const Button = styled.button`
  color: white;
  background-color: #ff7a00;
  font-size: 1.5em;
  padding: 0.8em;
  margin-right: 5%;
  border: 1px solid #ff7a00;
  border-radius: 5px;
`

export default WalletConnect

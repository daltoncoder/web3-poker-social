import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
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

  const switchToPolygon = () => {
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
  }

  return (
    
    <Container>
      {activeConnector && network?.activeChain?.id !== 137 && (
        <Button
          onClick={() => switchToPolygon()}
        >
          Please Switch to Polygon Chain
        </Button>
      )}

      {!activeConnector && (
        <Button onClick={() => setShowModal(true)}>Connect Wallet</Button>
      ) || ( account.isSuccess && <AccountInfo account={account} /> )}

      {showModal && <WalletModal setShowModal={setShowModal} />}
    </Container>
  )
}

const Container = tw.div`
  justify-self-end
`

const Button = tw.button`
  mx-5
  px-3
  py-2

  rounded-md
  border
  border-transparent

  bg-orange-600
  hover:bg-orange-700

  text-white
  text-lg
  font-bold
`

export default WalletConnect

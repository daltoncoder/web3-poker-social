import { createClient, Provider, chain } from 'wagmi'
import { providers } from 'ethers'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Layout from './components/Layout'

function App() {
  //List of chains from wagmi
  const chains = [chain.polygon]
  const defaultChain = chain.polygon

  const alchemyId = process.env.REACT_APP_ALCHEMY_KEY

  const client = createClient({
    // AutoConnect must be true due to a bug in Wagmi not assigning Client.connector properly otherwise, will try and make a pull request on their github to fix
    autoConnect: true,

    connectors({ chainId }) {
      const chain = chains.find((x) => x.id === chainId) ?? defaultChain
      const rpcUrl = chain.rpcUrls.alchemy
        ? `${chain.rpcUrls.alchemy}/${alchemyId}`
        : chain.rpcUrls.default
      return [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'Web3-Poker-Social',
            chainId: chain.id,
            jsonRpcUrl: rpcUrl,
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
            rpc: { [chain.id]: rpcUrl },
          },
        }),
        new InjectedConnector({
          chains,
          options: { name: 'Injected' },
        }),
      ]
    },
    provider() {
      return new providers.AlchemyProvider(137, alchemyId)
    },
  })

  return (
    <Provider client={client}>
      <Layout />
    </Provider>
  )
}

export default App

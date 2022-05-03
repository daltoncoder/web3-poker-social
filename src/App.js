import { createClient, Provider, chain } from 'wagmi'
import { providers } from 'ethers'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Layout from './components/Layout'

function App() {
  //List of chains from wagmi
  const chains = chain

  const client = createClient({
    // AutoConnect must be true due to a bug in Wagmi not assigning Client.connector properly otherwise, will try and make a pull request on their github to fix
    autoConnect: true,
  })

  return (
    <Provider client={client}>
      <Layout />
    </Provider>
  )
}

export default App

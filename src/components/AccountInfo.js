import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useContractRead, useProvider } from 'wagmi'
import { utils } from 'ethers'
import accountAbi from '../abis/account.json'

const AccountInfo = ({ account }) => {
  const provider = useProvider({ chainId: 137 })
  console.log(provider)
  const history = useHistory()
  const location = useLocation()
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x8CEe8e37E03B0384daF5836fbD22b3678b0E0a3c',
      contractInterface: accountAbi,
    },
    'name',
    {
      args: '0x90008c7C3dB34B282dE657fa52Fa968BBA15596c',
      onError(error) {
        console.log(error)
      },
    }
  )
  useEffect(() => {
    // If they are connected with no registered name, take them to the register name page
    if (account && !data && history.location.pathname !== '/createAccount') {
      history.push('/createAccount')
    }
    //If they are on the createAccount page with an account already created take them to homepage
    if (data && history.location.pathname === '/createAccount') {
      history.push('/cashier')
    }
  }, [data, location.pathname])

  console.log(data)

  return (
    <>
      {account.isLoading && <div>Loading Wallet...</div>}
      {account.isError && <div>Error Loading Wallet</div>}
      {account.data?.address && !data && (
        <div>Wallet: {account.data.address}</div>
      )}
      {data && (
        <div>
          <div>Account: data.name</div>
          <div>Chips: Total | USDC: Total</div>
        </div>
      )}
    </>
  )
}

export default AccountInfo

import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useContractRead, useProvider } from 'wagmi'
import { utils } from 'ethers'
import accountAbi from '../../abis/account.json'
import UserBalance from './UserBalance'
import tw from 'tailwind-styled-components'


const AccountInfo = ({ account }) => {
  const history = useHistory()
  const location = useLocation()
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x8CEe8e37E03B0384daF5836fbD22b3678b0E0a3c',
      contractInterface: accountAbi,
    },
    'name',
    {
      args: account?.data?.address,
      onError(error) {
        console.log(error)
      },
    }
  )
  useEffect(() => {
    // If they are connected with no registered name, take them to the register name page
    if (
      account &&
      data ===
        '0x0000000000000000000000000000000000000000000000000000000000000000' &&
      history.location.pathname !== '/createAccount'
    ) {
      history.push('/createAccount')
    }
    //If they are on the createAccount page with an account already created take them to homepage
    if (
      data !==
        '0x0000000000000000000000000000000000000000000000000000000000000000' &&
      history.location.pathname === '/createAccount'
    ) {
      history.push('/cashier')
    }
  }, [data, location.pathname])

  return (
    <Container>
      {account.isLoading && <div>Loading Wallet...</div>}
      {account.isError && <div>Error Loading Wallet</div>}
      {account.data?.address &&
        data ===
          '0x0000000000000000000000000000000000000000000000000000000000000000' && (
          <div>Wallet: {account.data.address}</div>
        )}
      {data &&
        data !=
          '0x0000000000000000000000000000000000000000000000000000000000000000' && (
          <div>
            <div>Account: {utils.parseBytes32String(data)}</div>
            <UserBalance account={account} />
          </div>
        )}
    </Container>
  )
}

const Container = tw.div`
  flex
  flex-row
`

export default AccountInfo

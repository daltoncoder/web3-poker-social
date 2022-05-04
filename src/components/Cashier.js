import React from 'react'
import styled from 'styled-components'
import { useContractRead, useAccount, erc20ABI } from 'wagmi'
import cashierAbi from '../abis/cashier.json'

const Cashier = () => {
  const account = useAccount()

  const cashierUsdc = useContractRead(
    {
      addressOrName: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      contractInterface: erc20ABI,
    },
    'balanceOf',
    {
      args: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
    }
  )

  const totalChips = useContractRead(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
    },
    'totalSupply'
  )

  const userChips = useContractRead(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
    },
    'balanceOf',
    {
      args: account?.data?.address,
    }
  )

  const userUsdc = useContractRead(
    {
      addressOrName: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      contractInterface: erc20ABI,
    },
    'balanceOf',
    {
      args: account?.data?.address,
    }
  )

  return (
    <Container>
      <DataContainer>
        <Data>
          <h2>TotalChips in Circulation</h2>
          <h1>{totalChips?.data?.toNumber()} Chips</h1>
        </Data>

        <Data>
          <h2>Your CHIPS in Wallet</h2>
          {account.data ? (
            <h1>{userChips?.data?.toNumber()} CHIPS</h1>
          ) : (
            <h1>????</h1>
          )}
        </Data>
      </DataContainer>
      <DataContainer>
        <Data>
          <h2>USDC in the Cashier</h2>
          <h1>{cashierUsdc?.data?.div(1000000).toNumber()} USDC</h1>
        </Data>
        <Data>
          <h2>USDC in Wallet</h2>
          {account.data ? (
            <h1>{userUsdc?.data?.div(1000000).toNumber()} USDC</h1>
          ) : (
            <h1>????</h1>
          )}
        </Data>
      </DataContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`
const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 5rem;
`
const Data = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default Cashier

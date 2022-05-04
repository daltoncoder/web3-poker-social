import React from 'react'
import { useContractRead, erc20ABI } from 'wagmi'
import cashierAbi from '../abis/cashier.json'
import styled from 'styled-components'

const UserBalance = ({ account }) => {
  const chipBalance = useContractRead(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
    },
    'balanceOf',
    {
      args: account.data.address,
    }
  )

  const usdcBalance = useContractRead(
    {
      addressOrName: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      contractInterface: erc20ABI,
    },
    'balanceOf',
    {
      args: account.data.address,
    }
  )

  return (
    <Container>
      <div>{chipBalance.data.toNumber()} CHIPS </div>
      <div> {' | '} </div>
      <div> {usdcBalance.data.toNumber()} USDC</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

export default UserBalance

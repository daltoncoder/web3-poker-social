import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useContractRead, useAccount, erc20ABI } from 'wagmi'
import cashierAbi from '../abis/cashier.json'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

const Cashier = () => {
  const [chainData, setChainData] = useState({})
  const [updateValues, setUpdateValues] = useState(false)
  const account = useAccount()

  const updateFunction = () => {
    setUpdateValues(true)
  }

  useEffect(() => {
    if (!updateValues) {
      return
    }
    cashierUsdc.refetch()
    totalChips.refetch()
    userChips.refetch()
    userUsdc.refetch()
    setUpdateValues(false)
  }, [updateValues])

  const cashierUsdc = useContractRead(
    {
      addressOrName: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      contractInterface: erc20ABI,
    },
    'balanceOf',
    {
      args: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      onSuccess(data) {
        setChainData({
          ...chainData,
          cashierUsdc: data.div(1000000).toNumber(),
        })
      },
    }
  )

  const totalChips = useContractRead(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
    },
    'totalSupply',
    {
      onSuccess(data) {
        setChainData({ ...chainData, totalChips: data.toNumber() })
      },
    }
  )

  const userChips = useContractRead(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
    },
    'balanceOf',
    {
      args: account?.data?.address,
      onSuccess(data) {
        setChainData({ ...chainData, userChips: data.toNumber() })
      },
      enabled: account?.data,
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
      onSuccess(data) {
        setChainData({ ...chainData, userUsdc: data.div(1000000).toNumber() })
      },
    }
  )

  return (
    <Container>
      <DataContainer>
        <Data>
          <h2>TotalChips in Circulation</h2>
          <h1>{chainData.totalChips} Chips</h1>
        </Data>

        <Data>
          <h2>Your CHIPS in Wallet</h2>
          {account.data ? <h1>{chainData.userChips} CHIPS</h1> : <h1>????</h1>}
        </Data>
        <Data>
          <BuyForm userUsdc={userUsdc} updateValues={updateFunction} />
        </Data>
      </DataContainer>
      <DataContainer>
        <Data>
          <h2>USDC in the Cashier</h2>
          <h1>{chainData.cashierUsdc} USDC</h1>
        </Data>
        <Data>
          <h2>USDC in Wallet</h2>
          {account.data ? <h1>{chainData.userUsdc} USDC</h1> : <h1>????</h1>}
        </Data>
        <Data>
          <SellForm userChips={userChips} updateValues={updateFunction} />
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

import React, { useCallback, useState, useEffect } from 'react'
import tw from 'tailwind-styled-components'
import { useContractRead, useAccount, erc20ABI } from 'wagmi'
import cashierAbi from '../abis/cashier.json'
import BuyForm from './Cashier/BuyForm'
import SellForm from './Cashier/SellForm'

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
  }, [chainData, account])

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
      <DataRow>
        <Label>Total Chips in Circulation</Label>
        <Content>{chainData.totalChips} CHIP</Content>
      </DataRow>

      <DataRow>
        <Label>USDC in the Cashier</Label>
        <Content>{chainData.cashierUsdc} USDC </Content>
      </DataRow>
      
      <DataRow>
        <Label>Your CHIP in Wallet</Label>
        <Content>{account.data ? `${chainData.userChips} CHIP` : `????`}</Content>
      </DataRow>

      <DataRow>
        <Label>Your USDC in Wallet</Label>
        <Content>{account.data ? `${chainData.userUsdc} USDC`: "????"}</Content>
      </DataRow>

      <DataRow>
        <Label>Buy CHIP with USDC</Label>
        <Content><BuyForm userUsdc={userUsdc} updateValues={updateFunction} /></Content>  
      </DataRow>

      <DataRow>
        <Label>Sell CHIP for USDC</Label>
        <Content><SellForm userChips={userChips} updateValues={updateFunction} /></Content>
      </DataRow>
    </Container>
  )
}

const Container = tw.div`
  flex
  flex-col

  px-5
  py-10
  mx-24
  my-10
  border
`
const DataRow = tw.div`
  flex
  flex-row

  px-3
  py-2
  odd:bg-gray-200
  items-center
`
const Label = tw.div`
  justify-self-start
  flex-auto

  uppercase 
  font-mono
  text-sm
  font-semibold
  tracking-wide
  text-slate-500
`

const Content = tw.div`
  justify-self-end
  
  text-lg
  text-gray-700
  font-bold
`

export default Cashier

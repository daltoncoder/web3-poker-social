import React from 'react'
import styled from 'styled-components'
import { useContractRead } from 'wagmi'
import cashierAbi from '../abis/cashier.json'

const Cashier = () => {
  // const TotalChips = useContractRead()
  return (
    <Container>
      <DataContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h2>TotalChips in Circulation</h2>
          <h1>xxxx Chips</h1>
        </div>
      </DataContainer>
      <DataContainer>
        <h2>USDC in the Cashier</h2>
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

export default Cashier

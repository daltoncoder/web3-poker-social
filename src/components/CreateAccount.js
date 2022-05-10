import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import accountAbi from '../abis/account.json'
import { useSigner, useContractWrite, useConnect } from 'wagmi'
import { utils } from 'ethers'

const CreateAccount = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: '0x8CEe8e37E03B0384daF5836fbD22b3678b0E0a3c',
      contractInterface: accountAbi,
    },
    'register'
  )

  const registerName = (e) => {
    e.preventDefault()
    if (input === '') {
      return
    }
    try {
      const formattedName = utils.formatBytes32String(input)
      write({ args: formattedName })
    } catch (error) {
      setError(
        'You have inputed an invalid name. Name must be able to be converted to byte32'
      )
    }
  }

  return (
    <Container>
      <div>No account detected.</div>
      <div>To use this app, please choose a name: </div>
      <Form onSubmit={(e) => registerName(e)}>
        <Input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <div>This can only be done once. Choose wisely!</div>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Set Name'}
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {isError && (
          <div style={{ color: 'red' }}>
            There was an error registering your name please try again
          </div>
        )}
      </Form>
    </Container>
  )
}

const Container = tw.div`
 
`
const Form = tw.
form`

`

const Input = tw.
input`
`
const Button = tw.
button`
 
`

export default CreateAccount

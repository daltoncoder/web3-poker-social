import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { erc20ABI, useContractWrite, useProvider } from 'wagmi'
import { BigNumber } from 'ethers'
import cashierAbi from '../../abis/cashier.json'

const BuyForm = ({ userUsdc, updateValues }) => {
  const [value, setValue] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('unapproved')

  const provider = useProvider()

  const onInputChange = (e) => {
    //Make sure they didnt input a decimal
    const rounded = Math.round(e.target.value)
    console.log(rounded)
    if (rounded < 0) {
      setValue('')
    } else if (rounded > userUsdc.data.div(1000000).toNumber()) {
      setValue(userUsdc.data.div(1000000).toNumber())
    } else {
      if (rounded === 0) {
        setValue('')
      } else {
        setValue(rounded)
      }
    }
  }

  const approveUsdc = useContractWrite(
    {
      addressOrName: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      contractInterface: erc20ABI,
    },
    'approve',
    {
      onError(error) {
        console.log(error)
        setErrors({
          ...errors,
          buyTokens:
            'There was an error approving your transaction please try again',
        })
        setValue('')
        setStatus('unapproved')
      },
      onSuccess(data) {
        if (data) {
          data
            .wait()
            .then((data) => {
              if (data) {
                setStatus('approved')
              }
            })
            .catch((e) => {
              setErrors({
                buyTokens:
                  'There was an error with your approval please try again',
              })
              setStatus('unapproved')
            })
        }
      },
    }
  )

  const buyChips = () => {
    if (value === '' || value === 0) {
      return
    }
    if (status === 'success') {
      setStatus('unapproved')
    }

    if (status === 'approved') {
      setStatus('buying')
      writeBuyChips.write({
        args: [value],
      })
    } else {
      setStatus('approving')
      approveUsdc.write({
        args: [
          '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
          BigNumber.from(value).mul(10 ** 6),
        ],
      })
    }
  }

  const writeBuyChips = useContractWrite(
    {
      addressOrName: '0x4e5b6ffbf3C249435be2730AdDBAA7AD1D5e2E16',
      contractInterface: cashierAbi,
      signerOrProvider: provider,
    },
    'getChips',
    {
      onSettled(data) {
        if (data) {
          data
            .wait()
            .then((data) => {
              if (data) {
                setValue('')
                setErrors({})
                setStatus('success')
                updateValues()
              }
            })
            .catch((error) => {
              setStatus('approved')
              setErrors({
                buyTokens:
                  'There was an error with your transaction Please try again',
              })
            })
        }
      },
      onError(error) {
        console.log(error)
        setErrors({
          ...errors,
          buyTokens:
            'There was an error completing your transaction please try again',
        })
        setStatus('approved')
      },
      overrides(data) {
        //Was going over gas estimations causing txn to fail. Quick fix but we may want to think of a better way to do this like if txn fails prompt the user to raise gas limits so we have more accurate estimations
        return { gasLimit: data.gasLimit.mul(1.5) }
      },
    }
  )

  return (
    <Container>
      <Input
        type='number'
        onChange={(e) => onInputChange(e)}
        value={value}
        disabled={status !== 'unapproved' && status !== 'success'}
      />
      {status === 'approved' && (
        <div style={{ color: 'green' }}>
          Txn approved click again to complete
        </div>
      )}
      {errors.buyTokens && (
        <div style={{ color: 'red' }}>{errors.buyTokens}</div>
      )}
      <Button
        onClick={buyChips}
        disabled={status === 'approving' || status === 'buying'}
      >
        {!value || status === 'approved' || status === 'success'
          ? 'Buy CHIPS'
          : status === 'unapproved' && value
          ? 'Approve'
          : status === 'approving'
          ? 'Approving'
          : 'Confirming Txn...'}
      </Button>
      {status === 'success' && (
        <div style={{ color: 'green' }}>Transaction was a success!</div>
      )}
    </Container>
  )
}

const Container = tw.div`
  flex
  flex-row
`

const Input = tw.input`
  my-1
  mx-3
  px-3 
  py-1
  bg-white 
  border 
  shadow-sm
  border-slate-300
  placeholder-slate-400
  focus:outline-none 
  focus:border-sky-500 
  focus:ring-sky-500 
  block 
  w-full 
  rounded-md 
  focus:ring-1
  
`
const Button = tw.button`
  my-1
  flex-none
  w-32
  rounded-md
  bg-green-700
  hover:bg-green-600

  text-slate-200
  hover:text-white
  font-bold
`

export default BuyForm

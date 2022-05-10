import React from 'react'
import tw from 'tailwind-styled-components'

const JoinGame = () => {
  return (
    <Container>
      <div>Enter a Game ID Below</div>
      <div>
        <input />
      </div>
      <Button>View Game</Button>
    </Container>
  )
}

const Container = tw.div`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: center;
  font-size: 1.5rem;
  padding-top: 5%;
`
const Button = tw.
button`
  color: white;
  background: #4786ff;
  border: 1px solid #4786ff;
  border-radius: 5px;
  font-size: 1.5em;
  margin-top: 0.5em;
`

export default JoinGame

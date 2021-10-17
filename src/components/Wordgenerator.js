import React, { useState, useEffect } from 'react'

import './styles.css'

import { Container, Box, TextField, Button, ButtonGroup, Typography } from '@mui/material'

import * as Constants from './constants'

const Wordgenerator = ({ words, language, inputId, openAlert, className }) => {
  const [password, setPassword] = useState('')

  const numbers = Constants.numbers
  const specials = Constants.specials

  const generatePassword = () => {
    const word1 = words[Math.floor(Math.random() * words.length)]
    const word2 = words[Math.floor(Math.random() * words.length)]
    const specialChar = specials[Math.floor(Math.random() * specials.length)]
    const number = numbers[Math.floor(Math.random() * numbers.length)]

    const newPassword = `${word1}${word2}${specialChar}${number}`
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    const cb = navigator.clipboard
    const input = document.getElementById(inputId)
    cb.writeText(input.value).then(() => openAlert())
  }

  const onInputChange = (e) => {
    setPassword(e.target.value)
  }

  const generatePasswordInit = () => {
    const word1 = words[Math.floor(Math.random() * words.length)]
    const word2 = words[Math.floor(Math.random() * words.length)]
    const specialChar = specials[Math.floor(Math.random() * specials.length)]
    const number = numbers[Math.floor(Math.random() * numbers.length)]

    const newPassword = `${word1}${word2}${specialChar}${number}`
    setPassword(newPassword)
  }

  useEffect(() => {
    generatePasswordInit()
  }, [words, specials, numbers])

  return (
    <div>
      <Box
        className={className}
        sx={{
          width: '100%',
          // height: '20%',
          border: '1px dashed grey',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 3,
        }}
      >
        <Typography variant="subtitle1">{`${language} password`}</Typography>

        <Container className="inputAndOthers">
          <TextField
            className="textfield"
            fullWidth
            id={inputId}
            variant="outlined"
            value={password}
            onChange={onInputChange}
            inputProps={{
              style: {
                height: 10,
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              },
            }}
          />
          <ButtonGroup className="buttons" variant="contained" fullWidth>
            <Button id="generateButton" onClick={generatePassword} variant="outlined" size="medium">
              Generate new
            </Button>
            <Button onClick={copyToClipboard} size="medium">
              Copy to clipboard
            </Button>
          </ButtonGroup>
        </Container>
      </Box>
    </div>
  )
}

export default Wordgenerator

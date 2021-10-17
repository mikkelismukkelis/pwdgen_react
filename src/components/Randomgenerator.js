import React, { useState, useEffect } from 'react'

import { Container, Box, TextField, Button, ButtonGroup, Typography, Grid, Slider, FormControlLabel, Switch } from '@mui/material'
import MuiInput from '@mui/material/Input'
import { styled } from '@mui/material/styles'

import * as Constants from './constants'

const Input = styled(MuiInput)`
  width: 42px;
`

const Randomgenerator = ({ openAlert }) => {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(16)
  const [pwdOptions, setPwdOptions] = useState({
    smallLetters: true,
    capitalLetters: true,
    numbers: true,
    specialCharacters: true,
  })

  const handleOptionsChange = (event) => {
    setPwdOptions({
      ...pwdOptions,
      [event.target.name]: event.target.checked,
    })
  }

  const handleSliderChange = (event, newValue) => {
    setPasswordLength(newValue)
  }

  const handleInputChange = (event) => {
    setPasswordLength(event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleBlur = () => {
    if (passwordLength < 0) {
      setPasswordLength(0)
    } else if (passwordLength > 100) {
      setPasswordLength(100)
    }
  }

  const alphabetsSmall = Constants.alphabetsSmall
  const alphabetsCapital = Constants.alphabetsCapital
  const numbers = Constants.numbers
  const specials = Constants.specials

  const getCharsForGeneration = () => {
    let charsForGeneration = []

    if (!pwdOptions.smallLetters && !pwdOptions.capitalLetters && !pwdOptions.numbers && !pwdOptions.specialCharacters) {
      alert('At least one option should be selected')
      return null
    } else {
      if (pwdOptions.smallLetters) {
        charsForGeneration = charsForGeneration.concat(alphabetsSmall)
      }
      if (pwdOptions.capitalLetters) {
        charsForGeneration = charsForGeneration.concat(alphabetsCapital)
      }
      if (pwdOptions.numbers) {
        charsForGeneration = charsForGeneration.concat(numbers)
      }
      if (pwdOptions.specialCharacters) {
        charsForGeneration = charsForGeneration.concat(specials)
      }
    }

    return charsForGeneration
  }

  const generatePassword = () => {
    const characters = getCharsForGeneration()
    let newPassword = ''

    if (!characters) {
      setPassword('Select at least one character type')
    } else {
      for (let i = 0; i < passwordLength; i++) {
        newPassword += characters[Math.floor(Math.random() * characters.length)]
      }

      setPassword(newPassword)
    }
  }

  const copyToClipboard = () => {
    const cb = navigator.clipboard
    const input = document.getElementById('pwdInputRANDOM')
    cb.writeText(input.value).then(() => openAlert())
  }

  const onInputChange = (e) => {
    setPassword(e.target.value)
  }

  const generatePasswordInit = () => {
    const characters = Constants.alphabetsSmall.concat(Constants.alphabetsCapital)
    let newPassword = ''

    for (let i = 0; i < 16; i++) {
      newPassword += characters[Math.floor(Math.random() * characters.length)]
    }

    setPassword(newPassword)
  }

  useEffect(() => {
    generatePasswordInit()
  }, [])

  return (
    <div>
      <Box
        className="box"
        sx={{
          width: '100%',
          height: '20%',
          border: '1px dashed grey',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 3,
          // marginTop: 5,
        }}
      >
        <Typography variant="subtitle1">Random password</Typography>

        <Container className="inputAndOthers">
          <TextField
            className="textfield"
            fullWidth
            id="pwdInputRANDOM"
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

          <Grid className="slider" container spacing={2} alignItems="center">
            <Grid item>
              <Typography>Length: </Typography>
            </Grid>
            <Grid item xs>
              <Slider value={typeof passwordLength === 'number' ? passwordLength : 0} onChange={handleSliderChange} aria-labelledby="input-slider" />
            </Grid>
            <Grid item>
              <Input
                value={passwordLength}
                size="medium"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>

          <Grid
            className="includes"
            // wrap='nowrap'
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={<Switch checked={pwdOptions.smallLetters} onChange={handleOptionsChange} name="smallLetters" />}
                label="Small letters"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={<Switch checked={pwdOptions.capitalLetters} onChange={handleOptionsChange} name="capitalLetters" />}
                label="Capital letters"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControlLabel control={<Switch checked={pwdOptions.numbers} onChange={handleOptionsChange} name="numbers" />} label="Numbers" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={<Switch checked={pwdOptions.specialCharacters} onChange={handleOptionsChange} name="specialCharacters" />}
                label="Special characters"
              />
            </Grid>
          </Grid>

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

export default Randomgenerator

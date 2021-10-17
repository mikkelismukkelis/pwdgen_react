import React, { useState, useEffect } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { Container, Snackbar, Alert } from '@mui/material'

import './components/styles.css'
import Wordgenerator from './components/Wordgenerator'
import Randomgenerator from './components/Randomgenerator'

const getFinnishWords = async () => {
  const res = await fetch('/words/finnish_words.txt')
  const data = await res.text()
  const finnishWords = data.split(/\r?\n/)
  return finnishWords
}

const getEnglishWords = async () => {
  const res = await fetch('/words/english_words.txt')
  const data = await res.text()
  const englishWords = data.split(/\r?\n/)
  return englishWords
}

const App = () => {
  const [finnishWords, setFinnishWords] = useState([])
  const [englishWords, setEnglishWords] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const openAlert = () => {
    setAlertOpen(true)
  }

  useEffect(() => {
    getFinnishWords()
      .then((result) => {
        setFinnishWords(result)
      })
      .catch((err) => console.log(err))

    getEnglishWords()
      .then((result) => setEnglishWords(result))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div id="wrapper">
      <CssBaseline />

      <Snackbar className="snackbar" anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert className="alert" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password copied to clipboard
        </Alert>
      </Snackbar>
      <Container>
        <Wordgenerator words={finnishWords} language="Finnish" inputId="pwdInputFIN" openAlert={openAlert} className="firstBox" />
        <Wordgenerator words={englishWords} language="English" inputId="pwdInputENG" openAlert={openAlert} className="box" />
        <Randomgenerator openAlert={openAlert} />
      </Container>
    </div>
  )
}

export default App

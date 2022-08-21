import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QuizContextProvider } from './context'

const root = ReactDOM.createRoot(
  document.getElementById('root')
)
root.render(
  <QuizContextProvider>
    <App />
  </QuizContextProvider>
)
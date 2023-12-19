import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './contexts/DarkModeContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DarkModeContextProvider>
  </React.StrictMode>,
)

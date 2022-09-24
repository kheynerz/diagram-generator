import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { CredentialsContextProvider } from './context/CredentialsContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialsContextProvider>
      <App/>
    </CredentialsContextProvider>
  </React.StrictMode>
)

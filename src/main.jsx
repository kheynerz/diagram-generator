import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from '../login/login'
import Schema from '../Schema/Schema'
import Tables from '../Tables/Tables'
import Projects from '../Projects'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Projects />
  </React.StrictMode>
)

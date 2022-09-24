import './App.css'
import { CredentialsContextProvider } from './context/CredentialsContext';
import { AuthContextProvider } from './context/AuthContext'
import { StructureContextProvider } from './context/StructureContext'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Test from './components/Test';
import Login from './components/Login'


const App = () => {
  return (
    <CredentialsContextProvider>
      <AuthContextProvider>
        <StructureContextProvider>
          <Router>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="projects" element={ <h1>Hello world</h1>}/>
              </Route>

              <Route path='testing' element={<Test/>}/>

            </Routes>
          </Router>
        </StructureContextProvider>
      </AuthContextProvider>
    </CredentialsContextProvider>
  );
}

export default App


  /*   <CredentialsContextProvider>
      <Login/>
    </CredentialsContextProvider> */

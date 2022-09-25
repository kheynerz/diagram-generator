import './App.css'
import { CredentialsContextProvider } from './context/CredentialsContext';
import { AuthContextProvider } from './context/AuthContext'
import { StructureContextProvider } from './context/StructureContext'
import { ProjectContextProvider } from './context/ProjectContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Test from './components/Test';
import Login from './components/Login'

import Projects from './components/Projects';
import NewProject from './components/NewProject';

const App = () => {
  return (
    <CredentialsContextProvider>
      <AuthContextProvider>
        <StructureContextProvider>
          <ProjectContextProvider>
            <Router>
              <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute/>}>
                
                </Route>
                <Route path='testing' element={<Test/>}/>
                <Route path="projects" element={<Projects/>}/>
                <Route path="newProject" element={<NewProject/>}/>

              </Routes>
            </Router>
          
          </ProjectContextProvider>
        </StructureContextProvider>
      </AuthContextProvider>
    </CredentialsContextProvider>
  );
}

export default App

import './App.css'
import { CredentialsContextProvider } from './context/CredentialsContext';
import { AuthContextProvider } from './context/AuthContext'
import { StructureContextProvider } from './context/StructureContext'
import { ProjectContextProvider } from './context/ProjectContext';

import { DiagramContextProvider } from './context/DiagramContext'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './components/Login'

import Projects from './components/Projects';
import Test from './components/Test';
import ShowDiagram from './components/ShowDiagram';

const App = () => {
  return (
    <CredentialsContextProvider>
      <AuthContextProvider>
        <StructureContextProvider>
          <ProjectContextProvider>
            <DiagramContextProvider>
              <Router>
                <Routes>
                  <Route index element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<ProtectedRoute/>}>
                  
                  </Route>
                  <Route path='diagram' element={<Test/>}/>
                  <Route path="projects" element={<Projects/>}/>
                  {/* <Route path="newProject" element={<NewProject/>}/> */}
                  <Route path="showdiagram" element={<ShowDiagram/>}/>
                </Routes>
              </Router>
            </DiagramContextProvider>
          </ProjectContextProvider>
        </StructureContextProvider>
      </AuthContextProvider>
    </CredentialsContextProvider>
  );
}

export default App

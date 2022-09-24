import './App.css'
import CheckInstall from './components/CheckInstall';
import Login from './components/Login'
import { CredentialsContextProvider } from './context/CredentialsContext';

import Projects from './components/Projects';

const App = () => {
  return (
    <CredentialsContextProvider>
      <Projects/>
    </CredentialsContextProvider>
  );
}

export default App




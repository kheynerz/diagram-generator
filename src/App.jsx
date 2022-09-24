import './App.css'
import CheckInstall from './components/CheckInstall';
import Login from './components/Login'
import { CredentialsContextProvider } from './context/CredentialsContext';



const App = () => {
  return (
    <CredentialsContextProvider>
      <CheckInstall/>
    </CredentialsContextProvider>
  );
}

export default App




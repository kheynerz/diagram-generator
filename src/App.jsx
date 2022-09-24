import './App.css'
import Login from './components/Login'
import { CredentialsContextProvider } from './context/CredentialsContext';



const App = () => {
  return (
    <CredentialsContextProvider>
      <Login/>
    </CredentialsContextProvider>
  );
}

export default App




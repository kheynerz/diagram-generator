import CheckInstallModal from './Modals/CheckInstallModal';
import { useCheckInstall } from '../hooks/useCheckInstall';
import { Snackbar } from './Snackbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import Install from './Install';

const CheckInstall = () => {
    const {installed, fetching, connected} = useCheckInstall()
    const {setAuth} = useContext(AuthContext)

    
    const BadCredentials = () => {
        useEffect(() => {
            setAuth(false)
        }, [])
        
        return  <>
            <Snackbar body='Credenciales incorrectas' header='Error'/>
        </>
    }

    if (fetching) return <p>Loading...</p>
    if (installed) return <Install/>
    if (connected) return <CheckInstallModal />

    return  <BadCredentials/>
}

export default CheckInstall



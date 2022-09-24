import CheckInstallModal from './Modals/CheckInstallModal';
import { useCheckInstall } from '../hooks/useCheckInstall';



const CheckInstall = () => {
    const {installed, fetching, connected} = useCheckInstall()

    if (fetching) return <p>Loading...</p>
    if (installed) return <h1>Instalado</h1>
    if (connected) return <CheckInstallModal  />

    return  <h1>bad credentials</h1>
}

export default CheckInstall



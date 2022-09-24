import CheckInstallModal from './Modals/CheckInstallModal';
import { useCheckInstall } from '../hooks/useCheckInstall';

import { Snackbar } from './Snackbar';

const CheckInstall = () => {
    const {installed, fetching, connected} = useCheckInstall()

    if (fetching) return <p>Loading...</p>
    if (installed) return <Snackbar body='Los procedimientos ya se encuentran instalados' header='Procedimientos Instalados'/>
    if (connected) return <CheckInstallModal  />
    

    return  <h1>bad credentials</h1>
}

export default CheckInstall



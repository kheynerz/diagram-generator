import { useEffect,useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Install = () => {
    const {setAuth} = useContext(AuthContext)
    useEffect(() => {
        setAuth(true)
    }, [])
    return <Navigate to='/projects'/>
}

export default Install;

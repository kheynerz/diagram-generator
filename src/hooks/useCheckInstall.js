import { useState, useEffect, useContext } from "react"
import { CredentialsContext } from "../context/CredentialsContext"

import { getService } from "../services/http_requests"

export const useCheckInstall = () => {
    const [installed, setInstalled] = useState(false) 
    const [fetching, setFetching] = useState(true) 
    const [connected, setConnected] = useState(false) 
    const {credentials, setCredentials} = useContext(CredentialsContext)
    
    const handleResponse = ({res, connect}) =>{
        setConnected(connect)
        setInstalled(res)
    }

    useEffect(() => {
        getService('install', {params: credentials})
            .then(res =>  handleResponse(res.data))
            .finally(_ => setFetching(false))
    }, []);

    return {installed, fetching, connected}
}

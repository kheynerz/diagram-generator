import { useState, useEffect, useContext } from "react"
import { CredentialsContext } from "../context/CredentialsContext"

import { getService } from "../services/http_requests"


export const useGetProjects = () => {
    const [projects, setProjects] = useState({}) 
    const [fetching, setFetching] = useState(true) 
    
    const params = useContext(CredentialsContext).credentials

    const handleResponse = (res) =>{
        setProjects(res.res)
    }

    useEffect(() => {
        getService('projects', {params})
            .then(res => {
                handleResponse(res.data)}
            )
            .finally(_ => setFetching(false))
    }, []);

    return {projects, fetching}
}

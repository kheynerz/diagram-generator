import { useState, useEffect, useContext } from "react"
import { CredentialsContext } from "../context/CredentialsContext"

import { getService } from "../services/http_requests"


export const useGetProjects = () => {
    const [projects, setProjects] = useState({}) 
    const [fetching, setFetching] = useState(true) 
    
    const {credentials} = useContext(CredentialsContext)

    const handleResponse = (res) =>{
        setProjects(res.res)
    }

    useEffect(() => {
        getService('projects', {params: credentials})
            .then(res => {
                handleResponse(res.data)}
            )
            .finally(_ => setFetching(false))
    }, []);

    return {projects, fetching}
}

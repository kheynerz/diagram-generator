import { useState, useEffect, useContext } from "react"
import { CredentialsContext } from "../context/CredentialsContext"
import { ProjectContext } from "../context/ProjectContext"
import { getService} from "../services/http_requests"


export const useGetProjects = () => {
    const [fetching, setFetching] = useState(true)
    const {projects, setProjects} = useContext(ProjectContext) 
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

    return {projects, fetching, setProjects}
}


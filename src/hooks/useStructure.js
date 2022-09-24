import { useState, useEffect, useContext } from "react"
import { CredentialsContext } from "../context/CredentialsContext"
import { StructureContext } from "../context/StructureContext"

import { getService } from "../services/http_requests"

export const useStucture = () => {
    const [fetching, setFetching] = useState(true) 
    const {credentials} = useContext(CredentialsContext)
    const {setStructure} = useContext(StructureContext)

    const handleResponse = ({success,res}) =>{
        if (success){
            setStructure(res)
        }
    }

    useEffect(() => {
        getService('structure', {params: credentials})
            .then(res =>  handleResponse(res.data))
            .finally(() => setFetching(false))
    }, []);

    return {fetching}
}

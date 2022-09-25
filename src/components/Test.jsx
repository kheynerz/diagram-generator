import React from 'react'
import { useStucture } from '../hooks/useStructure'
import Diagram from './Diagram'

const Test = () => {
    const {fetching} = useStucture()
    
    if (fetching) return <h5>Loading...</h5>

    return <Diagram/>
}

export default Test
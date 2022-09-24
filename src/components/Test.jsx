import React from 'react'
import { useStucture } from '../hooks/useStructure'

const Test = () => {
    const {fetching} = useStucture()

    if (fetching) return <h5>Loading...</h5>

    return (
        <div>Test</div>
    )
}

export default Test
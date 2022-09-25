import { useContext,useEffect,useState } from 'react'
import { DiagramContext } from '../context/DiagramContext'

import { parseUML,getUrl } from '../helpers/uml'

const PlantImage = () => {
    const {diagram} = useContext(DiagramContext)
    const [imgurl, setImgurl] = useState('')

    useEffect(() => {
        setImgurl(getUrl(parseUML(diagram)))
    }, [])

  return (
    <img src={imgurl}></img>
  )
}

export default PlantImage
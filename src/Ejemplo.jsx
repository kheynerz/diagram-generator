import { useEffect } from 'react'
import './App.css'
import { getUrl } from './helpers/helpers'

import axios from 'axios'

const App = () => {
  let src = getUrl('@startuml\nobject Object01\nobject Object02\nobject Object03\nobject Object04\nobject Object05\nobject Object06\nobject Object07\nobject Object08\nObject01 <|-- Object02\nObject03 *-- Object04\nObject05 o-- "4" Object06\nObject07 .. Object08 : some labels\n@enduml')

  const options = {
    headers: {'Content-Type': 'application/json'}
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/structure?host=localhost&database=plant&port=5432&user=postgres&password=1234`, options)
    .then(res => console.log(res.data.res[0].get_json))
  }, [])

  return (
    <div className="App">
      <img src={src}></img>
    </div>
  )
}

export default App

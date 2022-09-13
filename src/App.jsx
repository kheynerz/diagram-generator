import './App.css'
import { getUrl } from './helpers/helpers'

const App = () => {
  let src = getUrl('@startuml\nobject Object01\nobject Object02\nobject Object03\nobject Object04\nobject Object05\nobject Object06\nobject Object07\nobject Object08\nObject01 <|-- Object02\nObject03 *-- Object04\nObject05 o-- "4" Object06\nObject07 .. Object08 : some labels\n@enduml')

  return (
    <div className="App">
      <img src={src}></img>
    </div>
  )
}

export default App

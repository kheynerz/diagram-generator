import './App.css'
import { getUrl } from './helpers/helpers'

const App = () => {
  let src = getUrl('@startuml test\n\tAlice -> Bob: test\n@endUml')

  return (
    <div className="App">
      <img src={src}></img>
    </div>
  )
}

export default App

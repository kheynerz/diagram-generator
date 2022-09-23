import './App.css'

import { esquemas, parseUML,getUrl } from './helpers/helpers';

const App = () => {


  let parsed = parseUML(esquemas)
  let src = getUrl(parsed)
  console.log(parsed);
  return (
    <div className="App">
      <img src={src}></img>
    </div>
  );
}

export default App




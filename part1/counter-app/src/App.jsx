import { useState } from 'react';
import Display from './Display';
const App= () => {
  let [counter,setCounter] = useState(1);
  // setTimeout(()=>{
  //   setCounter(counter+1);
  // },1000);
  const increasebyone =()=>{
    setCounter(counter+1);
  }
  return(
    <div>
      <Display counter= {counter} />
      <button onClick={increasebyone}>plus one</button>
    </div>
  ) 
}
export default App;
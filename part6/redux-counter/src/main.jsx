import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { useState } from 'react'
import { createStore } from 'redux'

const CounterReducer= (state=0,action)=>{
  if(action.type==='ADD'){
    return state+1;
  }
  if(action.type==='SUBTRACT'){
    return state-1;
  }
  if(action.type==='RESET'){
    return 0;
  }
  return state;
}

const store = createStore(CounterReducer);
const App = () => {
  // const [counter, setCounter] = useState(0);

  const addCounter = () => {
    // setCounter(counter + 1);
    store.dispatch({type:'ADD'});
  }
  const subtractCounter = () => {
    // setCounter(counter - 1);
    store.dispatch({type:'SUBTRACT'});
  }
  const resetCounter = () => {
    // setCounter(0);
    store.dispatch({type:'RESET'});
  }
  return(
    <div>
      <div>{store.getState()}</div>
      <button onClick={addCounter}>Add</button>
      <button onClick={subtractCounter}>Subtract</button>
      <button onClick={resetCounter}>reset</button>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

store.subscribe(()=>{
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
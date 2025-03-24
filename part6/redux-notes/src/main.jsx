import { createRoot } from 'react-dom/client'
import { createStore, combineReducers} from 'redux'
import { Provider } from "react-redux"
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
const store = createStore(reducer);

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

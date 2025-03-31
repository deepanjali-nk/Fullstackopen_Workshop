import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import services from './services/notes';
import { createNote } from './reducers/noteReducer';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';

import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  // const [filter , setFi lter] = useState('ALL');
  const dispatch = useDispatch();
  useEffect(() => {
     services.getAll().then((response)=>{
        dispatch(createNote(response));
     });
  }, []);
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />

    </div>
  );
};

export default App;

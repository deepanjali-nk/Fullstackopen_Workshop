import { useSelector,useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NoteForm = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const addNote = (event) => {
        event.preventDefault();
        const newNote = {
          content: event.target.myInput.value,
          important: true,
          id: notes.length + 1 
        };
        dispatch(createNote(newNote));
        event.target.myInput.value = '';
      };
    return(
    <form onSubmit={addNote}>
        <input name="myInput" />
        <button type="submit">Add Note</button>
      </form>
    )
}

export default NoteForm;
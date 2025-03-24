import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const notes = useSelector((state) =>{
        if(filter === 'ALL'){
            return state.notes;
        }
        if(filter === 'NONIMPORTANT'){
            return state.notes.filter(note => !note.important);
        }
        return state.notes.filter(note => note.important === (filter === 'IMPORTANT'));
    });
    return(
        <ul>
            {notes.map(note =>
                <li key={note.id} onClick={() => dispatch(toggleImportanceOf(note.id))}>
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
            )}
        </ul>
    )
}

export default Note;
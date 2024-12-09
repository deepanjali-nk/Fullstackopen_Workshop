import { useState, useEffect } from "react";
import Notes from "./components/Notes";
import axios from 'axios';



const App= () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(()=>{
    console.log('effect');
    //1. get data from backend
    let myAxios= axios.get('http://localhost:3001/notes');
    myAxios.then((result)=>{
      console.dir(result.data);
      console.log('promise fulfilled');
      setNotes(result.data);

    })
  },[]);

  const notesToShow = notes.filter((note)=>(showAll ? true : note.important));
  const handleSubmit = (event) => { 
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() < 0.5
    }
    let postPromise=axios.post('http://localhost:3001/notes', myNote);
    postPromise.then((result)=>{
      console.log("created data return",result.data);
      setNotes(notes.concat(result.data) )  
      setNewNote('');
    })

  }
  const handleChange = (event) => {
    setNewNote(event.target.value);
  }
  const handleShowAll = () => {
    setShowAll(!showAll); 
  }
  const updateData = (id) => {
    console.log('update note', id);
    let currentNote=notes.find((note)=>note.id===id);
    console.log('current note', currentNote);
    let updatedNote={...currentNote,important:!currentNote.important}
    console.log('updated note', updatedNote);
  
    //1. update the server
    let putPromise=axios.put(`http://localhost:3001/notes/${id}`, updatedNote);
    putPromise.then((result)=>{
      console.log("updated data return",result );
    });
    console.log("return promise",putPromise);
    //2. update the state
    setNotes(notes.map((note)=>note.id===updatedNote.id? updatedNote:note));
  }
    

  return(
      <div>
        <h1>Notes</h1>
        <button onClick={handleShowAll}>
          Show {showAll ? 'important' : 'all'}
        </button>
        <ul>
          {notesToShow.map(value =>{
             return < Notes key={value.id} notes={value} updateNote={()=>{updateData(value.id)}}/>
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" value={newNote} onChange={handleChange}/>
          <button type="submit">Add Note</button>
        </form>
     
      </div>
    )
}

export default App;
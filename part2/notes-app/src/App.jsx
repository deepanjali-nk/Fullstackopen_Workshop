import { useState, useEffect } from "react";
import Notes from "./components/Notes";
import noteService from './services/notes';
import Notification from "./components/Notification";
import loginService from "./services/login";


const App= () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [notification,setNotification]= useState('');
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=>{
    console.log('effect');
    //1. get data from backend
    let myAxios= noteService.getAll();
    myAxios.then((result)=>{  
      console.dir(result);
      console.log('promise fulfilled');
      result.push({id: 100, content: 'fake note', important: true});+
      setNotes(result);

    }).catch((error)=>{
      console.log("error",error);
    });
    //lets get the user from local storage if it exists
    const loggedUserJSON=window.localStorage.getItem('loggedNoteappUser');
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON);
      setUser(user);
    }
  },[]);
  
  const notesToShow = notes.filter((note)=>(showAll ? true : note.important));

  const handleSubmit = (event) => { 
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() < 0.5
    }
    let postPromise=noteService.create(myNote,user.token);
    postPromise.then((result)=>{
      console.log("created data return",result.data);
      setNotes(notes.concat(result.data) )  
      setNewNote('');
    }).catch((error)=>{
      console.log("error",error);
      setNotification('error in creating note');
      setTimeout(()=>{
        setNotification();
      },5000);
      if(error.response.data.error==='invalid token'){
        setUser(null);
        window.localStorage.removeItem('loggedNoteappUser');
      }}
)};
  const handleChange = (event) => {
    setNewNote(event.target.value);
  }
  const handleShowAll = () => {
    setShowAll(!showAll); 
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try{
    let loggedUser= await loginService.login({username,password});
    console.log('logged user',loggedUser);
    setUser(loggedUser);
    window.localStorage.setItem('loggedNoteappUser',JSON.stringify(loggedUser));

    }catch(error){
      console.log('error',error);
      setNotification('wrong credentials');
      setTimeout(()=>{
        setNotification();
      },5000);
    }
  };

  const updateData = (id) => {
    console.log('update note', id);
    let currentNote=notes.find((note)=>note.id===id);
    console.log('current note', currentNote);
    let updatedNote={...currentNote,important:!currentNote.important}
    console.log('updated note', updatedNote);
  
    //1. update the server
    let putPromise=noteService.update(id,updatedNote);
    putPromise.then((result)=>{
      console.log("updated data return",result );
    }).catch((error)=>{
      console.log("error",error);
      if(error.response.status===404){
        setNotification(" sorry this note is fake");
        setTimeout(()=>{
          setNotification();
        },5000);
        // alert('the note is already deleted');
        setNotes(notes.filter((note)=>note.id!==id));
      }});
    console.log("return promise",putPromise);
    //2. update the state
    setNotes(notes.map((note)=>note.id===updatedNote.id? updatedNote:note));
  }
    
const loginForm = () => {
  return(
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )
}

const noteForm = () => {
  return(
    <form onSubmit={handleSubmit}>
    <input type="text" value={newNote} onChange={handleChange}/>
    <button type="submit">Add Note</button>
  </form>
  )
}
  return(
      <div>
        <h1 className="redbackground">Notes</h1>
        <Notification message={notification}/>
        <h1>Login Form</h1>
        {user === null ? loginForm() : <div><p>{user.name} logged-in</p>{noteForm()}</div>}
        <button onClick={handleShowAll}>
          Show {showAll ? 'important' : 'all'}
        </button>
        <ul>
          {notesToShow.map(value =>{
             return < Notes key={value.id} notes={value} updateNote={()=>{updateData(value.id)}}/>
          })}
        </ul>
       
     
      </div>
    )
}

export default App;
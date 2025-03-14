const Note= ({notes,updateNote }) => {
    return(
     
       <div>
         <li className="note">{notes.content}<button onClick={updateNote}>change {notes.important? 'true': 'false'}</button></li>
       </div>
    )
}
export default Note;

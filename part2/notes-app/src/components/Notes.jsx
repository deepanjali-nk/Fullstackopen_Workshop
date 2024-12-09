
const Notes= ({notes,updateNote }) => {
    return(
       <div>
         <li>{notes.content}<button onClick={updateNote}>change {notes.important? 'true': 'false'}</button></li>
       </div>
    )
}
export default Notes;
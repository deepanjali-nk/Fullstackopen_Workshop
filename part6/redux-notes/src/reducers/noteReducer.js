import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes';


const noteReducer = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      return state.concat(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    }
}
})

const makeNote= (newNote) => {
  return async (dispatch) => {
    const response = await noteService.createNew(newNote);
    dispatch(createNote(response));
  }
}

// const noteReducer = (state = initialState, action) => {
//     switch(action.type) {
//       case 'NEW_NOTE':
//         return state.concat(action.payload)
//       case 'TOGGLE_IMPORTANCE': {
//         const id = action.payload.id
//         const noteToChange = state.find(n => n.id === id)
//         const changedNote = { 
//           ...noteToChange, 
//           important: !noteToChange.important 
//         }
//         return state.map(note =>
//           note.id !== id ? note : changedNote 
//         )
//        }
//       default:
//         return state;
//     }
//   }

  // const createNote = (newNote) => {
  //   return({
  //     type: 'NEW_NOTE',
  //     payload: newNote,
  //   });
  // }

  // const toggleImportanceOf = (id) => {
  //   return({
  //   type: 'TOGGLE_IMPORTANCE',
  //   payload: { id }
  // });
  // }

  const { createNote, toggleImportanceOf } = noteReducer.actions

  export default noteReducer.reducer;
  export  {createNote, toggleImportanceOf, makeNote};
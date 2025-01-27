const express = require('express')
const app = express();
const cors = require('cors');


const mongoose = require('mongoose')

const url =`mongodb+srv://deepanjali:hey123@cluster0.ta6ys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)


app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

console.log('Hello');

let notes = []

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/json' })
//   response.end(JSON.stringify(notes));
// })

app.get("/api/notes",((request,response)=>{
    Note.find({}).then(notes=>{
      response.json(notes);
}); 
}))
app.get("/api/notes/:id",((request,response,next)=>{
  Note.findById(request.params.id).then(note=>{
    if(note){
      response.json(note);
    }else{
      response.status(404).send(`Theres no note at ${request.params.id}`);    }
  })
  .catch(error=>{
    next(error);
  })

}))
app.delete("/api/notes/:id",(request,response)=>{
  const getId= (request.params.id);
  notes=(notes.filter((note)=> note.id!==getId));

  response.status(204);

})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
};
app.use(errorHandler);

const PORT = process.env.PORT ? process.env.PORT :3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`)
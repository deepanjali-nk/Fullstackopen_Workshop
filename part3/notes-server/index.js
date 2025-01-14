const express = require('express')
const app = express();
app.use(express.json())

console.log('Hello');

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/json' })
//   response.end(JSON.stringify(notes));
// })

app.get("/api/notes",((request,response)=>{
    response.json(notes);
}))
app.get("/api/notes/:id",((request,response)=>{
  const getId= (request.params.id);
  const myNote=(notes.find((note)=> note.id===getId));

  if(myNote){
    response.json(myNote);
  }else{
    response.status(404).send(`Theres no note at ${getId}`);
  }
}))
app.delete("/api/notes/:id",((request,response)=>{
  const getId= (request.params.id);
  notes=(notes.filter((note)=> note.id!==getId));

  response.status(204).send(`The note at ${getId} has been deleted`)
}))

app.post("/api/notes",(request,response)=>{
  const myNewPost= request.body;
  myNewPost.id = notes.length+1;
  notes.push(myNewPost);
  console.log(myNewPost);
  response.status(201).json(myNewPost)

})
const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`)
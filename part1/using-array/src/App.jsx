import React from "react";
import SayHello from "./SayHello";

const App = () => {
  let peoplearr=[
    {firstName: "Deepa", lastName: "Nagarkoti", id: 1},
    {firstName: "Dikshya", lastName: "Balami", id: 2},
    {firstName: "Shriju", lastName: "Shrestha", id: 3},
  ];
  if(peoplearr.length===0){
    return <h1>No people</h1>
  }
  return peoplearr
  .filter((person)=> person.id>2)
  .map((value => (
  <SayHello person={value}/>

  )))
  // return(
  //   <div>
  //     {/* <SayHello 
  //       firstName={peoplearr[0].firstName} 
  //       lastName={peoplearr[0].lastName}/>
  //     <SayHello 
  //       firstName={peoplearr[1].firstName} 
  //       lastName={peoplearr[1].lastName}/>
  //    <SayHello 
  //       firstName={peoplearr[2].firstName} 
  //       lastName={peoplearr[2].lastName}/> */}
  //     {peoplearr.map((value => (<SayHello 
  //       // firstName={value.firstName}
  //       // lastName={value.lastName}
  //       key={value.id} 
  //       person={value}
  //       />
  //       )))}
      
    // </div>
  
};
export default App;

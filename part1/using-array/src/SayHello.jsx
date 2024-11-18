import React from "react";
const SayHello = ({person: {firstName,lastName,id}}) => {
  return <h1 id="one"> Hello {firstName} {lastName} {id}</h1>
};
export default SayHello; 
 
const History = ({history})=>{
   if(history.length===0){
     return(
       <div>no clicks yet</div>
     )
   }
   
    return(
        <div>
            click history: {history.join(" ")}
        </div>
    )
   
}
export default History;
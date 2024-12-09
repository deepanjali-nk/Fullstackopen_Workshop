import { useState } from 'react';
import MyButton from './MyButton';
import History from './History';

const App= () => {
  // let [left,setleft] = useState(1);
  // let [right,setright] = useState(1);
  let intialstate={
    left:0,
    right:0
  }
  let [clicks,setClicks]=useState(intialstate);
  let [clickHistory, setHistory] = useState([]);
  let [totalClick, setTotalClick] = useState(0);

  const increasebyoneleft =()=>{
    let newleft=clicks.left+1;
    let newstate={
      left:newleft,
      right:clicks.right
    }
    setClicks(newstate);
    // setHistory(clickHistory.concat('L'));
    setHistory([...clickHistory,'L']);
    setTotalClick(newleft+clicks.right);
  }

  const increasebyoneright =()=>{
      let newright=clicks.right+1;
      setClicks({left:clicks.left,right:clicks.right+1});
      setHistory([...clickHistory,'R']);
      setTotalClick(newright+clicks.left);

  };
  return(
    <div> 
      {clicks.left}
      <MyButton somefunction={increasebyoneleft} text="Increase by one"/>
      {clicks.right}
      <MyButton somefunction={increasebyoneright} text="Increase by one"/>
      <History history={clickHistory}/>
      {/* <div>click history:  {clickHistory}</div> */}
      <div>total clicks: {totalClick}</div>
    </div>
  ) 
}
export default App;
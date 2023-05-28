import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import {useEffect, useState} from 'react'
import { Button} from '@chakra-ui/react'
import { Routes ,Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import ChatPage from './component/ChatPage';

// const socket=io.connect("http://localhost:5000")
// const username=nanoid(4)
function App() {
  // const [message,setmessage]=useState('')
  // const [chat,setchat]=useState([])

  // useEffect(()=>{
  //   socket.on("chat",(payload)=>{
  //     setchat([...chat,payload])
  //   })
  // })

  // const handlechange=(e)=>{
  //    setmessage(
  //     e.target.value
  //    )
  // }
 

  // const handlesubmit=(e)=>{
  //   e.preventDefault()
  //   socket.emit("chat",{message,username});
  //   setmessage("")
  // }
  
  return (
    <div className="App">
    
        <Routes>
          <Route path="/" element={<Navbar/>}></Route>
          <Route path="/chats" element={<ChatPage/>}></Route>
        </Routes>
   
    </div>
  );
}

export default App;

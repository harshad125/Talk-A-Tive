import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import {useEffect, useState} from 'react'
import { Button} from '@chakra-ui/react'
import { Routes ,Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import ChatPage from './component/ChatPage';
import MeetRoom from './component/MeetRoom';

function App() {
  return (
    <div className="App">
    
        <Routes>
          <Route path="/" element={<Navbar/>}></Route>
          <Route path="/chats" element={<ChatPage/>}></Route>
          <Route path="/chats/meet/:roomid" element={<MeetRoom/>}></Route>
        </Routes>
   
    </div>
  );
}

export default App;

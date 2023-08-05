import React from 'react'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useParams } from 'react-router-dom';


function MeetRoom() {
     const {roomid}=useParams();
     console.log(roomid);
    const mymeet=async(element)=>{
        const appId=Number(process.env.REACT_APP_APPID);
        const serversecret=process.env.REACT_APP_SERVERSECRET;
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serversecret,roomid,Date.now().toString(),"guest meet");
        const zc=ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `localhost:3000/meet/${roomid}`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:true,
        });
    }
  return (
    <div >
       <div ref={mymeet} />
    </div>
  )
}

export default MeetRoom

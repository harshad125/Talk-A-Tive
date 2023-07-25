import React from 'react'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useParams } from 'react-router-dom';
function MeetRoom() {
     const {roomid}=useParams();
     console.log(roomid);
   // const roomid="acdfd1254"
    const mymeet=async(element)=>{
        const appId=285432938;
        const serversecret="ba8bc8a4968a29862b1a9c52bfc76421";
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

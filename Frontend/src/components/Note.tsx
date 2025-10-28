import React, { useContext, useEffect, useState } from 'react'
import "./styles/Note.css"
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../providers/AuthContext';

// type Data={
//   id:String,
//   tittle:String,
//   body:String,
//   favorite:boolean,
// }

// type prop={
// visData:Data|undefined,
// setVisData:React.Dispatch<React.SetStateAction<Data|undefined>>,
// data:Data[]|undefined,
// }


function Note(props:any) {
    const [title,setTitle]=useState(props.visData?.title);
    const [body,setBody]=useState(props.visData?.body);
    const context = useAuth();
    

  async function close(){
    
       Save()
        props.setVisData(undefined);
    
  }

  async function Save(){
     
    if(props.visData?.id==""){
      try {
        console.log(context?.user?.token)
        const updated =await axios.post("http://localhost:5000/data",{
          title,
          body,
        },
        {
          headers:{
           authorization: `Bearer ${context?.user?.token}`,
          }
        },)
         console.log(updated.data)
      } catch (error) {
          if(error?.response) console.log(error.response.data)
      }
      
       props.setVisData(undefined);
       props.setChange(prev=>!prev);
     return
    }

    try {
        const updated =await axios.put("http://localhost:5000/data",{
          id:props.visData?._id,
          title,
          body,
          favo
        },
        {
          headers:{
           authorization: `Bearer ${context?.user?.token}`,
          }
        })
        console.log(updated.data.data)
        
    } catch (error) {
      if(error?.response) console.log(error.response.data.toString())
      }
     props.setVisData(undefined);
     props.setChange(prev=>!prev);

  }


  return (
    <div className='main-card'>
      <div className="Note-container">
        <button className='x' onClick={close}>x</button>
        <input type="text" value={title?.toString()} onChange={(e)=>setTitle(e.target.value)} className='Note-tittle' name='title' placeholder='Tittle of the Note ...'/>
        <textarea rows={45} value={body?.toString()} onChange={(e)=>setBody(e.target.value)}  className='Note-body' name='body' placeholder='Body of the Note ....' />
        <button className='save-btn' onClick={Save}>save</button>
      </div> 
    </div>
  )
}

export default Note
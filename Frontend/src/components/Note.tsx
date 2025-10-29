import  {  useState } from 'react'
import "./styles/Note.css"
import { useAuth } from '../providers/AuthContext';
import api from '../api';
import type Data from '../providers/types';


interface NoteProps {
  visData: Data | undefined;
  setVisData: React.Dispatch<React.SetStateAction<Data | undefined>>;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}


function Note(props:NoteProps) {
  const [title, setTitle] = useState(props.visData?.title);
  const [body, setBody] = useState(props.visData?.body);
  const context = useAuth();


  async function close() {

    Save()
    props.setVisData(undefined);

  }

  async function Save() {

    if (props.visData?.id == "") {
      try {
        console.log(context?.user?.token)
        const updated = await api.post("/data", {
          title,
          body,
        },
          {
            headers: {
              authorization: `Bearer ${context?.user?.token}`,
            }
          },)
        console.log(updated.data)
      } catch (error: any) {
        if (error?.response) console.log(error.response.data)
      }

      props.setVisData(undefined);
      props.setChange(prev => !prev);
      return
    }

    try {
      const updated = await api.put("/data", {
        id: props.visData?._id,
        title,
        body,
        favorite: props.visData?.favorite,
      },
        {
          headers: {
            authorization: `Bearer ${context?.user?.token}`,
          }
        })
      console.log(updated.data.data)

    } catch (error: any) {
      if (error?.response) console.log(error.response.data.toString())
    }
    props.setVisData(undefined);
    props.setChange(prev => !prev);

  }


  return (
    <div className='main-card'>
      <div className="Note-container">
        <button className='x' onClick={close}>x</button>
        <input type="text" value={title?.toString()} onChange={(e) => setTitle(e.target.value)} className='Note-tittle' name='title' placeholder='Tittle of the Note ...' />
        <textarea rows={45} value={body?.toString()} onChange={(e) => setBody(e.target.value)} className='Note-body' name='body' placeholder='Body of the Note ....' />
        <button className='save-btn' onClick={Save}>save</button>
      </div>
    </div>
  )
}

export default Note
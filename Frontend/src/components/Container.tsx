import  { useEffect, useState } from 'react'
import "./styles/Container.css"
import { Link } from 'react-router-dom'
import icons from '../providers/images'
import Note from './Note'
import api from '../api'
import { useAuth } from '../providers/AuthContext.tsx'
import SignIn from './SignIn'
import Loading from './Loading.tsx'

type Data={
  _id:string,
  id:String,
  title:String,
  body:String,
  favorite:boolean,
}

function Container() {
  const [data,setData]=useState<Data[]|[]>();
  const [visData,setVisData]=useState<Data|undefined>();
  const [loading,setLoading]=useState(false);
  const [change,setChange]=useState(false)
  const [err,setErr]=useState("");
  const context=useAuth();
  const [favorites,setFavorites]=useState(false);

   const loadData=async()=>{
    try {

      setLoading(true);
      const user=context?.user;
      let user1=context?.user?.token;
      if(!user){
        const UserData= localStorage.getItem("notesUserData")
        if(!UserData){
          context?.setAuthenticated(false);
          return ;
        }
        const {name,token} =JSON.parse(UserData);

        context?.setUser({name:name,token:token})
        user1=token;
        context?.setAuthenticated(true);
      }

      const mdata = await api.get("/data", {
        headers: {
        authorization: `Bearer ${user1}`,
      }
      });
      console.log(mdata.data)
      context?.setAuthenticated(true);
      setData(mdata.data.data);
      setErr("");
      if (mdata.data?.data?.length == 0) {
        setData(DefaultData);
      } 

    } catch (error:any) {
        context?.setAuthenticated(false);
        console.log(error)
        if(error?.response) setErr(error.response.data.message);
         else
        setErr("Something went wrong");
    }finally{
      setLoading(false);
      setFavorites(false);
    }

  }

  const DefaultData=[
  {
    _id:"werrfd",
    id: "1",
    title: "Welcome to Notes!",
    body: "Hey there 👋 This is your first note! You can create, edit, and delete notes easily. Your data will be saved securely with your account.",
    favorite: true,
  },
  {
    _id:"dfsdcd",
    id: "2",
    title: "Ideas for Projects",
    body: "- Notes App with Authentication\n- Personal Expense Tracker\n- Habit Tracker\n- Recipe Organizer\n\nStart small, build something cool! 🚀",
    favorite: false,
  }]

  
  useEffect(()=>{
    loadData();
  },[change])


  function addNote(){

    setVisData({
    _id:"",
    id:"",
    title:"",
    body:"",
    favorite:false,
    });

  }


  function openNote(item:any){
    setVisData(item);
  }


  async function delNote(item:any){
     try {
        const updated = await api.delete("/data", {
          data: { id: item._id },
          headers: {
          authorization: `Bearer ${context?.user?.token}`,
          },
        });
        console.log(updated.data);
        setChange(prev=>!prev);
        
    } catch (error:any) {
      if(error?.response) console.log(error.response.data.toString())
      }
  }

  async function toggleFavo(item:any){
     try {
        const updated = await api.put("/data", {
          id:item._id,
          title:item.title,
          body:item.body,
          favorite:!item.favorite,
        },
        {
          headers:{
           authorization: `Bearer ${context?.user?.token}`,
          }
        })
        setChange(prev=>!prev);
        console.log(updated);
        
    } catch (error:any) {
      if(error?.response) console.log(error.response.data.toString())
      }
  }
  
  function filterFavorites(){
    const filtered = data?.filter((item=>item.favorite))
    console.log(filtered)
    setData(filtered);
    setFavorites(true);
  }

  return (
    <>
    <div className='main'>
        <div className='sideBar'>
            <button className={!favorites?"active":""} onClick={loadData} >
                🗒️ All
            </button>
            <button onClick={filterFavorites} className={favorites?"active":""}>
                ⭐ Favorites
            </button>
            <button>
                <Link to="/settings" className='Link' >⚙️ Settings</Link>
            </button>
        </div>
        <div className='cardContainer' >
            <label >{err}</label>
            {data&&data.map((item)=>(
                 <div className="card" onClick={()=>openNote(item)} key={item._id}>
                  <h3>{item.title}
                    <div className='buttons'>
                     <button className='star' onClick={(e)=> {
                        e.stopPropagation();
                        toggleFavo(item);
                        }}>
                          {item.favorite ?(<>⭐</>):(<>☆</>)}
                      </button> 
                     <button className='del-button' onClick={(e)=> {
                        e.stopPropagation();
                        delNote(item);
                        }}>
                      🗑️
                      </button>   
                    </div> 
                </h3>   
                <p className='note'>
                    {item.body}
                </p>
                <div className='time'>
                    
                </div>
            </div>
            ))}
        </div>
        <button className='new-button' onClick={()=>addNote()}>
        <img src={icons.NewNote} alt="new note" />
        </button>
    </div>
    {!context?.isAuthenticated && <SignIn/>}
    {loading&&<Loading/>}
    {visData&&<Note visData={visData} setVisData={setVisData} data={data} setChange={setChange}/>}
    </>
    
  )
}


export default Container
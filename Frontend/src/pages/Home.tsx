import Header from '../components/Header'
import Container from '../components/Container'
import SignIn from '../components/SignIn'
import { useAuth } from '../providers/AuthContext'



function Home() {
  const context=useAuth();
  
  
  return (
    <div >
        <Header/>
        <Container/>
        
    </div>
  )
}

export default Home
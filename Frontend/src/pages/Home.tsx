import Header from '../components/Header'
import Container from '../components/Container'
import { useAuth } from '../providers/AuthContext'



function Home() {
  
  return (
    <div >
        <Header/>
        <Container/>
        
    </div>
  )
}

export default Home
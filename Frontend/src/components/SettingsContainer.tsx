import "./styles/settings.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../providers/AuthContext'
import SignIn from './SignIn';

function SettingsContainer() {
  const context = useAuth();
  return (
    <div className='main'>
      <div className='sideBar'>
        <button>
          <Link to="/" className='Link'>🗒️ All</Link>
        </button>
        <button >
          <Link to="/" className='Link'>⭐ Favorites</Link>
        </button >
        <button className='active'>⚙️ Settings</button>
      </div>
      <div className='settings-container'>
        <button className='sign-out' onClick={context?.logout}> Sign Out</button>
      </div>
      {!context?.isAuthenticated && <SignIn />}
    </div>
  )
}

export default SettingsContainer
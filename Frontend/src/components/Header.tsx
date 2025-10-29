import "./styles/Header.css"
import icons from "../providers/images.ts"
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className="Header">
      <div>
        <h1 className="header-title">
          <Link to="/" className='Link'>MY NOTES</Link>
        </h1>
      </div>
      <div className="search-bar" >
        <input type="text" id="search" placeholder='Search' />
        <img src={icons.SearchIcon} alt="search button" className='search-icon' />
      </div>
    </div>
  )
}

export default Header
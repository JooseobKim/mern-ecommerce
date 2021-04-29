import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() { 
  // ContextAPI 사용자
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  const [cartItem] = state.userAPI.cart
  const [menu, setMenu] = useState(false)
  
  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href = "/"
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product">Create Products</Link></li>
        <li><Link to="/category">Categories</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }
  
  const toggleMenu = () => setMenu(!menu)
  const styleMenu = {
    left: menu ? 0 : "-100%"
  }

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30px" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? 'Admin' : 'Ecommerce'}
          </Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">
            {isAdmin ? 'Products' : 'Shop'}
          </Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? 
        loggedRouter() : 
        <li>
          <Link to="/login">Login or Register</Link>
        </li>}
        
        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30px" className='menu' />
        </li>
      </ul>

      {isAdmin ?
      '' :
      <div className="cart-icon">
        <span>{cartItem.length}</span>
        <Link to="/cart">
          <img src={Cart} alt="" width="30px" />
        </Link>
      </div>}
     
    </header>
  )
}

export default Header

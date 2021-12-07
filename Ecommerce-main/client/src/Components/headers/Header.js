import React, {useState, useContext} from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './menu.svg';
import Close from './close.svg';
import Cart from './cartx.png';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Search from './search.svg';
import Logo from './ss4.png'

function Header(){
    const state = useContext(GlobalState)
    const [isLogged] = state.APIUser.isLogged
    const [isAdmin] = state.APIUser.isAdmin
    const [cart] = state.APIUser.cart
    const [search, setSearch] = state.APIProduct.search

    const adminRouter = () => {
        return(
            <>
                <li><Link to ="/add_product">ADD PRODUCT</Link></li>
                <li><Link to ="/brand">BRANDS</Link></li>

            </>
        )
    }

    const logoutUser = async ()=> {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    }

    const loggedRouter = () => {
        return(
            <>
                <li><Link to ="/order_history">ORDERS</Link></li>
                <li><Link to ="/" onClick={logoutUser}>LOGOUT</Link></li>

            </>
        )
    }

    return(
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30"></img>
            </div>
            <Link to="/"><img src={Logo} alt="" className="logs"></img></Link>
            <ul className="nav">

                <li className="na"><Link to="/"></Link></li>
                
                <div className="search">
                <input type="text" value={search} placeholder="Search"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            <img src={Search} className="fas" alt="" width="15" />
            </div>

            

                

                {isAdmin && adminRouter()}{
                    isLogged ? loggedRouter() : <li><Link to="/login">Login / Register</Link></li> 
                }
    
                <li>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
            </ul>

            {isAdmin ? '' :
                <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                        <img src={Cart} alt="" width="30" className="fast"/>
                        </Link>
                        
                    </div>
            }
            
        </header>

        
    )
}

export default Header;
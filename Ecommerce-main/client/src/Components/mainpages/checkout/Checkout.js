import React, {useContext,useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
//import confirm from './confirm.svg';
import axios from 'axios'



function Checkout() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [cart, setCart] = state.APIUser.cart
    const [userInfoo]=state.APIUser.user
    const [userInfo, setUserInfo] = useState(userInfoo)
    const [total, setTotal] = useState(0)
    console.log(cart)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()

    },[cart])

    
    const updateCart = async (cart) =>{
        await axios.patch('/user/add_to_cart', {cart}, {
            headers: {Authorization: token}
        })
    }

    console.log(total)
    
    const [user, setUser] = useState({
        address: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setUserInfo({...userInfo, [name]:value})
    }

    

    const checkoutSubmit = async e =>{
        e.preventDefault()
        try {

        await axios.post('/api/order', {cart, ...user, total, ...userInfo}, {
            headers: {Authorization: token}
        })

        setCart([])
        updateCart([])
        console.log(cart)
        alert("You have successfully placed an order.")
        

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return(
        <div className="over">
        <div className="checkout-page">
        <h2>Checkout</h2>
            <form onSubmit={checkoutSubmit}>

            <div className="c">    
            <div className="txt_field">
                <input type="fname" name="fname" required 
                 value={userInfo.fname} onChange={onChangeInput}/>
                 <span></span>
                <label>First Name</label>
                </div>

                <div className="txt_field">
                <input type="lname" name="lname" required 
                 value={userInfo.lname} onChange={onChangeInput}/>
                 <span></span>
                <label>Last Name</label>
                </div>

                <div className="txt_field">
                <input type="contact" name="contact" required 
                 value={userInfo.contact} onChange={onChangeInput}/>
                 <span></span>
                <label>Contact</label>
                </div>

                <div className="txt_field">
                <input type="email" name="email" required 
                 value={userInfo.email} onChange={onChangeInput}/>
                 <span></span>
                <label>Email</label>
                </div>

                <div className="txt_field">
                <input type="address" name="address" required 
                 value={user.address} onChange={onChangeInput}/>
                 <span></span>
                <label>Address</label>
                </div>
                </div>

                <div className="row">
                   
                  <button type="submit">Place Order</button>
                    


                </div>
            </form>
            <Link to ="/cart" className="back">Back to cart</Link>
        </div>
        </div>
    )
}
    

   
export default Checkout
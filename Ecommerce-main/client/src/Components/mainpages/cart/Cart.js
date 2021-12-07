import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import Checkout from  '../checkout/Checkout'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.APIUser.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    console.log(cart)

    useEffect(() => {
        getTotal()
    }, [cart])

    const getTotal = () => {
        const total = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity)
        }, 0)

        setTotal(total)
    }



    const addToCart = async (cart) => {
        await axios.patch('/user/add_to_cart', { cart }, {
            headers: { Authorization: token }
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
        // getTotal();

    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
        // getTotal();

    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
            // getTotal();
        }
    }




    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    return (
        <div className="cart_page">
            <h1>Shopping Cart</h1>
            
            {
                cart.map(product => (
                    
                    <div className="cart" key={product._id}>
                        
                        <img src={product.image.url} alt="" />
                        <h2>{product.name}</h2>
                        <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                        </div>
                        <h3>Rs. {product.price * product.quantity}</h3>
                        
                        
                        <div className="delete" onClick={() => removeProduct(product._id)}>
                                X
                        </div>
                        
                    </div>
                    
                )
                )
            
            }
            
            

            <div className="total">
                <h3>Total: Rs. {total}</h3>
                <Link to="/checkout">CheckOut</Link>
            </div>
        </div>
    )
}

export default Cart
import { useState, useEffect } from 'react'
import axios from 'axios'

function APIUser(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/user_info', {
                        headers: { Authorization: token }
                    })

                    console.log(res)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    if (res?.data?.cartItems)
                        setCart(res.data.cartItems)
                    
                        if (res?.data)
                        setUser(res.data)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()

        }
    }, [token])

 


    const addCart = async (product) => {
        if (!isLogged) return alert("Please login to continue buying")
       
        var check = cart?.every(item => {
            return item._id !== product._id
        });
        console.log(check)

        if (check) {
            if (product.stock<0){
              alert("This product is out of stock")  
            }
            else{
            setCart([...cart, { ...product, quantity: 1 }])
            
            await axios.patch('/user/add_to_cart', {cart: [...cart, {...product, quantity: 1}]},{
                headers: {Authorization: token}
                
            })

            alert("Added to cart.")
        }

        } else {
            alert("This product has already been added to cart.")
        }

    }

    console.log(user)

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        user: [user, setUser],
    }
}

export default APIUser;
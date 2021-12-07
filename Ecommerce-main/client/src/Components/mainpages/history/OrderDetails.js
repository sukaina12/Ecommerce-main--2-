import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.APIUser.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])
    console.log(orderDetails)
    console.log(history)

    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.user_id}</td>
                        <td>{orderDetails.fname + ' ' + orderDetails.lname}</td>
                        <td>{orderDetails.address}</td>
                        <td>{orderDetails.contact}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cartItems.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.image.url} alt="" className="imgi" /></td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Rs. {item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>

            <div className="total">
                <h3>Total: Rs. {orderDetails.total}</h3>
            </div>
        </div>
    )
}

export default OrderDetails
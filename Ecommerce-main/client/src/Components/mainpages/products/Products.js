import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/productItem'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore.js'
import Imgs from './ss3.png'

function Products(){
    const state = useContext(GlobalState)
    const [products, setProducts] = state.APIProduct.products
    const [isAdmin] = state.APIUser.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.APIProduct.callback
    //const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            //setLoading(true)
            const removeImage = axios.post('/api/remove', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await removeImage
            await deleteProduct
            setCallback(!callback)
            //setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.image.public_id)
        })
    }

    

    return(
        <div className="x">
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select All</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <div className="del">
                <button onClick={deleteAll}>Delete</button>
                </div>
            </div>
        }
        <div className="pg">
        
       <img src={Imgs} alt="" className="st"></img>

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>
        </div>

        <LoadMore />
        {products.length === 0 }
        </div>
    )
}

export default Products;
import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/productItem'

function ProductDetail(){
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.APIProduct.products
    const addCart = state.APIUser.addCart
    const [productDetails, setDetailProduct] = useState([])

    useEffect(() =>{
        console.log('re render')
        if(params.id){
        console.log(params.id)
            products.forEach(product => {
                
                console.log(product._id)
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    console.log(productDetails)

    if(productDetails.length === 0) return null;
    return(
        <>
        
            <div className="detail">
                <img src={productDetails.image.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{productDetails.name}</h2>
                        <h6>SKU: {productDetails.SKU}</h6>
                    </div>
                    <span>Rs. {productDetails.price}</span>
                    <p>{productDetails.description}</p>
                    <p>{productDetails.content}</p>
                    <p>Stock: {productDetails.stock}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => {
                        if (productDetails.stock < 1) alert("Out of stock")
                        else state.APIUser.addCart(productDetails)
                    }}
                    >
                        Buy Now
                    </Link>
                </div>
                
            </div>

            <div className="rp">
            <h2>Related products</h2>
            <div className="products">
                {
                    products.map(product => {
                        return product.category === productDetails.category 
                            ? <ProductItem key={product._id} product={product}/> : null
                    })
                }
            </div>
            </div>
        </>
    )
}

export default ProductDetail
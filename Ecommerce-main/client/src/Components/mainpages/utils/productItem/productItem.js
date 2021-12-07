import React from 'react'
import { Link } from 'react-router-dom'
import Button from './button'

function productItem({ product, isAdmin, deleteProduct, handleCheck }) {


    //console.log(product)
    return (
        <div className="product_card">
            <div className="stock">
            {product.stock === 0 ?
                <p> Out of Stock</p> : null}
            </div>
            <div>
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }
           </div>

            <img src={product.image.url} alt="" />

            <div className="product_box">
                <h5 name={product.name}>{product.name}</h5>
                <span>Rs. {product.price}</span>
                
            </div>


            <Button product={product} deleteProduct={deleteProduct} />

        </div>
    )
}

export default productItem
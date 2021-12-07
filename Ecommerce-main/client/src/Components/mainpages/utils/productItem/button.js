import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function Button({ product, deleteProduct }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.APIUser.isAdmin
    const [outOfStock, setStock] = useState(false)

    // useEffect(() => {
    //     const getStock = async () => {
    //         if (product.quantity < 0)
    //             setStock(true)
    //     }
    //     getStock()
    // }, [product])


    //const addCart = state.APIUser.addCart()


    return (
        <div className="row_btn">
            {

                isAdmin ?
                    <>
                        <Link id="btn_buy" to="#!" onClick={() => deleteProduct(product._id, product.image.public_id)} >
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    : <>

                        <Link id="btn_buy" to="#!" onClick={() => {
                            if (product.stock < 1) alert("Out of stock")
                            else state.APIUser.addCart(product)
                        }}>
                            Buy
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            View
                        </Link>

                    </>
            }

        </div>
    )
}

export default Button
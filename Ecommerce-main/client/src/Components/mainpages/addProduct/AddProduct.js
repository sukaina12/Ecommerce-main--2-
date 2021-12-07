import React, { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import { useParams } from 'react-router-dom'
import { } from 'react-router-dom'



function AddProduct() {
    const state = useContext(GlobalState)
    const refs = useRef()
    const [product, setProduct] = useState(
        {
            SKU: '',
            name: '',
            price: '',
            stock: '',
            description: '',
            category: '',
            brand: '',
            stock: '',
            _id: ''
        }
    )
    const [brand] = state.APIBrand.brand
    const [image, setImages] = useState(false)

    const [token] = state.token
    //  const history = useHistory()

    const param = useParams()

    const [products] = state.APIProduct.products
    const [onEdit, setOnEdit] = useState(false)
    const categories = ["Food Staple", "Makeup", "Fragnances", "Bath and Body", 
                        "Frozen Food", "Beverages", "Snacks", "Phones", "Electronics"]
    const [callback, setCallback] = state.APIProduct.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.image)
                }
            })
        } else {
            setOnEdit(false)
            setImages(false)
            //   history.push("/")
        }
    }, [param.id, products])

    const uploadImage = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("Please upload an image.")

            if (file.size > 1024 * 1024)
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            // setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            // setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const removeImage = async () => {
        try {
            await axios.post('/api/remove', { public_id: image.public_id }, {
                headers: { Authorization: token }
            })

            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const changeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const Submit = async e => {
        e.preventDefault()
        try {
            if (!image) return alert("No Image Upload")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, image }, {
                    headers: { Authorization: token }
                })
            } else {
                const res = await axios.post('/api/products', { ...product, image }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
                setImages('')
                if (refs) {
                    refs.current.value = ''
                }
                // document.body.getElementById('file_up').value = '';
            }
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: image ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input ref={refs} type="file" name="file" id="file_up" onChange={uploadImage} />
                {
                    // loading ? <div id="file_img"><Loading /></div>

                    <div id="file_img" style={styleUpload}>
                        <img src={image ? image.url : ''} alt="" />
                        <span onClick={removeImage}>X</span>
                    </div>
                }

            </div>

            <form onSubmit={Submit}>
                <div className="row">
                    <label htmlFor="SKU">SKU</label>
                    <input type="text" name="SKU" id="SKU" required
                        value={product.SKU} onChange={changeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required
                        value={product.name} onChange={changeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={product.price} onChange={changeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={changeInput} />
                </div>

                <div className="row">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" id="stock" required
                        value={product.stock} rows="7" onChange={changeInput} />
                </div>

                <div className="row">
                    <label htmlFor="brand">Brand: </label>
                    <select name="brand" value={product.brand} onChange={changeInput} >
                        <option value="">Please select a brand</option>
                        {
                            brand.map(brand => (
                                <option value={brand.name} key={brand.name}>
                                    {brand.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label htmlFor="brand">Category: </label>
                    <select name="category" value={product.category} onChange={changeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category} >
                                    {category}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "Update" : "Add"}</button>
            </form>
        </div>
    )
}

export default AddProduct
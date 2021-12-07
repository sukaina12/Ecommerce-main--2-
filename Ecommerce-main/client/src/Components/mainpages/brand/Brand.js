import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Brand() {
    const state = useContext(GlobalState)
    const [brands] = state.APIBrand.brand
  
        const [brand, setBrand] = useState({
            name: '', email: '',  contact: ''
        })
    const [token] = state.token
    const [callback, setCallback] = state.APIBrand.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setBrand({...brand, [name]:value})
    }

    const createBrand = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/brand/${id}`, {...brand},  {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/brand', {...brand}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setBrand('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editBrand = async (id, brand) =>{
        setID(id)
        setBrand(brand)
        setOnEdit(true)
    }

    const deleteBrand = async id =>{
        try {
            const res = await axios.delete(`/api/brand/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="brands">
            <form onSubmit={createBrand}>
                <label htmlFor="brand">Brand Name</label>
                <div className="txt_field">
                <input type="name" name="name" required 
                value={brand.name} onChange={onChangeInput}/>
                </div>

                <label htmlFor="brand">Brand Email</label>
                <div className="txt_field">
                <input type="email" name="email" required 
                value={brand.email} onChange={onChangeInput}/>
                </div>

                <label htmlFor="brand">Brand Contact</label>
                <div className="txt_field">
                <input type="contact" name="contact" required 
                value={brand.contact} onChange={onChangeInput}/>
                </div>


                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    brands.map(brand => (
                        <div className="row" key={brand._id}>
                            <p>{brand.name}</p>
                            <p>{brand.contact}</p>
                            <p>{brand.email}</p>

                            <div>
                                <button onClick={() => editBrand(brand._id,brand)}>Edit</button>
                                <button onClick={() => deleteBrand(brand._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}



export default Brand
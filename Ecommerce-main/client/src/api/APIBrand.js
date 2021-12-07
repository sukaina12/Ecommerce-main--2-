import {useState, useEffect} from 'react'
import axios from 'axios'

function APIBrand() {
    const [brand, setBrand] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getBrand = async () =>{
            const res = await axios.get('/api/brand')
            setBrand(res.data)
        }

        getBrand()
    },[callback])
    return {
        brand: [brand, setBrand],
        callback: [callback, setCallback]
    }
}

export default APIBrand
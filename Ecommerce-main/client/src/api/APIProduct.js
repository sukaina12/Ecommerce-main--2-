import React,{useState, useEffect} from 'react'
import axios from 'axios'


function APIProduct() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page*15}&${brand}&${category}&${sort}&name[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
            
        }
        getProducts()
    },[callback, brand, sort, search, page,category])
    console.log(brand)
    console.log(category)
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        brand: [brand, setBrand],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default APIProduct
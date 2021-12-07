import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [brands] = state.APIBrand.brand
    const [brand, setBrand] = state.APIProduct.brand
    const [search, setSearch] = state.APIProduct.search
    const [category, setCategory] = state.APIProduct.category
    const categories = ["Food Staple", "Makeup", "Fragnances", "Bath and Body", 
    "Frozen Food", "Beverages", "Snacks", "Phones", "Electronics"]
    const [sort, setSort] = state.APIProduct.sort
   


    const filterBrand = e => {
        setBrand(e.target.value)
        setSearch('')
    }

    const filterCategory = e => {
        setCategory(e.target.value)
        console.log(category)
        setSearch('')
    }

    return (
        <div className="filter_menu">
        
            <div className="row">
                <span>Brand: </span>
                <select name="brand" value={brand} onChange={filterBrand} >
                    <option value=''>None</option>
                    {
                        brands.map(brand => (
                            <option value={"brand=" + brand.name} key={brand._id}>
                                {brand.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="row">
                <span>Category: </span>
                <select name="category" value={category} onChange={filterCategory} >
                    <option value=''>None</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
    

            

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>New</option>
                    <option value='sort=oldest'>Old</option>
                    <option value='sort=-sold'>Best selling</option>
                    <option value='sort=-price'>Price: High-Low</option>
                    <option value='sort=price'>Price: Low-High</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
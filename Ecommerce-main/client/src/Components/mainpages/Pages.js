import React,  {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import Products from './products/Products';
import AddProduct from './addProduct/AddProduct';
import ProductDetail from './productDetail/productDetail';
import Login from './auth/Login';
import Register from './auth/Register';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Cart from './cart/Cart';
import Brand from './brand/Brand';
import Checkout from './checkout/Checkout';
import NotFound from './utils/NotFound/NotFound';
import {GlobalState} from '../../GlobalState'

function Pages(){
    const state = useContext(GlobalState)
    const [isLogged] = state.APIUser.isLogged
    const [isAdmin] = state.APIUser.isAdmin
    return(
        <Routes>
            <Route path="/" exact element={<Products/>}/>
            <Route path="/detail/:id" exact element={<ProductDetail/>}/>
            <Route path="/add_product" exact element={isAdmin ? <AddProduct/> : <NotFound/>}/>
            <Route path="/edit_product/:id" exact element={isAdmin ? <AddProduct/> : <NotFound/>}/>
            <Route path="/login" exact element={isLogged ? <NotFound/> : <Login/>}/>
            <Route path="/Register" exact element={isLogged ? <NotFound/> : <Register/>}/>
            <Route path="/brand" exact element={isAdmin ? <Brand/> : <NotFound/>}/>
            <Route path="/order_history" exact element={isLogged ? <OrderHistory/> : <NotFound/>}/>
            <Route path="/order_history/:id" exact element={isLogged ? <OrderDetails/> : <NotFound/>}/>
            <Route path="/cart" exact element={<Cart/>}/>
            <Route path="/checkout" exact element={<Checkout/>}/>
            <Route path="*" exact element={<NotFound/>}/>
        </Routes>
    )
}

export default Pages;
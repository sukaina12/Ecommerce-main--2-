import React, {createContext, useState, useEffect} from 'react';
import APIProduct from './api/APIProduct'
import APIUser from './api/APIUser'
import APIBrand from './api/APIBrand'
import  axios from  'axios'

export const GlobalState = createContext();

export const DataProvider = ({children}) =>{

    const [token, setToken] =  useState(false)

    
    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')

        if (firstLogin){
            const refreshToken = async() => {
            const res = await axios.get('/user/refresh_token')
            console.log(res)
            setToken(res.data.accesstoken)

            setTimeout(() => {
                refreshToken()
            }, 10  * 60 * 1000)
        }
    

        refreshToken()
        }
        
    },[])

    const state = {
        token: [token, setToken],
        APIProduct: APIProduct(),
        APIUser: APIUser(token),
        APIBrand: APIBrand()
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
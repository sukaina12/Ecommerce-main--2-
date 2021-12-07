import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register(){

    const [user, setUser] = useState({
        fname:'', lname:'', email: '',password: '', contact: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return(
        <div className="Regj">
         <div className="container">
             <div className="title">Registeration</div>
             <form onSubmit = {registerSubmit}>

               <div className="user_details">
                   <div className="input-box">
                   <input type="text" name="fname" required
                       value ={user.fname} onChange={onChangeInput}/>
                         <span></span>
                         <label>First Name</label>
                   </div>

                   <div className="input-box">
                   <input type="text" name="lname" required
                        value ={user.lname} onChange={onChangeInput}/>
                         <span></span>
                         <label>Last Name</label> 
                   </div>

                   <div className="input-box">
                       <input type="email" name="email" required
                       value ={user.email} onChange={onChangeInput}/>
                         <span></span>
                         <label>Email</label>
                   </div>

                   <div className="input-box">
                        <input type="text" name="contact" required
                        value ={user.contact} onChange={onChangeInput}/>
                         <span></span>
                         <label>Contact Number</label>  
                   </div>

                   

                   <div className="input-box">
                        <input type="password" name="password" required
                        value ={user.password} onChange={onChangeInput}/>
                         <span></span>
                         <label>Password</label>
                   </div>

                   <div className="input-box">
                        <input type="password" name="conpassword" required/>
                         <span></span>
                         <label>Confirm Password</label>
                   </div>
               </div>

               
               
               <div className="sub">
                  <button type="submit">Register</button>
                </div>

             </form>
         </div>
        </div>
    )
}

export default Register;
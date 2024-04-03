import React from "react";
import {useDispatch} from 'react-redux'
import {logOut} from '../../store/authSlice'
import authservice from "../../appwrite/auth";

function logOutBtn(){
    const dispatch=useDispatch()
    const logOutHanadler = () =>{
        authservice.logOut().then(()=>{
            dispatch(logOut())
        })
    }
    return(
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logOutHanadler}>
            Logout
        </button>
    )
}

export default logOutBtn
import React,{useState} from "react";
import authservice from "../appwrite/auth";
import {Link,useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from "./index"
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {useForm} from 'react-hook-form'

function SignUp(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const[error,setError]=useState("")
    const {register,handleSubmit}=useForm()

    const sign=async(data)=>{
        setError("")
        try {
            const userData=await authservice.createAccount(data)
            if (userData) {
                const userData=await authservice.getCurrUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account
                    <Link 
                    to='/login'
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign in</Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}/>
                <div className="space-y-5">
                    <Input
                    label="Name"
                    placeholder="Enter your name"
                    {...register("name",{
                        required:true
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                        matchPattern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                    })}
                    />
                    <Input
                    label="Password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true
                    })}/>
                    <button type="submit" className="w-full">Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
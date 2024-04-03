import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from "./index"
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import {useForm} from 'react-hook-form'

function Login(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("")
    const {register,handleSubmit}=useForm()

    const login=async(data)=>{
        setError("")
        try {
            const session=await authservice.login(data)
            if(session){
                const userData=await authservice.getCurrUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(data.error)
        }
    }
    return(
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full maax-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-light">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-8">
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
                    label="PassWord:"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password",{
                        required:true
                    })}/>
                    <Button
                    type="submit"
                    className="w-full">Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
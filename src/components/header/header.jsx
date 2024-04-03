import React from "react";
import {Container,Logo,logOutBtn} from '../index'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    const navigate=useNavigate()
    const navItems=[
        {
            name:'Home',
            slug:'/',
            status:true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return(
        <Header className="py-3 bg-grey-500 shadow">
            <Container>
                <nav className="flex">
                    <div>
                        <Link to='/'>
                            <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex-ml-auto">
                        {navItems.map((item)=>
                        item.active?(
                            <li key={item.name}>
                                <button onClick={()=>navigate(item.slug)}
                                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                                {item.name}</button>
                            </li>
                        ):null
                        )}
                        {authStatus && (
                            <li>
                                <logOutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </Header>
    )
}

export default Header
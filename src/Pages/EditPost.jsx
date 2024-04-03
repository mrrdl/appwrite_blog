import React, { useState } from "react";
import service from "../appwrite/config";
import { Container , PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditPost(){
    const[post,setPosts]=useState(null)
    const navigate=useNavigate()
    const {slug}=useParams()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post)=>{
                if (post) {
                    setPosts(post)
                }
            })
        }
    },[slug,navigate])

    return post?(
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}

export default EditPost
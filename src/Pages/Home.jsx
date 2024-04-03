import React, { useEffect, useState } from "react";
import {Container,PostForm} from '../components'
import service from "../appwrite/config";

function Home(){
    const[post,setPost]=useState(null)
    useEffect(() => {
        service.getPosts().then((post) => {
            if (post) {
                setPost(post.documents)
            }
        })
    },[])

    if (post.length == 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {post.map((posts)=>(
                        <div key={posts.$id} className="p-2 w-1/4">
                            <PostForm {...posts}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
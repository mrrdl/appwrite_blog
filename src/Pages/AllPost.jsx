import React, { useEffect, useState } from "react";
import {Container,Card} from '../components'
import service from '../appwrite/config'

function AllPost(){
    const [posts,setPosts]=useState([])
    service.getPosts([]).then((posts)=>{
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="m-5 p-4">
                            <Card post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
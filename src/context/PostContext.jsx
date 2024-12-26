import { createContext, useState } from "react";

export const PostContext = createContext();

export default function PostProvider({children}){

    const [PostData, setPostData] = useState(null)

    return(
        <PostContext.Provider value={{PostData, setPostData}}>

        </PostContext.Provider>
    )
}
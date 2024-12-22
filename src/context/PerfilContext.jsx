import { createContext, useState } from "react";

export const PerfilContext = createContext();

export default function PerfilProvider({children}){

    const [PerfilData, setPerfilData] = useState({
        userId: "",
        username: "",
        name: "",
        profileImage: "",
        bio: "",
        seguidores: [],
        seguindo: [],
        posts: [],
        createdAt: ""
    })

    return (
        <PerfilContext.Provider value={{PerfilData, setPerfilData}}>
            {children}
        </PerfilContext.Provider>
    )
    
}
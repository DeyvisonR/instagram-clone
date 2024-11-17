import { createContext, useState } from "react";

export const PerfilContext = createContext();

export default function PerfilProvider({children}){

    const [PerfilData, setPerfilData] = useState(null)

    return (
        <PerfilContext.Provider value={{PerfilData, setPerfilData}}>
            {children}
        </PerfilContext.Provider>
    )
    
}
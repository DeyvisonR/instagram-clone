import PerfilProvider from "./perfilContext";


export default function AppProvider({children}){
    return (
        <PerfilProvider>
            {children}
        </PerfilProvider>
            
    )
}
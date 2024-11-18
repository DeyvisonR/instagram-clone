import { useState } from "react";
import styles from "../ButtonMostrar/ButtonMostrar.module.css";

export default function ButtonMostrar({elementoMostrarId, ButtonMostrar}){
    
        
    const [mostrar, setMostrar] = useState(true)

    function MostrarSenha(){
        let inputSenha = document.getElementById(elementoMostrarId);
        let mostrarButton = document.querySelector("#"+ButtonMostrar);
        if(mostrar){
            inputSenha.type = "text";
            mostrarButton.innerHTML = "Ocultar";
            setMostrar(!mostrar)
        }else{
            inputSenha.type = "password";
            mostrarButton.innerHTML = "Mostrar";
            setMostrar(!mostrar)
        }
    }

    return(
        <p><span id={ButtonMostrar} onClick={MostrarSenha} className={styles.mostrar__senha__form}>Mostrar</span></p>
    )
    
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase';
import styles from "../JanelaModalCadastrar/JanelaModalCadastrar.module.css";
import ButtonMostrar from '../ButtonMostrar/ButtonMostrar';

export default function JanelaModalCadastrar({setUser}){

    function closeModal(){
        let JanelaModalVar = document.getElementById("janela-cadastrar");
        JanelaModalVar.style.display = "none";
    }

    async function cadastrarNewUser(e){
        e.preventDefault()
        let user = document.getElementById("user-cadastrar").value;
        let email = document.getElementById("email-cadastrar").value;
        let password = document.getElementById("password-cadastrar").value;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const usuario = userCredential.user
            updateProfile(usuario,{
                displayName: user
            })
            signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
                setUser(auth.currentUser.accessToken);
                mudarTextoJanela("Sucesso","sua conta foi criada com sucesso", "True")
            }).catch((error)=>{
                mudarTextoJanela("Erro","erro ao criar a conta", "False")
            })
                
            
        }catch (error){
            mudarTextoJanela("Erro","erro ao criar a conta", "False")
        }
        
    }

    return(
        <section id="janela-cadastrar" className={styles.janela__cadastrar}>
            <div>
                <p><FontAwesomeIcon onClick={closeModal} icon={faXmark} /></p>
                <form className={styles.janela__cadastrar__form} onSubmit={(e)=>cadastrarNewUser(e)}>
                    <h2>Cadastre-se</h2>
                    <input id="user-cadastrar" type="text" placeholder="Usuário" required></input>
                    <input id="email-cadastrar" type="text" placeholder="E-mail" required></input>
                    <div style={{position: "relative", width: "80%",margin: "0 auto"}}>
                        <input style={{width: "100%"}} id="password-cadastrar" type="password" placeholder="Senha" required></input>
                        <ButtonMostrar ButtonMostrar="buttonMostrar2" elementoMostrarId="password-cadastrar"></ButtonMostrar>
                    </div>
                    <input type="submit" value="Confirmar"></input>
                </form>
            </div>
        </section>
    )
}

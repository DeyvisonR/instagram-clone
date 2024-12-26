import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import styles from "../JanelaModalCadastrar/JanelaModalCadastrar.module.css";
import ButtonMostrar from '../ButtonMostrar/ButtonMostrar';
import { useState } from 'react';
import ValidarLogin from '../../ultils/ValidarLogin';
import { mudarTextoJanela } from '../JanelaInfo/JanelaInfo';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function JanelaModalCadastrar(){

    const [InputsCadastrar, setInputsCadastrar] = useState({
        email: "",
        password: "",
        username: ""
    })

    function closeModal(){
        let JanelaModalVar = document.getElementById("janela-cadastrar");
        JanelaModalVar.style.display = "none";
    }

    async function cadastrarNewUser(e){
        e.preventDefault()
        let resposta = ValidarLogin(InputsCadastrar.email, InputsCadastrar.password, InputsCadastrar.username)
        if(resposta == true){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, InputsCadastrar.email.trim(), InputsCadastrar.password.trim());
                const usuario = userCredential.user
                updateProfile(usuario,{
                    displayName: InputsCadastrar.username.trim()
                })
                await setDoc(doc(db,"users", usuario.uid), {
                    userId: usuario.uid,
                    username: InputsCadastrar.username,
                    name: "",
                    profileImage: "",
                    bio: "",
                    seguidores: [],
                    seguindo: [],
                    posts: [],
                    createdAt: serverTimestamp()
                })
                signInWithEmailAndPassword(auth, InputsCadastrar.email.trim(), InputsCadastrar.password.trim()).then((userCredential)=>{
                    mudarTextoJanela("Sucesso","sua conta foi criada com sucesso", true)
                }).catch((error)=>{
                    mudarTextoJanela("Erro","erro ao criar a conta", false)
                })
                
            }catch (error){
                mudarTextoJanela("Erro","Falha ao criar a conta ou ela ja existe", false)
            }
        }else{
            mudarTextoJanela(resposta.erro, resposta.mensagem, resposta.resposta)
        }
        
        
    }

    return(
        <section id="janela-cadastrar" className={styles.janela__cadastrar}>
            <div>
                <p><FontAwesomeIcon onClick={closeModal} icon={faXmark} /></p>
                <form className={styles.janela__cadastrar__form} onSubmit={(e)=>cadastrarNewUser(e)}>
                    <h2>Cadastre-se</h2>
                    <input value={InputsCadastrar.username} onChange={(e)=>setInputsCadastrar({...InputsCadastrar, username: e.target.value})} id="user-cadastrar" type="text" placeholder="Usuário" required></input>
                    <input value={InputsCadastrar.email} onChange={(e)=>setInputsCadastrar({...InputsCadastrar, email: e.target.value})} id="email-cadastrar" type="text" placeholder="E-mail" required></input>
                    <div style={{position: "relative", width: "80%",margin: "0 auto"}}>
                        <input value={InputsCadastrar.password} onChange={(e)=>setInputsCadastrar({...InputsCadastrar, password: e.target.value})} style={{width: "100%"}} id="password-cadastrar" type="password" placeholder="Senha" required></input>
                        <ButtonMostrar ButtonMostrar="buttonMostrar2" elementoMostrarId="password-cadastrar"></ButtonMostrar>
                    </div>
                    <input type="submit" value="Confirmar"></input>
                </form>
            </div>
        </section>
    )
}

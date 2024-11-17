import { auth } from "../../services/firebase.jsx";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


import imgGooglePlay from '../../assets/google-play-image.png';
import imgMicrosoft from '../../assets/microsoft-image.png';
import imgCelulares from '../../assets/celulares.png';
import imgCelular1 from '../../assets/imagem-celular1.png';
import imgCelular2 from '../../assets/imagem-celular2.png';
import imgCelular3 from '../../assets/imagem-celular3.png';
import imgCelular4 from '../../assets/imagem-celular4.png';

import '../LoginPage/LoginPage.css'
import {Footer} from "../../components/Footer/Footer.jsx"
import { JanelaInfo, mudarTextoJanela } from "../../components/JanelaInfo/JanelaInfo.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



export default function LoginPage({setUser}){

    function Logar(e){
        e.preventDefault();
        var usuario = document.getElementById("usuario").value;
        var password = document.getElementById("senha").value;
        signInWithEmailAndPassword(auth, usuario, password).then((userCredential)=>{
            mudarTextoJanela("Logado","voce foi logado com sucesso", "True");
            setUser(auth.currentUser.accessToken);
        }).catch((error)=>{
            mudarTextoJanela("Erro","erro ao logar em sua conta", "False");
        })
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
                setUser(userCredential.user.accessToken);
                mudarTextoJanela("Sucesso","sua conta foi criada com sucesso", "True")
            }).catch((error)=>{
                mudarTextoJanela("Erro","erro ao criar a conta", "False")
            })
                
            
        }catch (error){
            mudarTextoJanela("Erro","erro ao criar a conta", "False")
        }
        
    }

    function ButtonMostrar({elementoMostrarId, ButtonMostrar}){

        function MostrarSenha(){
            let inputSenha = document.getElementById(elementoMostrarId);
            let mostrarButton = document.querySelector("#"+ButtonMostrar);
            if(inputSenha.type == "password"){
                inputSenha.type = "text";
                mostrarButton.innerHTML = "Ocultar";
            }else{
                inputSenha.type = "password";
                mostrarButton.innerHTML = "Mostrar";
            }
        }

        return(
            <p><span id={ButtonMostrar} onClick={MostrarSenha} className="mostrar__senha__form">Mostrar</span></p>
        )
        
    }

    function JanelaModalCadastrar(){
        return(
            <section id="janela-cadastrar" className="janela-cadastrar">
                <div>
                    <p><FontAwesomeIcon onClick={closeModal} icon={faXmark} /></p>
                    <form className="janela-cadastrar-form" onSubmit={(e)=>cadastrarNewUser(e)}>
                        <h2>Cadastre-se</h2>
                        <input id="user-cadastrar" type="text" placeholder="Usuário" required></input>
                        <input id="email-cadastrar" type="text" placeholder="E-mail" required></input>
                        <div className="div__button__mostrar">
                            <input id="password-cadastrar" type="password" placeholder="Senha" required></input>
                            <ButtonMostrar ButtonMostrar="buttonMostrar2" elementoMostrarId="password-cadastrar"></ButtonMostrar>
                        </div>
                        <input type="submit" value="Confirmar"></input>
                    </form>
                </div>
            </section>
        )
    }

    

    function openModal(e){
        e.preventDefault();
        let JanelaModalVar = document.getElementById("janela-cadastrar");
        JanelaModalVar.style.display = "block";
    }

    function closeModal(){
        let JanelaModalVar = document.getElementById("janela-cadastrar");
        JanelaModalVar.style.display = "none";
    }

    var currentImage = 0;
    var imgAnterior = 0

    

    function imgAnim(){
        
        var imgs = document.querySelectorAll("#imagens-anim img");
        if(imgs.length >= 1){
            if(currentImage >= imgs.length-1){
                currentImage = 0;
            }else{
                currentImage ++;
            }
            imgs[currentImage].style.opacity = '1';
            imgs[imgAnterior].style.opacity = '0';
            imgAnterior++;
            if(imgAnterior == imgs.length){
                imgAnterior = 0
            }
                
        }
    }

    setInterval(()=>{
        imgAnim()
    }, 5000)

    return(
        <>
            <JanelaInfo></JanelaInfo>
            <JanelaModalCadastrar></JanelaModalCadastrar>
            <section className="pagina-login-cadastrar">
                <div className="box-pagina-login-imagens">
                    <img src={imgCelulares}/>
                    <div id="imagens-anim">
                        <img src={imgCelular1} style={{opacity: "1"}} />
                        <img src={imgCelular2}/>
                        <img src={imgCelular3}/>
                        <img src={imgCelular4}/>
                    </div>
                </div>
                <div className="box-pagina-login-cadastrar">
                    <div className="formulario-pagina-login-cadastrar">
                        <form>
                            <h1><a href="#">Instagram</a></h1>
                            <input id="usuario" type="text" placeholder="Telefone, nome de usuário ou email" required/>
                            <input id="senha" type="password" placeholder="Senha" required/>
                            <ButtonMostrar ButtonMostrar="buttonMostrar1" elementoMostrarId="senha"></ButtonMostrar>
                            <input type="submit" value="Entrar" onClick={Logar}/>
                            <div className="texto-wraper">
                                <div>

                                </div>
                                <p>OU</p>
                            </div>
                            <button className="login-facebook">
                                <span><FontAwesomeIcon icon={faFacebookSquare} /></span>
                                <p>Entrar com o Facebook</p>
                            </button>
                            <a className="esqueceu-senha" href="#">Esqueceu a senha?</a>
                        </form>
                        <div className="box-cadastrar">
                            <h2>Não tem uma conta? <a href="#" onClick={openModal}>Cadastre-se</a></h2>
                        </div>
                        <div className="baixar-aplicativo">
                            <p>Obtenha o aplicativo.</p>
                            <div>
                                <a href="#"><img src={imgGooglePlay}></img></a>
                                <a href="#"><img src={imgMicrosoft}></img></a>
                            </div>
                        </div>
                    </div>
                </div>{/*box-pagina-login/cadastrar*/}
            </section>
            <Footer/>
        </>
    )
}

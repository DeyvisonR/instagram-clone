import { auth } from "../../services/firebase.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";


import imgGooglePlay from '../../assets/google-play-image.png';
import imgMicrosoft from '../../assets/microsoft-image.png';
import imgCelulares from '../../assets/celulares.png';
import imgCelular1 from '../../assets/imagem-celular1.png';
import imgCelular2 from '../../assets/imagem-celular2.png';
import imgCelular3 from '../../assets/imagem-celular3.png';
import imgCelular4 from '../../assets/imagem-celular4.png';

import styles from '../LoginPage/LoginPage.module.css';
import {Footer} from "../../components/Footer/Footer.jsx";
import { JanelaInfo, mudarTextoJanela } from "../../components/JanelaInfo/JanelaInfo.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import ButtonMostrar from "../../components/ButtonMostrar/ButtonMostrar.jsx";
import JanelaModalCadastrar from "../../components/JanelaModalCadastrar/JanelaModalCadstrar.jsx";



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

    function openModal(e){
        e.preventDefault();
        let JanelaModalVar = document.getElementById("janela-cadastrar");
        JanelaModalVar.style.display = "block";
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
            <JanelaModalCadastrar setUser={setUser}></JanelaModalCadastrar>
            <section className={styles.pagina__login__cadastrar}>
                <div className={styles.box__pagina__login__imagens}>
                    <img src={imgCelulares}/>
                    <div id="imagens-anim">
                        <img src={imgCelular1} style={{opacity: "1"}} />
                        <img src={imgCelular2}/>
                        <img src={imgCelular3}/>
                        <img src={imgCelular4}/>
                    </div>
                </div>
                <div className={styles.box__pagina__login__cadastrar}>
                    <div className={styles.formulario__pagina__login__cadastrar}>
                        <form>
                            <h1><a href="#">Instagram</a></h1>
                            <input id="usuario" type="text" placeholder="Telefone, nome de usuário ou email" required/>
                            <div style={{position: "relative",width: "100%"}}>
                                <input id="senha" type="password" placeholder="Senha" required/>
                                <ButtonMostrar ButtonMostrar="buttonMostrar1" elementoMostrarId="senha"></ButtonMostrar>
                            </div>
                            <input type="submit" value="Entrar" onClick={Logar}/>
                            <div className={styles.texto__wraper}>
                                <div>

                                </div>
                                <p>OU</p>
                            </div>
                            <button className={styles.login__facebook}>
                                <span><FontAwesomeIcon icon={faFacebookSquare} /></span>
                                <p>Entrar com o Facebook</p>
                            </button>
                            <a className={styles.esqueceu__senha} href="#">Esqueceu a senha?</a>
                        </form>
                        <div className={styles.box__cadastrar}>
                            <h2>Não tem uma conta? <a href="#" onClick={openModal}>Cadastre-se</a></h2>
                        </div>
                        <div className={styles.baixar__aplicativo}>
                            <p>Obtenha o aplicativo.</p>
                            <div >
                                <a href="#"><img src={imgGooglePlay}></img></a>
                                <a href="#"><img src={imgMicrosoft}></img></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer className={styles.footer}/>
        </>
    )
}

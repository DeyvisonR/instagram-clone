import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { auth, db, storage } from '../../services/firebase.jsx';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import styles from './ModalEditarConta.module.css';
import { useContext, useState } from 'react';
import { mudarTextoJanela } from '../JanelaInfo/JanelaInfo';
import imageValidation from '../../ultils/imageValidation.jsx';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PerfilContext } from '../../context/perfilContext.jsx';

function ModalEditarConta(){

    const [imagem, setImagem] = useState(null)
    const [imagemPreview, setImagemPreview] = useState(null)
    const {PerfilData, setPerfilData} = useContext(PerfilContext);

    async function editarDadosConta(e){
        e.preventDefault()
        let userName = document.getElementById("UsernamePerfil").value;
        let nome = document.getElementById("NomePerfil").value;
        let bio = document.getElementById("BioPerfil").value;
        let userNameTeste, nomeTeste, bioTeste;
        if(userName.length <= 40){
            userNameTeste = true;
        }
        if(nome.length <= 100){
            nomeTeste = true;
        }
        if(bio.length <= 500){
            bioTeste = true;
        }
        let verificardados = false;
        if(userNameTeste === true && nomeTeste === true && bioTeste === true) {
            verificardados = true;
        }
        let imagemURL = null;
        if(PerfilData){
            if(imagem){
                const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
                await uploadBytes(storageRef, imagem)
                imagemURL = await getDownloadURL(storageRef)
                if(verificardados){
                    await setDoc(doc(db,"users", auth.currentUser.uid), {
                        username: userName,
                        name: nome,
                        bio: bio,
                        profileImage: imagemURL,
                    })
                }
            }else{
                if(verificardados){
                    await updateDoc(doc(db,"users", auth.currentUser.uid), {
                        username: userName,
                        name: nome,
                        bio: bio,
                    })
                }
            }
        }else{
            if(imagem){
                const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
                await uploadBytes(storageRef, imagem)
                imagemURL = await getDownloadURL(storageRef)
                if(verificardados){
                    await setDoc(doc(db,"users", auth.currentUser.uid), {
                        username: userName,
                        name: nome,
                        bio: bio,
                        profileImage: imagemURL,
                    })
                }
            }else{
                if(verificardados){
                    await set(doc(db,"users", auth.currentUser.uid), {
                        username: userName,
                        name: nome,
                        bio: bio,
                    })
                }
            }
        }
        
        
        
    }

    function verificarImagem(e){
        const file = e.target.files[0]
        if(imageValidation(file) == true){
            setImagem(file)
                const reader = new FileReader()
                reader.onloadend = ()=>{
                    setImagemPreview(reader.result)          
                }
                reader.readAsDataURL(file);
        }else{
            let resposta = imageValidation(file);
            mudarTextoJanela(resposta.erro,resposta.mensagem, resposta.resposta)
        }
    }
    
    function fecharModalEditarConta(e){
        e.preventDefault();
        document.querySelector("#modal__editar__conta").style.display = "none";
        document.getElementById("UsernamePerfil").value = "";
        document.getElementById("NomePerfil").value = "";
        document.getElementById("BioPerfil").value = "";
        setImagemPreview(null)
    }
    
    return(
        <div id="modal__editar__conta" className={styles.modal__editar__conta}>
            <div>
                <p className={styles.button__fechar__modal__editar__conta}>
                    <span onClick={fecharModalEditarConta}><FontAwesomeIcon icon={faXmark}/></span>
                </p>
                <h2>Editar Perfil</h2>
                <div className={styles.box__editar__foto}>
                    <div className={styles.box__editar__foto__imagem}>
                        {imagemPreview ? (<img src={imagemPreview} alt="nova imagem perfil" />) : (<></>)}
                    </div>
                    <input accept='image/*' onChange={(e)=>verificarImagem(e)} style={{display: "none"}} id='fileImage' type="file"></input>
                    <label htmlFor="fileImage">Editar Foto do Perfil</label>
                </div>
                <form onSubmit={(e)=>{editarDadosConta(e)}}>
                    <h3>Nome Completo</h3>
                    <input id="NomePerfil" type="text" />
                    <h3>Username</h3>
                    <input id="UsernamePerfil" type="text" />
                    <h3>Bio</h3>
                    <textarea id="BioPerfil"></textarea>
                    <div className={styles.buttons__modal__editar__conta}>
                        <p onClick={fecharModalEditarConta} type='submit' className={styles.button__modal__editar__conta__cancelar}>Cancelar</p>
                        <input type='submit' className={styles.button__modal__editar__conta__enviar} value="Enviar"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

function openModalEditarConta(){
    document.querySelector("#modal__editar__conta").style.display = "block";
}


export {ModalEditarConta, openModalEditarConta}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { auth, db, storage } from '../../services/firebase.jsx';
import { doc, updateDoc } from "firebase/firestore";
import styles from './ModalEditarConta.module.css';
import { useContext, useEffect, useState } from 'react';
import { mudarTextoJanela } from '../JanelaInfo/JanelaInfo';
import imageValidation from '../../ultils/imageValidation.jsx';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PerfilContext } from '../../context/perfilContext.jsx';
import ValidarDados from '../../ultils/ValidarDados.jsx';
import fotoPerfil from '../../assets/foto-perfil.jpg'

export default function ModalEditarConta(){

    const [imagem, setImagem] = useState(null)
    const [imagemPreview, setImagemPreview] = useState(null)
    const {PerfilData, setPerfilData} = useContext(PerfilContext);
    const [PerfilDataClone, setPerfilDataClone] = useState({name:"", bio:"",username:""});

    useEffect(() => {
        setPerfilDataClone(PerfilData);
    }, [PerfilData])
    
    
    async function editarDadosConta(e){
        e.preventDefault()
        const verificardados = ValidarDados(PerfilDataClone.username, PerfilDataClone.name, PerfilDataClone.bio);
        let imagemURL = null;
        if(PerfilData != PerfilDataClone){
            if(verificardados == true){
                if(imagem){
                    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
                    await uploadBytes(storageRef, imagem)
                    imagemURL = await getDownloadURL(storageRef)
                    await updateDoc(doc(db,"users", auth.currentUser.uid), {
                        username: PerfilDataClone.username,
                        name: PerfilDataClone.name,
                        bio: PerfilDataClone.bio,
                        profileImage: imagemURL,
                    })
                }else{
                    await updateDoc(doc(db,"users", auth.currentUser.uid), {
                        username: PerfilDataClone.username,
                        name: PerfilDataClone.name,
                        bio: PerfilDataClone.bio,
                    })
                }
            }else{
                mudarTextoJanela(verificardados.erro, verificardados.mensagem, verificardados.resposta);
            }
        }
          
    }

    function verificarImagem(e){
        const file = e.target.files[0]
        if(imageValidation(file) == true){
            setImagem(file)
                const reader = new FileReader();
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
        setImagemPreview(null);
        setImagem(null);
        setPerfilDataClone(PerfilData);
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
                        {imagemPreview ? <img src={imagemPreview} alt="imagem do perfil" /> : PerfilData.profileImage ? <img src={PerfilData.profileImage} alt="imagem do perfil" /> : <img src={fotoPerfil} alt="imagem do perfil" />}
                    </div>
                    <input accept='image/*' onChange={(e)=>verificarImagem(e)} style={{display: "none"}} id='fileImage' type="file"></input>
                    <label htmlFor="fileImage">Editar Foto do Perfil</label>
                </div>
                <form onSubmit={(e)=>{editarDadosConta(e)}}>
                    <h3>Nome Completo</h3>
                    <input value={PerfilDataClone.name} onChange={(e)=>{setPerfilDataClone({...PerfilDataClone, name: e.target.value})}} id="NomePerfil" type="text" />
                    <h3>Username</h3>
                    <input value={PerfilDataClone.username} onChange={(e)=>{setPerfilDataClone({...PerfilDataClone, username: e.target.value})}} id="UsernamePerfil" type="text" />
                    <h3>Bio</h3>
                    <textarea value={PerfilDataClone.bio} onChange={(e)=>{setPerfilDataClone({...PerfilDataClone, bio: e.target.value})}} id="BioPerfil"></textarea>
                    <div className={styles.buttons__modal__editar__conta}>
                        <p onClick={fecharModalEditarConta} type='submit' className={styles.button__modal__editar__conta__cancelar}>Cancelar</p>
                        <input type='submit' className={styles.button__modal__editar__conta__enviar} value="Enviar"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

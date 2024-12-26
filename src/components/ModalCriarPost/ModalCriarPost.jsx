import { useState } from "react";
import styles from "../ModalCriarPost/ModalCriarPost.module.css";
import imageValidation from "../../ultils/imageValidation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { mudarTextoJanela } from "../JanelaInfo/JanelaInfo";
import { auth, db, storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function ModalCriarPost(){

    const [Image, setImage] = useState(null);
    const [ImagePreview, setImagePreview] = useState(null);
    const [Input, setInput] = useState("");

    function verificarImagem(e){
        const file = e.target.files[0]
        if(imageValidation(file) == true){
            setImage(file)
                const reader = new FileReader()
                reader.onloadend = ()=>{
                    setImagePreview(reader.result)
                }
                reader.readAsDataURL(file);
        }else{
            let resposta = imageValidation(file);
            mudarTextoJanela(resposta.erro,resposta.mensagem, resposta.resposta)
        }
    }

    function FecharModalPost(){
        document.getElementById("modalPost").style.display = "none";
    }

    async function CriarPost(e){
        e.preventDefault()
        if(Image){
            if(Input){
                setInput(Input.trim());
                if(Input.length > 500){
                    mudarTextoJanela('Erro', "Tamanho invalido. Digite uma texto com menos de 500 caracteres", false);
                    return
                }
            }
            try{
                const postDocRef = await addDoc(collection(db, "posts"),{
                    postId: "",
                    imageUrl: "",
                    mensagem: Input,
                    createBy: auth.currentUser.uid,
                    likes: [],
                    comments: [],
                    createAt: serverTimestamp(),
                });

                const storageRef = ref(storage, `posts/${auth.currentUser.uid}/${postDocRef.id}`);
                await uploadBytes(storageRef, Image)
                const imageUrl = await getDownloadURL(storageRef)

                await updateDoc(postDocRef,{imageUrl: imageUrl, postId: postDocRef.id})

                await updateDoc(doc(db,"users",auth.currentUser.uid),{
                    posts: arrayUnion(postDocRef.id)
                });
            }catch (error){
                mudarTextoJanela('Erro', "Falha ao enviar o post. Por favor tente novamente!", false);
            } finally{
                mudarTextoJanela('sucesso', "Post enviado com sucesso!", true);
            }
            
        }
    }

    return(
        <div id="modalPost" className={styles.modal__criar__post}>
            <div className={styles.button__modal__criar__post}>
                <FontAwesomeIcon onClick={FecharModalPost} icon={faXmark}></FontAwesomeIcon>
            </div>
            <div className={styles.modal__criar__post__wraper}>
                <form onSubmit={(e)=>{CriarPost(e)}}>
                <input accept='image/*' onChange={(e)=>verificarImagem(e)} style={{display: "none"}} id='ImagePost' type="file"/>
                    <div className={styles.img__criar__post}>
                        {ImagePreview ? (<div>
                            <img src={ImagePreview} alt="Imagem que sera usada para post" />
                            <label required htmlFor="ImagePost">Selecionar outra imagem?</label>
                            </div>) : <label required htmlFor="ImagePost">Selecione a sua imagem</label>}
                    </div>
                    <textarea value={Input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Comente seu post!!!" required></textarea>
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    )
}
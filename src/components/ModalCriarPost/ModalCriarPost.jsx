import { useState } from "react";
import styles from "../ModalCriarPost/ModalCriarPost.module.css";
import imageValidation from "../../ultils/imageValidation";

export default function ModalCriarPost(){

    const [Image, setImage] = useState(null)
    const [ImagePreview, setImagePreview] = useState(null)

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

    function CriarPost(){
        if(Image){

        }
    }

    return(
        <div id="modalPost" className={styles.modal__criar__post}>
            <div className={styles.modal__criar__post__wraper}>
                <form onSubmit={CriarPost}>
                <input accept='image/*' onChange={(e)=>verificarImagem(e)} style={{display: "none"}} id='ImagePost' type="file"/>
                    <div className={styles.img__criar__post}>
                        {ImagePreview ? (<div>
                            <img src={ImagePreview} alt="Imagem que sera usada para post" />
                            <label required htmlFor="ImagePost">Selecionar outra imagem?</label>
                            </div>) : <label required htmlFor="ImagePost">Selecione a sua imagem</label>}
                    </div>
                    <textarea placeholder="Comente seu post!!!" required></textarea>
                </form>
            </div>
        </div>
    )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Post/Post.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import image from "../../assets/imagem-celular1.png";
import { useState } from "react";

export default function post({username="", profileImage=""}){


    const [comentario, setComentario] = useState("")


    function ChangedTextArea(e){
        setComentario(e.target.value)
        let textarea = document.getElementById("TextAreaPost");
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function comentarPost(){

    }

    return(
        <div className={styles.post}>
            <div className={styles.post__header}>
                <div className={styles.post__header__pessoa}>
                    <div className={styles.post__header__pessoa__imagem}>
                        <img src={profileImage ? profileImage : image} alt="" />
                    </div>
                    <div className={styles.post__header__pessoa__texto}>
                        <p>{username}</p>
                        <span>• {}</span>
                    </div>
                    <div className={styles.post__header__pessoa__options}>
                        <p>•••</p>
                    </div>
                </div>
            </div>
            <div className={styles.post__body}>
                <div className={styles.post__body__imagem}>
                    <img src={image} alt="" />
                </div>
                <ul className={styles.post__body__options}>
                    <li><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></li>
                    <li><FontAwesomeIcon icon={faComment}></FontAwesomeIcon></li>
                    <li><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></li>
                    <li><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></li>
                </ul>
                <a href="#" className={styles.post__body__curtidas}>{} curtidas</a>
                <p className={styles.post__body__comentario}><strong>{}</strong> {}</p>
            </div>
            <div className={styles.post__footer}>
                <a href="#" className={styles.post__footer__comentarios}>Ver todos os {} comentários</a>
                <div className={styles.post__footer__comentar}>
                    <form onSubmit={comentarPost}>
                        <textarea value={comentario} id="TextAreaPost" onChange={(e)=>ChangedTextArea(e)} placeholder="Adicione um comentário..."></textarea>
                        <div>
                            <input type="submit" value="Publicar" />
                        </div>
                        
                    </form>
                </div>
            </div>
            <hr />
        </div>
    )
}
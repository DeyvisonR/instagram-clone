import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from  "./ModalPost.module.css";
import { faEllipsis, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import image from "../../assets/imagem-celular1.png"

export default function ModalPost(){

    const [comentario, setComentario] = useState("")
    const [postData, setPostData] = useState({});

    function ChangedTextArea(e){
        setComentario(e.target.value)
        let textarea = document.getElementById("TextAreaPost");
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function comentarPost(){

    }

    function FecharModalPost(){
        
        ModalPost.style.display = "none"
    }

    function openModalPost(){
        ModalPost.style.display = "block"
    }

    var ModalPost = document.getElementById("ModalPost");

    return(
        <div id="ModalPost" className={styles.ModalPost}>
            <div className={styles.ModalPost__overlay}>
                <div className={styles.button__fechar__ModalPost}>
                    <FontAwesomeIcon onClick={FecharModalPost} icon={faXmark}></FontAwesomeIcon>
                </div>
                <div className={styles.ModalPost__content}>
                    <div className={styles.ModalPost__image}>
                        <img src={image} alt="imagem do post" />
                    </div>
                    <div className={styles.ModalPost__info__post}>

                        <div className={styles.ModalPost__header}>
                            <div className={styles.ModalPost__header__user}>
                                <div className={styles.ModalPost__user__avatar}>

                                </div>
                                <p>{"DeyvisonReis"}</p>
                            </div>
                            <div className={styles.ModalPost__user__options}>
                                <p><FontAwesomeIcon icon={faEllipsis} /></p>
                            </div>
                        </div>

                        <div className={styles.ModalPost__body}>
                            <div className={styles.ModalPost__comments}>

                            </div>
                        </div>
                        <div className={styles.ModalPost__footer}>
                            <ul className={styles.ModalPost__footer__options}>
                                    <li><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></li>
                                    <li><FontAwesomeIcon icon={faComment}></FontAwesomeIcon></li>
                                    <li><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></li>
                                    <li><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></li>
                                </ul>
                                <p className={styles.ModalPost__footer__curtidas}>{} curtidas</p>
                                <p className={styles.ModalPost__footer__data}>criado em {"12 10 2024"}</p>
                                <div className={styles.post__footer__comentar}>
                                    <form onSubmit={comentarPost}>
                                        <textarea value={comentario} id="TextAreaPost" onChange={(e)=>ChangedTextArea(e)} placeholder="Adicione um comentário..."></textarea>
                                        <div>
                                            <input type="submit" value="Publicar" />
                                        </div>
                                        
                                    </form>
                                </div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )

}
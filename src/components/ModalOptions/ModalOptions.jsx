import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../ModalOptions/ModalOptions.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { mudarTextoJanela } from "../JanelaInfo/JanelaInfo";

export default function ModalOptions(){

    function closeModal(){
        let modal = document.getElementById("modalOptions")
        modal.style.display = "none"
    }

    function logout_account(){
        signOut(auth).then(()=>{
            mudarTextoJanela("Sucesso", "Você saiu da conta com sucesso", true);
        }).catch((error)=>{
            mudarTextoJanela("Erro", "Erro ao sair da conta. Por favor tente novamente", false);
        });
      }

    return(
        <div id="modalOptions" className={styles.modal__options}>
            <div className={styles.modal__options__fechar}>
                <FontAwesomeIcon onClick={closeModal} icon={faXmark} />
            </div>
            <div className={styles.modal__options__wraper}>
                <ul>
                    <li>Apps e sites</li>
                    <li>Qr code</li>
                    <li>Notificações</li>
                    <li>Configurações e privacidade</li>
                    <li>Supervisão</li>
                    <li>Atividade de login</li>
                    <li>Incorporar</li>
                    <li onClick={logout_account}>Sair</li>
                    <li>Cancelar</li>
                </ul>
            </div>
        </div>
    )
    
}
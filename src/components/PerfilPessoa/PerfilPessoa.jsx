import { signOut } from "firebase/auth";
import styles from "../PerfilPessoa/PerfilPessoa.module.css";
import { auth } from "../../services/firebase";
import { mudarTextoJanela } from "../JanelaInfo/JanelaInfo";
import fotoPerfil from "../../assets/foto-perfil.jpg";

export default function PerfilPessoa({person, username="", name="", image=null}){

    function logout_account(){
        signOut(auth).then(()=>{
          mudarTextoJanela("Sucesso", "Você saiu da conta com sucesso", true);
        }).catch((error)=>{
          mudarTextoJanela("Erro", "Erro ao sair da conta. Por favor tente novamente", false);
        });
      }

    return(
        <div className={styles.PerfilPessoa}>
            <div className={styles.PerfilPessoa__imagem}>
                {image ? <img src={image} alt="Foto do perfil" /> : <img src={fotoPerfil} alt="Foto do perfil" />}
            </div>
            <div className={styles.PerfilPessoa__dados}>
                <h2>{username}</h2>
                <p>{name}</p>
            </div>
            <div className={styles.PerfilPessoa__option}>
                {person ? (
                    <>
                        <a onClick={logout_account} href="#">Logout</a>
                    </>
            ) : (
                    <>
                        <a href="#">Seguir</a>
                    </>
                )}
            </div>
        </div>
    )
}
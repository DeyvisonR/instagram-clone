import { signOut } from "firebase/auth";
import styles from "../PerfilPessoa/PerfilPessoa.module.css";
import { auth } from "../../services/firebase";
import { mudarTextoJanela } from "../JanelaInfo/JanelaInfo";
import fotoPerfil from "../../assets/foto-perfil.jpg";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton.jsx";

export default function PerfilPessoa({person, username="", name="", image=null}){

    const [IsLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if(username){
        setIsLoading(false);
      }
    }, [username])
    

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
                {IsLoading ? <Skeleton width="50px" height="50px" borderRadius="25px"></Skeleton> : image ? <img src={image} alt="Foto do perfil" /> : <img src={fotoPerfil} alt="Foto do perfil" />}
            </div>
            <div className={styles.PerfilPessoa__dados}>
                {IsLoading ? <>
                  <Skeleton width="95%" height="20px" margin="0 0 5px 0"></Skeleton>
                  <Skeleton width="95%" height="20px"></Skeleton>
                </> : <>
                  <h2>{username}</h2>
                  <p>{name}</p>
                </>}
                
            </div>
            <div className={styles.PerfilPessoa__option}>
                {IsLoading ? <Skeleton height="20px" width="50px"></Skeleton> : person ? (
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
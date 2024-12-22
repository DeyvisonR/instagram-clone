import styles from "../InitialPage/InitialPage.module.css";
import Post from "../../components/Post/Post.jsx";
import PerfilPessoa from "../../components/PerfilPessoa/PerfilPessoa.jsx";
import { useContext } from "react";
import { PerfilContext } from "../../context/perfilContext.jsx";

export default function InitialPage(){

  const {PerfilData, setPerfilData} = useContext(PerfilContext)

    return(
        <div className={styles.center__elementos__pagina__principal}>
            <div className={styles.box__conteudos__pagina__principal}>
              <section className={styles.conteudo__pagina__principal}>
                <div className={styles.posts}>
                  {}
                  <Post username="Usernameteste"></Post>
                  <Post></Post>
                  <Post></Post>
                  <Post></Post>
                </div>
              </section>
              <section className={styles.conteudo__adicional__pagina__principal}>
                <div className={styles.perfil__pessoas}>
                <PerfilPessoa name={PerfilData.name} username={PerfilData.username} image={PerfilData.profileImage} person={true}></PerfilPessoa>
                  <div className={styles.perfil__pessoas__verMais}>
                    <p>Sugestões para você</p>
                    <a href="#">Ver tudo</a>
                  </div>
                  <div className={styles.perfil__pessoas__sugeridas}>
                    <PerfilPessoa username="Usernameteste" name="nome inteiro completo teste"></PerfilPessoa>
                    <PerfilPessoa username="Usernameteste" name="nome inteiro completo teste"></PerfilPessoa>
                    <PerfilPessoa username="Usernameteste" name="nome inteiro completo teste"></PerfilPessoa>
                    <PerfilPessoa username="Usernameteste" name="nome inteiro completo teste"></PerfilPessoa>
                  </div>
                </div>
              </section>
            </div>
            
          </div>
    )
}
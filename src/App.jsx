import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faFileWaveform } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import styles from "../src/App.module.css";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './services/firebase.jsx';
import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { PerfilContext } from './context/perfilContext.jsx';
import { useNavigate } from 'react-router-dom';
import { JanelaInfo, mudarTextoJanela } from './components/JanelaInfo/JanelaInfo.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import ModalEditarConta from './components/ModalEditarConta/ModalEditarConta.jsx';
import ModalOptions from "../src/components/ModalOptions/ModalOptions.jsx";
import ModalCriarPost from "../src/components/ModalCriarPost/ModalCriarPost.jsx";


export default function App() {

  const [documentTheme, setDocumentTheme] = useState("dark");
  const {PerfilData, setPerfilData} = useContext(PerfilContext);
  const navigate = useNavigate()
  
  if(documentTheme == "dark"){
    
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setPerfilData(doc.data())
        },(error)=>{
          mudarTextoJanela("Erro", "Erro ao acessar seus dados", false)
        });
      } else {
        return navigate("/auth")
      }
    });
  }, [])

  

  function mostrarOpcoes(){
    let el = document.querySelector("#mais__opcoes__pagina__principal");
    el.classList.toggle("mostrar");
  }

  function OpenModalPost(){
    let modal = document.getElementById("modalPost");
    modal.style.display = "block";
  }
  
  function logout_account(){
    signOut(auth).then(()=>{
      mudarTextoJanela("Sucesso", "Você saiu da conta com sucesso", true);
    }).catch((error)=>{
      mudarTextoJanela("Erro", "Erro ao sair da conta. Por favor tente novamente", false);
    });
  }

  return(
    <div className={styles.pagina__principal}>
      <JanelaInfo></JanelaInfo>
      <ModalEditarConta></ModalEditarConta>
      <ModalOptions></ModalOptions>
      <ModalCriarPost></ModalCriarPost>
      <aside className={styles.aside__pagina__principal}>
        <div className={styles.logo__aside__pagina__principal}>
          <a href='#'>Instagram</a>
          <div className={styles.menu__bar__icone__pagina__principal}>
            <span><FontAwesomeIcon icon={faInstagram} /></span>
            <p>Mais</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to=""><span><FontAwesomeIcon icon={faHouse} /></span>
              <p>Página inicial</p></Link>
            </li>
            <li>
              <Link><span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
              <p>Pesquisa</p></Link>
            </li>
            <li>
              <Link to="/Explorar"><span><FontAwesomeIcon icon={faCompass} /></span>
              <p>Explorar</p></Link>
            </li>
            <li>
              <Link to="/Reels"><span><FontAwesomeIcon icon={faClapperboard} /></span>
              <p>Reels</p></Link>
            </li>
            <li>
              <Link to="/Mensagens"><span><FontAwesomeIcon icon={faFacebookMessenger} /></span>
              <p>Mensagens</p></Link>
            </li>
            <li>
              <Link to="/Notificacoes"><span><FontAwesomeIcon icon={faHeart} /></span>
              <p>Notificações</p></Link>
            </li>
            <li>
              <a onClick={OpenModalPost} href='#'><span><FontAwesomeIcon icon={faSquarePlus} /></span>
              <p>Criar</p></a>
            </li>
            <li>
              <Link to={"/Perfil/"}><span className={styles.foto__perfil__icon}></span>
              <p>Perfil</p></Link>
            </li>
          </ul>
        </nav>
        <div className={styles.menu__bar__pagina__principal}>
          <div onClick={mostrarOpcoes} className={styles.menu__bar__icone__pagina__principal}>
            <span><FontAwesomeIcon icon={faBars} /></span>
            <p>Mais</p>
          </div>
          <div id="mais__opcoes__pagina__principal" className={styles.mais__opcoes__pagina__principal}>
            <ul>
              <li>
                <a href='#'><span><FontAwesomeIcon icon={faGear} /></span><p>Configurações</p></a>
              </li>
              <li>
                <a href='#'><span><FontAwesomeIcon icon={faFileWaveform} /></span><p>Sua atividade</p></a>
              </li>
              <li>
                <a href='#'><span><FontAwesomeIcon icon={faBookmark} /></span><p>Salvos</p></a>
              </li>
              <li>
                <a href='#'><span>{documentTheme === "dark" ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</span><p>Alternar exibição</p></a>
              </li>
              <li>
                <a href='#'><span><FontAwesomeIcon icon={faCircleExclamation} /></span><p>Relatar um problema</p></a>
              </li>
              <div className={styles.linha__mais__opcoes}></div>
              <li>
                <a href='#'><p>Trocar de conta</p></a>
              </li>
              <li>
                <a href='#' onClick={logout_account}><p>Sair</p></a>
              </li>
            </ul>
          </div>
          
        </div>
      </aside>
      <main className={styles.main__pagina__principal}>
        <Outlet/>
        <Footer/>
      </main>
    </div>
  )
}


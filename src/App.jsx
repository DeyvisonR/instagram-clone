import './App.css';
import './index.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './services/firebase.jsx';
import { useState, useEffect, useContext } from 'react';
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
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { ModalEditarConta } from './components/ModalEditarConta/ModalEditarConta.jsx';
import { JanelaInfo } from './components/JanelaInfo/JanelaInfo.jsx';
import { doc, onSnapshot } from 'firebase/firestore';
import { PerfilContext } from './context/perfilContext.jsx';


export default function App() {

  const [userLogin, setUserLogin] = useState(null);
  const [documentTheme, setDocumentTheme] = useState("dark")
  const {PerfilData, setPerfilData} = useContext(PerfilContext)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user.accessToken);
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setPerfilData(doc.data())
        });
      } else {

      }
    });
  }, [])
  

  if(documentTheme == "dark"){
    
  }

  function mostrarOpcoes(){
    let el = document.querySelector(".mais__opcoes__pagina__principal");
    el.classList.toggle("mostrar");
  }
  

  function logout_account(){
    signOut(auth).then(()=>{
      setUserLogin(null)
      // saiu da conta com sucesso
    }).catch((error)=>{
      // erro ao sair da conta
    });
  }

  if(userLogin){
    return(
      <AppP/>
    )
  }else{
    return(
      <LoginPage setUser={setUserLogin}/>
    )
  }

  function AppP(){
    return(
      <div className="pagina__principal">
        <JanelaInfo></JanelaInfo>
        <ModalEditarConta></ModalEditarConta>
        <aside className="aside__pagina__principal">
          <div className='logo__aside__pagina__principal'>
            <a href='#'>Instagram</a>
            <div onClick={mostrarOpcoes} className='menu__bar__icone__pagina__principal'>
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
                <a href='#'><span><FontAwesomeIcon icon={faSquarePlus} /></span>
                <p>Criar</p></a>
              </li>
              <li>
                <Link to="/Perfil"><span className='foto__perfil__icon'></span>
                <p>Perfil</p></Link>
                
              </li>
            </ul>
          </nav>
          <div className='menu__bar__pagina__principal'>
            <div onClick={mostrarOpcoes} className='menu__bar__icone__pagina__principal'>
              <span><FontAwesomeIcon icon={faBars} /></span>
              <p>Mais</p>
            </div>
            <div className='mais__opcoes__pagina__principal'>
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
                {
                  /* <FontAwesomeIcon icon={faMoon} />
                    <FontAwesomeIcon icon={faSun} />
                  */
                }
                  <a href='#'><span></span><p>Alternar exibição</p></a>
                </li>
                <li>
                  <a href='#'><span><FontAwesomeIcon icon={faCircleExclamation} /></span><p>Relatar um problema</p></a>
                </li>
                <div className='linha__mais__opcoes'></div>
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
        <main className="main__pagina__principal">
          <Outlet/>
          <Footer/>
        </main>
      </div>
    )
  }
}


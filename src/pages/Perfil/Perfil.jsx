import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../Perfil/Perfil.module.css';
import fotoPerfil from '../../assets/foto-perfil.jpg'
import { auth } from "../../services/firebase.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBuilding, faGear, faTv } from '@fortawesome/free-solid-svg-icons';
import { openModalEditarConta } from "../../components/ModalEditarConta/ModalEditarConta";
import { PerfilContext } from "../../context/perfilContext.jsx";

export default function Perfil(){

    const [publicacoes, setPublicacoes] = useState(0);
    const [seguidores, setSeguidores] = useState(0);
    const [seguindo, setSeguindo] = useState(0);
    const {PerfilData, setPerfilData} = useContext(PerfilContext);

    function openModalMobile(){
        let modal = document.getElementById("modalOptions")
        modal.style.display = "block"
    }

    return(
        <section className={styles.perfil}>
            <div className={styles.perfil__informacoes}>
                <div className={styles.perfil__informacoes__imagem}>
                    <img src={PerfilData && PerfilData.profileImage ? PerfilData.profileImage : fotoPerfil} alt="foto do perfil" />
                </div>
                <div className={styles.perfil__informacoes__pessoa}>
                    <div className={styles.pessoa__nome__editar}>
                        <div className={styles.pessoa__nome}>
                            <h2>{PerfilData ? PerfilData.username : auth.currentUser.displayName}</h2>
                            <div onClick={openModalMobile} className={styles.img__config}><FontAwesomeIcon icon={faGear}/></div>
                        </div>
                        <div className={styles.pessoa__editar}>
                            <button onClick={openModalEditarConta}>Editar Perfil</button>
                            <button>Itens Arquivados</button>
                            <div onClick={openModalMobile} className={styles.img__config}><FontAwesomeIcon icon={faGear}/></div>
                        </div>
                    </div>
                    <div className={styles.perfil__informacoes__pessoa__dados}>
                        <p>{publicacoes} publicações</p>
                        <p>{seguidores} seguidores</p>
                        <p>{seguindo} seguindo</p>
                    </div>
                    <div className={styles.perfil__informacoes__pessoa__nome__sobre}>
                        <h3>{PerfilData ? PerfilData.name : ""}</h3>
                        <p>{PerfilData ? PerfilData.bio : ""}</p>
                    </div>
                </div>
                <div className={styles.perfil__informacoes__pessoa__nome__sobre__mobile}>
                        <h3>{PerfilData ? PerfilData.name : ""}</h3>
                        <p>{PerfilData ? PerfilData.bio : ""}</p>
                    </div>
            </div>
            <div className={styles.reels}>
                <div className={styles.criar__reels}>
                    <h2>+</h2>
                    <p>Novo</p>
                </div>
            </div>
            <div className={styles.perfil__informacoes__pessoa__dados__mobile}>
                <div>
                    <p><strong>{publicacoes}</strong></p>
                    <span>publicações</span>
                </div>
                <div>
                    <p><strong>{seguidores}</strong></p>
                    <span>seguidores</span>
                </div>
                <div>
                    <p><strong>{seguindo}</strong></p>
                    <span>seguindo</span>
                </div>
            </div>
            <div className={styles.perfil__dados}>
                <div className={styles.perfil__dados__nav}>
                    <Link className={styles.selected__perfil__dados__nav}><span><FontAwesomeIcon icon={faBuilding} /></span><p>PUBLICAÇÕES</p></Link>
                    <Link><span><FontAwesomeIcon icon={faBookmark} /></span><p>SALVOS</p></Link>
                    <Link><span><FontAwesomeIcon icon={faTv} /></span><p>MARCADOS</p></Link>
                </div>
                <div className="conteudo__pagina__perfil">
                    <div className={styles.publicacoes}>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        <div className={styles.publicacao}>
                            <div className={styles.publicacao__wraper}>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
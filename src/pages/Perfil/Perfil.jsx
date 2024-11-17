import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import '../Perfil/Perfil.css';
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

    return(
        <section className="perfil">
            <div className="perfil__informacoes">
                <div className="perfil__informacoes__imagem">
                    <img src={PerfilData && PerfilData.profileImage ? PerfilData.profileImage : fotoPerfil} alt="foto do perfil" />
                </div>
                <div className="perfil__informacoes__pessoa">
                    <div className="pessoa__nome__editar">
                        <h2>{PerfilData ? PerfilData.username : auth.currentUser.displayName}</h2>
                        <button onClick={openModalEditarConta}>Editar Perfil</button>
                        <button>Itens Arquivados</button>
                        <div className="img-config"><FontAwesomeIcon icon={faGear}/></div>
                    </div>
                    <div className="perfil__informacoes__pessoa__dados">
                        <p>{publicacoes} publicações</p>
                        <p>{seguidores} seguidores</p>
                        <p>{seguindo} seguindo</p>
                    </div>
                    <div className="perfil__informacoes__pessoa__nome__sobre">
                        <h3>{PerfilData ? PerfilData.name : ""}</h3>
                        <p>{PerfilData ? PerfilData.bio : ""}</p>
                    </div>
                </div>
            </div>
            <div className="reels">
                <div className="criar__reels">
                    <h2>+</h2>
                    <p>Novo</p>
                </div>
            </div>
            <div className="perfil__dados">
                <div className="perfil__dados__nav">
                    <Link className="selected__perfil__dados__nav"><span><FontAwesomeIcon icon={faBuilding} /></span>PUBLICAÇÕES</Link>
                    <Link><span><FontAwesomeIcon icon={faBookmark} /></span>SALVOS</Link>
                    <Link><span><FontAwesomeIcon icon={faTv} /></span>MARCADOS</Link>
                </div>
                <div className="conteudo__pagina__perfil">
                    <div className="publicacoes">
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                        <div className="publicacao">
                            <div className="publicacao-wraper">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
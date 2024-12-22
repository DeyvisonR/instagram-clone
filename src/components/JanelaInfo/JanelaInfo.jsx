import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './JanelaInfo.module.css';

function JanelaInfo(){

    function FecharJanelaInfo(){
        document.getElementById("janelaInfo").style.display = "none";
    }

    return(
        <section id="janelaInfo" className={styles.janela__info}>
            <span className={styles.button__janela__info}>
                <FontAwesomeIcon onClick={FecharJanelaInfo} icon={faXmark}></FontAwesomeIcon>
            </span>
            <div>
                <span><FontAwesomeIcon id="img-janelaInfo-1" icon={faCheck} /><FontAwesomeIcon id="img-janelaInfo-2" icon={faXmark} /></span><h2 id="titulo-janelaInfo">erro</h2>
            </div>
            <p className={styles.texto_janelaInfo} id="texto-janelaInfo">erro ao cadastrar usuário</p>
        </section>
    )
}

function mudarTextoJanela(titulo, texto, resposta){

    function animarJanelaInfo(){
        janela.style.display = "block";
        janela.style.opacity = "1";
        let a = setTimeout(()=>{
            janela.style.opacity = "0";
            janela.style.display = "none";
        }, 8000);
    }
    
    var janela = document.getElementById("janelaInfo");
    let imgJanela_1 = document.getElementById("img-janelaInfo-1");
    let imgJanela_2 = document.getElementById("img-janelaInfo-2");
    let tituloJanela = document.getElementById("titulo-janelaInfo");
    let textoJanela = document.getElementById("texto-janelaInfo");
    // green = rgb(74, 185, 74); red = #d35454
     if(resposta == true){
        imgJanela_1.style.display = "inline-block";
        imgJanela_2.style.display = "none";
        janela.childNodes[1].childNodes[0].style.backgroundColor = "rgb(74, 185, 74)";
        janela.style.color = "rgb(74, 185, 74)";
        janela.style.borderLeft = "5px solid rgb(74, 185, 74)";
        tituloJanela.innerHTML = titulo;
        textoJanela.innerHTML = texto;
     }else{
        imgJanela_1.style.display = "none";
        imgJanela_2.style.display = "inline-block";
        janela.style.color = "#d35454";
        janela.childNodes[1].childNodes[0].style.backgroundColor = "#d35454";
        janela.style.borderLeft = "5px solid #d35454";
        tituloJanela.innerHTML = titulo;
        textoJanela.innerHTML = texto;
     }
     animarJanelaInfo();
}

export {JanelaInfo, mudarTextoJanela}
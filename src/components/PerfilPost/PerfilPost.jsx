import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./PerfilPost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PerfilPost(){
    return(
        <>
            <div className={styles.PerfilPost}>
                <div className={styles.PerfilPost__wraper}>
                    <div className={styles.PerfilPost__overlay}>
                        <p><FontAwesomeIcon icon={faHeart} /> {0}</p>
                        <p><FontAwesomeIcon icon={faComment} /> {0}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
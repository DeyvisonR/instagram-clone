import styles from "../Skeleton/Skeleton.module.css";

export default function Skeleton({width="100%", height="30px", borderRadius = 0, margin= 0}){
    return(
        <div className={styles.skeleton__div} style={{width:width, height:height, borderRadius:borderRadius, margin:margin}}>

        </div>
    )
}
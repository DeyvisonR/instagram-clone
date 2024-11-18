import styles from'./Footer.module.css'
function Footer({className}){
    return(
      <footer className={styles.footer}>
        <div className={className}>
            <a href="">Meta</a>
            <a href="">Sobre</a>
            <a href="">Blogs</a>
            <a href="">Carreira</a>
            <a href="">Ajuda</a>
            <a href="">Api</a>
            <a href="">Privacidade</a>
            <a href="">Termos</a>
            <a href="">Principais contas</a>
            <a href="">Localizações</a>
            <a href="">Instagram Lite</a>
            <a href="">Carregamento de contatos e não usuários</a>
        </div>
      </footer>
    )
  }
  
  export { Footer }
  
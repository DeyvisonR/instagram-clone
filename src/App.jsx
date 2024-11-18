import './index.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './services/firebase.jsx';
import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import { PerfilContext } from './context/perfilContext.jsx';
import AppP from './pages/AppP/AppP.jsx';


export default function App() {

  const [userLogin, setUserLogin] = useState(null);
  const [documentTheme, setDocumentTheme] = useState("dark")
  const {PerfilData, setPerfilData} = useContext(PerfilContext)
  
  if(documentTheme == "dark"){
    
  }
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLogin(user.accessToken);
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setPerfilData(doc.data())
      },(error)=>{

      });
    } else {

    }
  });

  

  if(userLogin){
    return(
      <AppP setUser={setUserLogin} documentTheme={documentTheme}/>
    )
  }else{
    return(
      <LoginPage setUser={setUserLogin}/>
    )
  }

}


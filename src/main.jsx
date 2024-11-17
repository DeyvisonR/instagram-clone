import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Perfil from './pages/Perfil/Perfil.jsx';
import InitialPage from './pages/InitialPage/InitialPage.jsx';
import AppProvider from './context/AppProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <></>,
    children: [
      {
        path: "",
        element: <InitialPage/>
      },
      {
        path: "Perfil",
        element: <Perfil/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)

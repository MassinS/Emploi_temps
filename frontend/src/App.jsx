import './App.css'
import './navbar.css'
import Logo from './login/login'
import AdminPage from './Admin/adminPage'
import EtudPage from './etud&ens/menuPage'
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import { EmailSend } from './Email/EmailSend.jsx'
import Cookies from 'js-cookie';

 

function App() {
  const user = Cookies.get("user") && JSON.parse(Cookies.get("user")) || null;
  const LoginProtectedRoute = ({user, element}) => {
    user = Cookies.get("user") && JSON.parse(Cookies.get("user")) || null;
    if (user === null) {
      return <Navigate to="/" />;
    }
    return element;
  }
  const AdminProtectedRoute = ({user, element}) => {
    user = Cookies.get("user") && JSON.parse(Cookies.get("user")) || null;
    if (user === null || user.type!=='Administrateur') {
      return <Navigate to="/" />;
    }
    return element;
  }
  return (
    <div className='w-screen min-w-full h-full min-h-screen ' >
      <Routes>
    
        <Route path="/" element={<Logo />} />
        <Route path="/admin" element={<AdminProtectedRoute user={user} element={<AdminPage />} />} />
        <Route path="/etu" element={<LoginProtectedRoute user={user} element={<EtudPage />} />} />

        {/* 
         //?   from : @lyesrabhi16
         //?   to   : @snyp-prp123
         
         //? These 2 routes and EmailSend Component showcase how the email sending feature works
         //? see how it works and change it to fit your needs
         //? if u change redirect url in EmailSend.jsx (and run into redirect_uri_mismatch error), 
         //? tell me to change it in google console too
         
        */}
        <Route path="/email/send/callback" element={<AdminProtectedRoute user={user} element={<EmailSend/>} />} />
        <Route path="/email/send" element={<AdminProtectedRoute user={user} element={<EmailSend/>} />} />

        <Route path="*" element={<Navigate to={"/"}/>}/>{/* or make a 404 page */}
      </Routes>
      <Toaster position='top-center'/>
    </div>
  )
}

export default App
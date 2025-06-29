import axios from '../axiosConfig.js';
import { useState } from "react"
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../login/Login.css'
import toast from 'react-hot-toast';
function Form() {
 const[email,setEmail]=useState(''); 
 const[password,setPassword]=useState('');
 const[rememberMe,setRememberMe]=useState(false);
 const personne={email, password, rememberMe}
 const[navige,setAdmin]=useState('');
 const[erreur,setErreur]=useState(false);
 const changer=(e)=>{
  e.preventDefault();
  axios.post('http://localhost:3000/login/',personne).then((res)=>{
    toast.success('connexion avec succes');
    if(res.data.personne.type==='Administrateur'){
      setAdmin('Administrateur');
    }else if(res.data.personne.type==='Enseignant'){
      setAdmin('Enseignant')
    }else{
      setAdmin('Etudiant')
    }
    Cookies.set('user', JSON.stringify(res.data.personne), { expires: rememberMe ? 1 : 1/24, secure: true, sameSite: 'strict' });
    Cookies.set('token', res.data.token, { expires: rememberMe ? 1 : 1/24, secure: true, sameSite: 'strict' });
  })
            .catch(err=>{
              toast.error("erreur");
                console.log(err);
                setErreur(true);
            });
 }
    return (
      <>
        <form className="flex flex-col  to-blue-500  sm:px-10 rounded-xl shadow-md kaka " style={{background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)", backdropFilter: "blur(8px)"}} onSubmit={changer}>
            <p className="text-2xl sm:text-3xl  text-white font-semibold mt-8">Account Login</p>
            <div className="flex flex-col mt-12">
                <label  className=" text-white">Email adresse</label>
                <input type="email" className="pl-1 mt-4 h-10 rounded-lg bg-transparent border-2 border-solid border-white focus:border-4 text-white outline-none placeholder:text-white" id={erreur?'error':null} placeholder="exemple123@gmail.com" onChange={(e)=>{
                  setEmail(e.target.value);
                  setErreur(false);
                }}></input>
            </div>
            <div className="flex flex-col mt-6">
                <label className=" text-white">Mot de passe</label>
                <input type="password"  className="pl-1 mt-4 h-10 rounded-lg bg-transparent border-2 border-solid  border-white outline-none focus:border-4 text-white placeholder:text-white" id={erreur?'error':null} placeholder="************" onChange={(e)=>{
                  setPassword(e.target.value);
                  setErreur(false)
                }}></input>
            </div>
            {erreur?<div className='mt-2'>
              <p className='text-red-600 text-sm'>email ou mot de passe incorrecte</p>
            </div>:null}
            <div className="flex justify-between items-center pt-6">
            <div className=" flex items-center
             
             ">
              <input type="checkbox" onClick={(e) => setRememberMe(e.target.checked)} className="
             flex 
             h-4 
             w-4
          
             
              
               "></input>
              <p className="pl-2 text-white">Remember me</p>
            </div>
            <p className="text-white">Need help?</p>
            
            
            
            </div>
            
            <button className=" text-white mt-12 px-2 py-2 rounded-lg" style={{backgroundColor:"#0029FF"}}>Se connecter</button>
        </form>
        {navige==='Administrateur'?<Navigate to="/admin"  replace={true} />:null}
        {navige==='Etudiant'?<Navigate to="/etu"  replace={true} />:null}
        {navige==='Enseignant'?<Navigate to="/etu"  replace={true} />:null}
      </>
    )
  }
  
  export default Form;
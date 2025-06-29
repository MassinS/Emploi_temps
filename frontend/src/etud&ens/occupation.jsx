import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import axios from '../axiosConfig.js';
import image from '../assets/download.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import '../Admin/mainsection.css'
import Ajouter from './ajouter';
import toast from 'react-hot-toast'
import { Navigate } from "react-router-dom";
function Occupation({page}){
    const [occupation, setOccupation] = useState([]);
    const [chercher, setChercher] = useState("");
    const [Show, setShow] = useState(false);
    const regex = new RegExp(chercher, 'i');
    const [supprime, setSupprime] = useState(false);
    const [info, setInfo] = useState('');
    const [Finish, setFinish] = useState(false);
    let user=Cookies.get('user');
    if(user){
      user=JSON.parse(user);
    }
    const np=user?user.nom+' '+user.prenom:'';
    const role=user?user.role : '';

    useEffect(()=>{
        axios.get("http://localhost:3000/EnsEtOccup/"+user.matricule, {
        withCredentials: true
      }).then((res)=>{
        setOccupation(res.data.EnsEtOccup);
      }).catch((err)=>{
        console.log(err)
      })
    },[Finish,supprime]);

    const handleAdd = () => {
      setFinish(!Finish);//pour faire un refresh de la table
      setShow(false);//fermer le formulaire
    };

    return(
      <>
      {user===undefined?<Navigate to="/"  replace={true} />:null /*pour savoir si le cookie est expire*/}
      <div className="flex flex-col main px-10 z-0 h-full" id={Show ? 'mainflou' : undefined}>
          {Show?<Ajouter onAdd={handleAdd}  modify={info} />:null /*formulaire d'ajout*/}
    <header className="flex w-full  justify-between  mt-8 h-fit">
    <div className="">
    <p className="text-black  text-3xl font-bold">{page}</p>
    </div>
    <div className="flex items-center">
    <img src={image} className="h-10 w-10 image"></img>
    <div className="flex flex-col justify-center ml-2">
        <p className='font-semibold'>{np}</p>
        <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
</header>
<main className='w-full mt-12'>
<div className='flex mt-12 justify-between'>
    <div className='search h-8 flex items-center bg-gray-100 px-3 py-5'>
    <input 
  type='search' 
  placeholder={'Chercher des'+ ' '+page} 
  className=' text-black' 
  onChange={(e) => {
    setChercher(e.target.value);
  }}
/>

    <FontAwesomeIcon icon={faMagnifyingGlass} className='flex self-center text-black'/>
    </div>
    <div className='flex '>
        <div className='add flex items-center mr-10  rounded-2xl px-3 py-2 transition-all delay-100'>
            <FontAwesomeIcon icon={faPlus} className='mr-2 text-white'/>
            <button className='text-white' onClick={()=>{
              
              setShow(true);
            }}>Ajouter une {page==='Modules'?'Module':page}</button>
        </div>
        <div className='filter flex items-center rounded-2xl border-2 border-gray-500 px-3 py-2 '>
            <FontAwesomeIcon icon={faFilter} className='mr-2 text-gray-500'/>
            <p className='text-gray-500'>filter</p>
        </div>
    </div>
    


</div>
<table className='mt-10 z-0 w-full tabe' >
    <tr className='head'>
    <td>numero</td> 
    <td>Jour</td>
    <td>heure debut</td>
    <td>heure fin</td>
    <td>operations</td>
    </tr>
    {occupation.map((occ,index)=>{
        if (regex.test(occ.jour) || regex.test(occ.heur_debut) || regex.test(occ.heur_fin)) {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{occ.jour}</td>
                <td>{occ.heur_debut}</td>
                <td>{occ.heur_fin}</td>
                <td>
                <div className='flex items-center justify-center'>
                    <FontAwesomeIcon icon={faPen} className='text-blue-700 cursor-pointer' onClick={()=>{
                      setInfo(occ)
                      setShow(!Show)
                    }}/>
                    <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                        axios.delete('http://localhost:3000/EnsEtOccup/'+occ.matricule+"/Occupations/"+occ.id_occup,{
                          withCredentials: true
                        }).then(()=>{
                          setSupprime(!supprime);
                          toast.success("suppression reussié");
                        }).catch(()=>{
                        toast.error("suppression echoué");
                        });
                    }}/>
                  </div>
                </td>
              </tr>
            );
          }
    })}
    </table>
    

    
</main>
        </div>
      </>
      
    )
}
export default Occupation;
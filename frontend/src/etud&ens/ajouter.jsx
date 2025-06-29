import '../Admin/Formajout.css'
import { useState, useEffect } from "react";
import axios from '../axiosConfig.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';
import { parse, format } from 'date-fns';
import Cookies from 'js-cookie';
function Ajouter({onAdd,modify}){
    const [jour,setJour]=useState(modify.jour || '');
    const [heure_deb, setDeb] = useState(modify.heur_debut ? modify.heur_debut.split(':').slice(0, 2).join(':') : '');
const [heure_fin, setFin] = useState(modify.heur_fin ? modify.heur_fin.split(':').slice(0, 2).join(':') : '');
    let user=Cookies.get('user');
    if(user){
      user=JSON.parse(user);
    }
    
      
    const ajouter = (e) => {
        e.preventDefault();
        const occup={jour,heur_debut:heure_deb,heur_fin:heure_fin};
        if(modify==''){
            axios.post("http://localhost:3000/Occupation/DayHDHf/getDayHdHf",occup,{
                withCredentials: true
              }).then((res)=>{
                
                
                    const id_occup=parseInt(res.data.Occupation.id_occup);
                    axios.post("http://localhost:3000/EnsEtOccup/",{matricule:parseInt(user.matricule),id_occup},{
                    withCredentials: true
                  }).then(()=>{
                    onAdd();
                    toast.success("ajout avec succes");
                  }).catch(()=>{
                    toast.error("ajout échoue");
                  })
                
              }).catch((res)=>{
                console.log(res)
                if(res.response.data.Occupation==null){  //si l'occupation n'existe pas on doit la cree sinon on affecte directement l'occupation au prof concerne
                  axios.post("http://localhost:3000/Occupation",occup,{
      withCredentials: true
    }).then(()=>{
      axios.post("http://localhost:3000/Occupation/DayHDHf/getDayHdHf",occup,{
      withCredentials: true
    }).then((res)=>{
      const id_occup=parseInt(res.data.Occupation.id_occup);
      axios.post("http://localhost:3000/EnsEtOccup/",{matricule:parseInt(user.matricule),id_occup},{
      withCredentials: true
    }).then(()=>{
      onAdd();
      toast.success("ajout avec succes");
    })
    })

    }).catch((err)=>{
      console.log(err)
    });
              }});


            
        }else{
            const id_occup=modify.id_occup;
            axios.put("http://localhost:3000/Occupation/"+id_occup,occup,{
        withCredentials: true
      }).then(()=>{
        onAdd();
        toast.success("modification reussié");
      }).catch((err)=>{
        console.log(err);
      })
        }

    }
    return(
        <form className="form flex flex-col justify-between z-10" onSubmit={ajouter}>
            <div className='close' onClick={()=>{onAdd()}}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            <select className='w-full  border-b border-b-gray-500' value={jour} onChange={(e)=>{
                setJour(e.target.value);
            }}>
               <option value="" disabled selected>Jour</option>
               <option value="Samedi">Samedi</option>
               <option value="Dimanche">Dimanche</option>
               <option value="Lundi">Lundi</option>
               <option value="Mardi">Mardi</option>
               <option value="Mercredi">Mercredi</option>
               <option value="Jeudi">Jeudi</option>
            </select>
            <div className="flex mt-4 w-full justify-between">
            <select className='w-full  border-b border-b-gray-500 text-black' value={heure_deb} onChange={(e)=>{
                setDeb(e.target.value);
            }}>
               <option value="" disabled selected>De</option>
               <option value="08:00">08:00</option>
               <option value="09:00">09:00</option>
               <option value="10:00">10:00</option>
               <option value="11:00">11:00</option>
               <option value="12:00">12:00</option>
               <option value="13:00">13:00</option>
               <option value="14:00">14:00</option>
               <option value="15:00">15:00</option>
               <option value="16:00">16:00</option>
            </select>

            <select className='w-full  border-b ml-4 border-b-gray-500' value={heure_fin} onChange={(e)=>{
                setFin(e.target.value);
            }}>
               <option value="" disabled selected>jusqu`a</option>
               <option value="09:00">09:00</option>
               <option value="10:00">10:00</option>
               <option value="11:00">11:00</option>
               <option value="12:00">12:00</option>
               <option value="13:00">13:00</option>
               <option value="14:00">14:00</option>
               <option value="15:00">15:00</option>
               <option value="16:00">16:00</option>
            </select>
            </div>


            <div className="flex w-full justify-center">
            <button type="submit" className='flex w-56 py-1 px-2 justify-center text-white bg-blue-700'>
             confirmer {modify !== '' ? "la modification" : null}
            </button>
            </div>
            
            
            
        </form>
    )
}
export default Ajouter;
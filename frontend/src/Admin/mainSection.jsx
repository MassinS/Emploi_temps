import image from '../assets/download.png'
import './mainsection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import Ajouter from './formajouter';
import axios from '../axiosConfig.js'
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast'
function Section({page}){
  const [etudiants, setEtudiants] = useState([]);
  const [chercher, setChercher] = useState("");
  const[indexPage,Setpage]=useState(0);
  const regex = new RegExp(chercher, 'i');
  const nbrPages = etudiants.length > 0 ? Math.ceil(etudiants.length / 8) : 0;
  const initialClickedStates = new Array(nbrPages).fill(false);
  const [clickedStates, setClickedStates] = useState(initialClickedStates);
  const [Show, setShow] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [supprime, setSupprime] = useState(false);
  const [info, setInfo] = useState('');
  const [ens, setEns] = useState(null);
  const [grp, setGrp] = useState(null);
  const [annee,setAnnee]=useState('Selectionner une annee');
  const [semestre,setSemestre]=useState('Choisir semestre');

  const getYears = () => {
    const Year = new Date().getFullYear() + 1;
    return Array.from(new Array(10), (val, index) => `${Year - index - 1}/${Year - index}`);
  }

  let user=Cookies.get('user');
  if(user){
    user=JSON.parse(user);
  }
  useEffect(() => {
    if(page ==='Modules'){
      axios.get("http://localhost:3000/module/", {
        withCredentials: true
      })
.then(res => {
  setEtudiants(res.data.Modules);
})
.catch(err => console.log(err));
    }else if(page==='Local'){
      axios.get("http://localhost:3000/local/", {
        withCredentials: true
      }).then(respo =>{
        
      setEtudiants(respo.data.Locaux);
     })
     .catch(err => console.log(err));
    }else if(page==='Specialite'){
      axios.get("http://localhost:3000/Specialite/", {
        withCredentials: true
      }).then(respo =>{
        
      setEtudiants(respo.data.specialites);
     })
     .catch(err => console.log(err));

    }else if(page==='Section'){
      axios.get("http://localhost:3000/section", {
        withCredentials: true
      }).then(respo =>{
        
      setEtudiants(respo.data.sections);
     })
     .catch(err => console.log(err));
    }else if(page==='Groupe'){
      axios.get("http://localhost:3000/groupe", {
        withCredentials: true
      }).then(respo =>{
        
      setEtudiants(respo.data.groupes);
     })
     .catch(err => console.log(err));
    }
    
    else{
      axios.get("http://localhost:3000/personne/", {
        withCredentials: true
      }).then(respo =>{
        const etudiantsFiltres = respo.data.personnes.filter(personne => personne.type === page);
        setEtudiants(etudiantsFiltres);
    
       })
       .catch(err => console.log(err));
    }
       Setpage(0);//pour initialiser a 1 numero de page par defaut a chaque fois quand on change de direction dans navbar menu
       const updatedClickedStates = clickedStates.map(() => false);//pour enlever l'effet du clique sur numero de page 
       setClickedStates(updatedClickedStates);
  },[page,Finish,supprime]);
    const np=user?user.nom+' '+user.prenom:'';
    const role=user?user.role : '';
    const handleClick = (index) => {
      // Mettre à jour l'état de l'élément individuel lorsqu'il est cliqué
      const updatedClickedStates = clickedStates.map(() => false);
      updatedClickedStates[index] = true;
      setClickedStates(updatedClickedStates);
    };

    const getPageStyle = (index) => {
      return {
        backgroundColor: clickedStates[index] ? 'blue' : null,
        color: clickedStates[index] ?'#fff': null,
        cursor: 'pointer',
      };
    };
    const handleAdd = () => {
      setFinish(!Finish);//pour faire un refresh de la table
      setShow(false);//fermer le formulaire
    };

  
    return(
      <>
      {user===undefined?<Navigate to="/"  replace={true} />:null}{/*pour savoir si le cookie est expire*/}
      <div className="flex flex-col main px-10  h-full" id={Show ? 'mainflou' : undefined} style={Show?{zIndex:"9"}:null}>

      {Show?<Ajouter onAdd={handleAdd} typep={page} modify={info} />:null /*formulaire d'ajout*/}

    <header className="flex justify-between  mt-8 h-fit">
    <div className="">
    <p className="text-black  text-3xl font-bold">{page}</p>
  <p className="text-base text-gray-500">{true ? etudiants.length : 0} {page} trouve</p>
    </div>
    <div className="flex items-center">
    <img src={image} className="h-10 w-10 image"></img>
    <div className="flex flex-col justify-center ml-2">
        <p className='font-semibold'>{np}</p>
        <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
</header>

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
              setInfo('');
              setShow(true);
            }}>Ajouter un {page==='Modules'?'Module':page}</button>
        </div>
        <div className='filter flex items-center rounded-2xl border-2 border-gray-500 px-3 py-2 '>
            <FontAwesomeIcon icon={faFilter} className='mr-2 text-gray-500'/>
            <p className='text-gray-500'>filter</p>
        </div>
    </div>
    


</div>
<table className='mt-10 z-0 tabe' >
  {
    page==="Modules"?<tr className='head'> 
    <td>Id</td>
    <td>Code Module</td>
    <td>Nom Module</td>
    <td>Action</td>
  </tr>:
  page==="Local"?<tr className='head'>
  <td>Id</td>   
  <td>code Local</td>
  <td>capacite</td>
  <td>type</td>
  <td>Action</td>
</tr>:
page==='Specialite'?<tr className='head'>
<td>Id</td>   
<td>code specialite</td>
<td>nom specialite</td>
<td>Action</td>
</tr>:
page==='Section'?<tr className='head'>
<td>Id</td>   
<td>nom section</td>
<td>niveau</td>
<td>specialite</td>
<td>Action</td>
</tr>:
page==='Groupe'?<tr className='head'>
<td>Id</td>   
<td>Groupe</td>
<td>Section</td>
<td>niveau</td>
<td>specialite</td>
<td>Action</td>
</tr>:
 <tr className='head'> 
 <td>Nom</td>
 <td>Prenom</td>
 <td>Matricule</td>
 <td>Email</td>
 <td>{page==='Etudiant'?'Annee du bac':"role"}</td>
 <td>Action</td>
</tr>
  }
{etudiants.map((etud, index) => {
  if (index>=indexPage && index<Math.min(indexPage+8,etudiants.length)) {
    if(page ==='Modules'){
      if (regex.test(etud.code_module) || regex.test(etud.nom_module)) {
        return (
          <tr key={index} className="group">
            <td>{index+1}</td>
            <td>{etud.code_module}</td>
            <td>{etud.nom_module}</td>
            <td>
            <div className='flex items-center justify-center'>
                <FontAwesomeIcon icon={faPen} className='text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                  setInfo(etud)
                  setShow(!Show)
                }}/>
                <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                    axios.delete('http://localhost:3000/module/'+etud.code_module,{
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
      
    }else if(page ==='Local'){
      if (regex.test(etud.code_local) || regex.test(etud.capacite) || regex.test(etud.type)) {
        
        return (
          <tr key={index} className="group">
            <td>{index+1}</td>
            <td>{etud.code_local}</td>
            <td>{etud.capacite}</td>
            <td>{etud.type}</td>
            <td>
            <div className='flex items-center justify-center'>
                <FontAwesomeIcon icon={faPen} className='text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                  setInfo(etud)
                  setShow(!Show)
                }}/>
                <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                    axios.delete('http://localhost:3000/local/'+etud.code_local,{
                      withCredentials: true
                    }).then(()=>{
                      setSupprime(!supprime);
                      toast.success("suppression reussié");
                    }).catch(err =>{console.log(err);toast.error("suppression echoué");});
                }}/>
              </div>
            </td>
          </tr>
        );
      }
    
    
    
    }else if(page==='Specialite'){
     if(regex.test(etud.code_specialite) || regex.test(etud.nom_specialite)){
      return (
        <tr key={index} className="group">
          <td>{index+1}</td>
          <td>{etud.code_specialite}</td>
          <td>{etud.nom_specialite}</td>
          <td>
          <div className='flex items-center justify-center'>
              <FontAwesomeIcon icon={faPen} className='text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                setInfo(etud)
                setShow(!Show)
              }}/>
              <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                axios.delete('http://localhost:3000/specialite/'+etud.code_specialite,{
                  withCredentials: true
                }).then(()=>{
                  setSupprime(!supprime);
                  toast.success("suppression reussié");
                });
                
              }}/>
            </div>
          </td>
        </tr>
      );}
    }else if(page==='Section'){
      if(regex.test(etud.code_section) || regex.test(etud.niveau) || regex.test(etud.code_specialite)){
       return (
         <tr key={index} className="group">
           <td>{index+1}</td>
           <td>{etud.code_section}</td>
           <td>{etud.niveau}</td>
           <td>{etud.code_specialite}</td>
           <td>
           <div className='flex items-center justify-center'>
               <FontAwesomeIcon icon={faPen} className='text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                 setInfo(etud)
                 setShow(!Show)
               }}/>
               <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                 axios.delete('http://localhost:3000/section/'+etud.id_section,{
                   withCredentials: true
                 }).then(()=>{
                   setSupprime(!supprime);
                   toast.success("suppression reussié");
                 });
                 
               }}/>
             </div>
           </td>
         </tr>
       );}
     }else if(page==='Groupe'){
      if(regex.test(etud.code_groupe) || regex.test(etud.code_section) || regex.test(etud.niveau) || regex.test(etud.code_specialite)){
       return (
         <tr key={index} className="group">
           <td>{index+1}</td>
           <td>{etud.code_groupe}</td>
           <td>{etud.code_section}</td>
           <td>{etud.niveau}</td>
           <td>{etud.code_specialite}</td>
           <td>
           <div className='flex items-center justify-center'>
               <FontAwesomeIcon icon={faDownload} className="text-blue-700 cursor-pointer m-4 group-hover:text-white" onClick={() => {
                    setGrp(etud);
                    document.getElementById('download_groupe_emp_form_modal').showModal();

                }}/>
               <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                 axios.delete('http://localhost:3000/groupe/'+etud.id_groupe,{
                   withCredentials: true
                 }).then(()=>{
                   setSupprime(!supprime);
                   toast.success("suppression reussié");
                 });
                 
               }}/>
             </div>
           </td>
         </tr>
       );}
     }
    
    else{
      if(regex.test(etud.nom) || regex.test(etud.prenom) || regex.test(etud.matricule) || regex.test(etud.email) || regex.test(etud.anneebac) || regex.test(etud.role)){
       
        return (
          <tr key={index} className="group">
            <td>{etud.nom}</td>
            <td>{etud.prenom}</td>
            <td>{etud.matricule}</td>
            <td>{etud.email}</td>
            <td>{page==='Etudiant'?etud.anneebac:etud.role}</td>
            <td>
            <div className='flex items-center justify-center'>
                { page === 'Enseignant' && <FontAwesomeIcon icon={faDownload} className="text-blue-700 cursor-pointer m-4 group-hover:text-white" onClick={() => {
                    setEns(etud);
                    document.getElementById('download_ens_emp_form_modal').showModal();

                }}/>}
                <FontAwesomeIcon icon={faPen} className='text-blue-700 cursor-pointer group-hover:text-white' onClick={()=>{
                  setInfo(etud)
                  setShow(!Show)
                }}/>
                <FontAwesomeIcon icon={faTrash} className='ml-4 text-red-600 cursor-pointer' onClick={()=>{
                  axios.delete('http://localhost:3000/personne/'+etud.matricule,{
                    withCredentials: true
                  }).then(()=>{
                    setSupprime(!supprime);
                    toast.success("suppression reussié");
                  });
                  
                }}/>
              </div>
            </td>
          </tr>
        );
      }
      
    }
    
  } else {
    return null;
  }
})}
</table>
<div className='flex w-full justify-center mt-6 pb-16 '>
  {Array.from({ length: nbrPages }, (_, index) => (
    <div key={index} className='pages' onClick={()=>{
      Setpage(index*8);
      handleClick(index)
    }} style={getPageStyle(index)} >{index+1}</div>
  ))}
</div>

        </div>
       
       {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="download_ens_emp_form_modal" className="modal">
        <div className="modal-box flex flex-col items-center justify-center gap-4 overflow-visible">
          <h3 className="font-bold text-lg">Emplois Du Temps</h3>
          <h4 className="text-base">{ens && ens.nom} {ens && ens.prenom}</h4>
          <div className="group drop relative" onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
          }}>
          <span className='text-black'>{annee}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={'icone group-[.active]:rotate-180'} />
             <ul className='list z-10 overflow-scroll max-h-40 top-12 hidden group-[.active]:block'>
                {getYears().map((year, index) => (
                  <li key={index} onClick={() => setAnnee(year.split("/")[1])}>{year}</li>
                ))}
              </ul>
          </div>
          <div className="group drop relative" onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
          }}>
          <span className='text-black'>{semestre}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={'icone group-[.active]:rotate-180'} />
             <ul className='list overflow-scroll max-h-40 top-12 hidden group-[.active]:block'>
             <li onClick={()=>{
                    setSemestre("1");
                }} style={{borderLeft:semestre==="semestre 1" ?'3px solid #0029FF':null}}>semestre 1</li>
                <li onClick={()=>{
                    setSemestre("2");
                }} style={{borderLeft:semestre==="semestre 2"?'3px solid #0029FF':null}}>semestre 2</li>
              </ul>
          </div>
          <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
      <button className="btn bg-blue-700 text-white" onClick={(e) => {
          e.preventDefault();
          window.location.href = `http://localhost:3000/emploistemps/enseignant/${ens.matricule}/${semestre}/${annee}/xlsx`
          document.getElementById('download_ens_emp_form_modal').close();
      }}>Télécharger</button>
    </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
    </dialog>
    <dialog id="download_groupe_emp_form_modal" className="modal">
        <div className="modal-box flex flex-col items-center justify-center gap-4 overflow-visible">
          <h3 className="font-bold text-lg">Emplois Du Temps</h3>
          <h4 className="text-base">{grp && ( grp.niveau + " " +grp.code_specialite + " "+ grp.code_section + " "+ grp.code_groupe ) }</h4>
          <div className="group drop relative" onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
          }}>
          <span className='text-black'>{annee}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={'icone group-[.active]:rotate-180'} />
             <ul className='list z-10 overflow-scroll max-h-40 top-12 hidden group-[.active]:block'>
                {getYears().map((year, index) => (
                  <li key={index} onClick={() => setAnnee(year.split("/")[1])}>{year}</li>
                ))}
              </ul>
          </div>
          <div className="group drop relative" onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
          }}>
          <span className='text-black'>{semestre}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={'icone group-[.active]:rotate-180'} />
             <ul className='list overflow-scroll max-h-40 top-12 hidden group-[.active]:block'>
             <li onClick={()=>{
                    setSemestre("1");
                }} style={{borderLeft:semestre==="semestre 1" ?'3px solid #0029FF':null}}>semestre 1</li>
                <li onClick={()=>{
                    setSemestre("2");
                }} style={{borderLeft:semestre==="semestre 2"?'3px solid #0029FF':null}}>semestre 2</li>
              </ul>
          </div>
          <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
      <button className="btn bg-blue-700 text-white" onClick={(e) => {
          e.preventDefault();
          window.location.href = `http://localhost:3000/emploistemps/groupe/${grp.id_groupe}/${semestre}/${annee}/xlsx`
          document.getElementById('download_groupe_emp_form_modal').close();
      }}>Télécharger</button>
    </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
    </dialog>
        </>
    )
    
}
export default Section;
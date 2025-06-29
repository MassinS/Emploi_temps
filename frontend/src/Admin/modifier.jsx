import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import './modifierEmp.css'
import axios from '../axiosConfig.js';
import toast from 'react-hot-toast';
function Modifier({onAdd,emploie,an,section,semes}){
    const [jour1, setJour1] = useState('');
    const [seance1, setSeance1] = useState('');
    const [groupe1, setgroupe1] = useState('');
    const [jour2, setJour2] = useState('');
    const [seance2, setSeance2] = useState('');
    const [groupe2, setgroupe2] = useState('');
    const [type, setType] = useState('Cour');
    const [Emp, setEmp] = useState(emploie);
    console.log(emploie);
    const confirmer=()=>{
        let  db=(emploie[jour2][seance2].debut);
        let fn=(emploie[jour2][seance2].fin);
        let lc;
        let sm;
        let creneau;
        let mat;
        let data;
        if(type!='Cour'){
            lc=emploie[jour2][seance2][groupe2].locale.code_local;
            sm=emploie[jour2][seance2][groupe2].seance.semestre;
            creneau=(emploie[jour2][seance2][groupe2].creneau.id_creneau).toString();
            mat=emploie[jour1][seance1][groupe1].enseignant.matricule;
            data={
                debut:db,
                fin:fn,
                jour:jour2,
                code_local:lc,
                annee:an,
                semestre:sm,
                id_creneau:creneau,
                matricule:mat
            }
        }else{
            lc=emploie[jour2][seance2].G1.locale.code_local;
            sm=emploie[jour2][seance2].G1.seance.semestre;
            mat=emploie[jour1][seance1].G1.enseignant.matricule;
            creneau = ''; // Initialisez creneau comme une chaîne vide
            
          // Boucle sur les groupes et concaténez les identifiants de créneau avec une virgule
          Array.from({ length: (Object.keys((emploie[jour2][seance2])).length-2)  }, (v, i) => {
           const groupe = 'G' + (i + 1);
           const id_creneau = (emploie[jour2][seance2][groupe].creneau.id_creneau.toString());
    
         // Ajoutez une virgule si creneau n'est pas vide
           if (creneau !== '') {
         creneau += ',';
          }
    
       // Concaténez l'identifiant de créneau actuel à la chaîne creneau
       creneau += id_creneau.toString();
       data={
        debut:db,
        fin:fn,
        jour:jour2,
        code_local:lc,
        annee:an,
        semestre:sm,
        id_creneau:creneau,
        matricule:mat
    }
     });
           
        }
        
        console.log(data)
       axios.post("http://localhost:3000/creneau/verification",data,{
        withCredentials: true
      }
       ).then((res)=>{
        
        if(res.data.message=='Créneau disponible'){
            
        let db2=(emploie[jour1][seance1].debut);
        let fn2=(emploie[jour1][seance1].fin);
        let lc2;
        let sm2;
        let creneau2;
        let mat2;
        let data2;
        if(type!='Cour'){
            lc2=emploie[jour1][seance1][groupe1].locale.code_local;
            sm2=emploie[jour1][seance1][groupe1].seance.semestre;
            creneau2=(emploie[jour1][seance1][groupe1].creneau.id_creneau).toString();
            
            mat2=emploie[jour2][seance2][groupe2].enseignant.matricule;
            data2={
                debut:db2,
                fin:fn2,
                jour:jour1,
                code_local:lc2,
                annee:an,
                semestre:sm2,
                id_creneau:creneau2,
                matricule:mat2
            }
        }else{
            lc2=emploie[jour1][seance1].G1.locale.code_local;
            sm2=emploie[jour1][seance1].G1.seance.semestre;
            mat2=emploie[jour2][seance2].G1.enseignant.matricule;
            creneau2 = ''; // Initialisez creneau comme une chaîne vide
            
          // Boucle sur les groupes et concaténez les identifiants de créneau avec une virgule
          Array.from({ length: (Object.keys((emploie[jour1][seance1])).length-2)  }, (v, i) => {
           const groupe = 'G' + (i + 1);
           const id_creneau = (emploie[jour1][seance1][groupe].creneau.id_creneau.toString());
    
         // Ajoutez une virgule si creneau n'est pas vide
           if (creneau2 !== '') {
         creneau2 += ',';
          }
    
       // Concaténez l'identifiant de créneau actuel à la chaîne creneau
       creneau2 += id_creneau.toString();
       data2={
        debut:db2,
        fin:fn2,
        jour:jour1,
        code_local:lc2,
        annee:an,
        semestre:sm2,
        id_creneau:creneau2,
        matricule:mat2
    }
     });
    }
        console.log(data2)
        axios.post("http://localhost:3000/creneau/verification",data2,{
            withCredentials: true
          }
           ).then((res)=>{
            if(res.data.message=='Créneau disponible'){
                const nouvelEmploi = { ...Emp }; // Créez une copie de l'objet emploi
        
        if (type === 'Cour') {
            Array.from({ length: Object.keys(nouvelEmploi.Dimanche[0]).length-2 }, (v, i) => {
                const groupe = 'G' + (i + 1);
                let x = nouvelEmploi[jour1][seance1][groupe];
                nouvelEmploi[jour1][seance1][groupe] = nouvelEmploi[jour2][seance2][groupe];
                nouvelEmploi[jour2][seance2][groupe] = x;
            });
        } else {
            let x = nouvelEmploi[jour1][seance1][groupe1];
            nouvelEmploi[jour1][seance1][groupe1] = nouvelEmploi[jour2][seance2][groupe2];
            nouvelEmploi[jour2][seance2][groupe2] = x;
        }
        setEmp(nouvelEmploi);
        const info={
            data:JSON.stringify(nouvelEmploi),
            semestre:semes[semes.length-1],
            annee:an,
            override:"true"
        }
        axios.post("http://localhost:3000/generate/save/"+section,info,{
            withCredentials: true
          }).then(()=>{
            toast.success('emploi du temps enregistré');
            onAdd();
          }).catch((err)=>{
            console.log(err);
            toast.error('enregistrement echoué');
          })
            }
           }).catch((err)=>{
            toast.error(err.response.data.message);
           })
        
       }}).catch((err)=>{
        toast.error(err.response.data.message);
       })

    }
    const confirmer2=()=>{
        let  db=(emploie[jour2][seance2].debut);
        let fn=(emploie[jour2][seance2].fin);
        let lc;
        let sm;
        let mat;
        let data;
        if(type=='Cour'){
            mat=emploie[jour1][seance1].G1.enseignant.matricule;
            sm=emploie[jour1][seance1].G1.seance.semestre;
            lc=emploie[jour1][seance1].G1.locale.code_local;
        }else{
            mat=emploie[jour1][seance1][groupe1].enseignant.matricule;
            sm=emploie[jour1][seance1][groupe1].seance.semestre;
            lc=emploie[jour1][seance1][groupe1].locale.code_local;
        }
        data={
            debut:db,
            fin:fn,
            jour:jour2,
            code_local:lc,
            annee:an,
            semestre:sm,
            matricule:mat
        }
        axios.post("http://localhost:3000/creneau/verification",data,{
            withCredentials: true
          }
           ).then((res)=>{
            if(res.data.message=='Créneau disponible'){
                const nouvelEmploi = { ...Emp }; // Créez une copie de l'objet emploi
        
        if (type === 'Cour') {
            Array.from({ length: Object.keys(nouvelEmploi.Dimanche[0]).length-2 }, (v, i) => {
                const groupe = 'G' + (i + 1);
                let x = nouvelEmploi[jour1][seance1][groupe];
                nouvelEmploi[jour1][seance1][groupe] = nouvelEmploi[jour2][seance2][groupe];
                nouvelEmploi[jour2][seance2][groupe] = x;
            });
        } else {
            let x = nouvelEmploi[jour1][seance1][groupe1];
            nouvelEmploi[jour1][seance1][groupe1] = nouvelEmploi[jour2][seance2][groupe2];
            nouvelEmploi[jour2][seance2][groupe2] = x;
        }
        setEmp(nouvelEmploi);
        const info={
            data:JSON.stringify(nouvelEmploi),
            semestre:semes[semes.length-1],
            annee:an,
            override:"true"
        }
        axios.post("http://localhost:3000/generate/save/"+section,info,{
            withCredentials: true
          }).then(()=>{
            toast.success('emploi du temps enregistré');
            onAdd();
          }).catch((err)=>{
            console.log(err);
            toast.error('enregistrement echoué');
          })
            }
           }).catch((err)=>{
            toast.error(err.response.data.message);
           })

    }
    return(
        <form className="forme z-20" onSubmit={(e) => {
            e.preventDefault();
           
            if(type=='Cour'){
                
                if (emploie[jour2][seance2].G1.seance) {
                    confirmer(); 
                }else{
                    confirmer2();
                }
            }else{
                if(emploie[jour2][seance2][groupe2].seance!=undefined){
                    confirmer();
                }else{
                    confirmer2();
                }
            }
           
        }}>
            <div className='close' onClick={()=>{onAdd()}}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            <h1 className="font-bold">Permuter</h1>
            <div className="flex w-full justify-between mt-4">
            <select className='w-1/2  border-b border-b-gray-500' value={jour1} onChange={(e)=>{
                setJour1(e.target.value);
            }}>
               <option value="" disabled selected>Jour</option>
               <option value="Samedi">Samedi</option>
               <option value="Dimanche">Dimanche</option>
               <option value="Lundi">Lundi</option>
               <option value="Mardi">Mardi</option>
               <option value="Mercredi">Mercredi</option>
               <option value="Jeudi">Jeudi</option> 
            </select>

            <select className='w-1/2  border-b ml-4 border-b-gray-500' value={seance1} onChange={(e)=>{
                setSeance1(e.target.value);
            }}>
               <option value="" disabled selected>Seance</option>
               {Array.from({ length: Object.keys(emploie.Dimanche).length }, (v, i) => {
                                     return (
                                        <option key={i} value={i}>{i+1}</option> 
                                            );
                               })}
            </select>
            </div>
            <div className="flex w-full justify-between mt-4">
            <select className='w-full  border-b border-b-gray-500' value={type} onChange={(e)=>{
                setType(e.target.value);
            }}>
               <option value="" disabled selected>Type seance</option>
               <option value="Cour">Cour</option>
               <option value="TD">TD</option>
               <option value="TP">TP</option>
               
            </select>
           {type!=='Cour'?<select className='w-full  border-b ml-4 border-b-gray-500' value={groupe1} onChange={(e)=>{
                setgroupe1(e.target.value);
            }}>
               <option value="" disabled selected>groupe</option>
               {Array.from({ length: Object.keys(emploie.Dimanche[0]).length-2 }, (v, i) => {
                                     return (
                                        <option key={i} value={'G'+(i+1)}>{'G'+(i+1)}</option> 
                                            );
                               })}
            </select>:null}
            </div>
            <h1 className="font-bold mt-4">Avec</h1>
            <div className="flex w-full justify-between mt-4">
            <select className='w-1/2  border-b border-b-gray-500' value={jour2} onChange={(e)=>{
                setJour2(e.target.value);
            }}>
               <option value="" disabled selected>Jour</option>
               <option value="Samedi">Samedi</option>
               <option value="Dimanche">Dimanche</option>
               <option value="Lundi">Lundi</option>
               <option value="Mardi">Mardi</option>
               <option value="Mercredi">Mercredi</option>
               <option value="Jeudi">Jeudi</option> 
            </select>

            <select className='w-1/2  border-b ml-4 border-b-gray-500' value={seance2} onChange={(e)=>{
                setSeance2(e.target.value);
            }}>
               <option value="" disabled selected>Seance</option>
               {Array.from({ length: Object.keys(emploie.Dimanche).length }, (v, i) => {
                                     return (
                                        <option key={i} value={i}>{i+1}</option> 
                                            );
                               })}
            </select>
            </div>

            

            <div className="flex w-full justify-between mt-4">
            <select className='w-full  border-b border-b-gray-500' value={type} onChange={(e)=>{
                setType(e.target.value);
            }}>
               <option value="" disabled selected>Type seance</option>
               <option value="Cour">Cour</option>
               <option value="TD">TD</option>
               <option value="TP">TP</option>
               
            </select>
           {type!=='Cour'?<select className='w-full  border-b ml-4 border-b-gray-500' value={groupe2} onChange={(e)=>{
                setgroupe2(e.target.value);
            }}>
               <option value="" disabled selected>groupe</option>
               {Array.from({ length: Object.keys(emploie.Dimanche[0]).length-2 }, (v, i) => {
                                     return (
                                        <option key={i} value={'G'+(i+1)}>{'G'+(i+1)}</option> 
                                            );
                               })}
            </select>:null}
            </div>
            <div className="flex w-full justify-center mt-8">
            <button type="submit" className='flex w-56 py-1 px-2 rounded-xl justify-center text-white bg-blue-700'>
             confirmer
            </button>
            </div>
        </form>
    )
}
export default Modifier;
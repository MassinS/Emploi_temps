import './afficherEmploi.css'
import Modify from './modifierEmp'
import './modifierEmp.css'
import { useState } from "react";
import axios from '../axiosConfig.js';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
function Afficher({onAdd,data,taille,db,dr,fn,ps,sm,an,section}){
    const [Show, setShow] = useState(false);
    const [emploi, setEmploi] = useState(data.data.creneaux);
    const handleAdd = (emp) => {
        setShow(false);//fermer le formulaire
        setEmploi(emp);
      };
      console.log(data)
    return(
        <div className="z-10 aksil bg-white px-8 pt-8 pb-24 rounded-lg" id={Show ? 'flou' : undefined}>
            <div className='close' onClick={()=>{onAdd()}}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            {Show?<Modify emploie={emploi} groupes={taille} debut={db} duree={dr} fin={fn} pose={ps} onAdd={handleAdd} an={an}/>:null}
            <table className='emploi'>
                <tr className='head'>
                    <td>Jour/heure</td>
                    {Object.keys(emploi.Dimanche).map((element,index)=>{
                     return(
                        <td key={index} className='head w-48'>{emploi.Dimanche[element].debut}-{emploi.Dimanche[element].fin}</td> 
                     )
                    })}
                </tr>
                <tr>
                    <td className='head '>Dimanche</td>
                    {Object.keys(emploi.Dimanche).map((element,index)=>{
                    if(emploi.Dimanche[element].G1){
                        if(emploi.Dimanche[element].G1.seance.type=='Cours'){
                            return(
                                <td key={index} >Cours {emploi.Dimanche[element].G1.enseignant.code_module}({emploi.Dimanche[element].G1.enseignant.nom} {emploi.Dimanche[element].G1.locale.code_local})</td>
    
                             )
                        }else{
                            return(
                                <td key={index}>
                                    <table  className='w-full'>
                                    {Array.from({ length: taille }, (v, i) => {
                                     const groupe = 'G' + (i+1);
                                     if (emploi.Dimanche[element][groupe]) {
                                     return (
                                     <tr key={i} className='h-10'>
                                      <td>{groupe}</td>
                                      <td>{emploi.Dimanche[element][groupe].seance.type} {emploi.Dimanche[element][groupe].enseignant.code_module}({emploi.Dimanche[element][groupe].enseignant.nom})</td>
                                      <td>{emploi.Dimanche[element][groupe].locale.code_local}</td>
                                     </tr>
                                         );
                                    } else {
                                     return (
                                     <tr key={i} ></tr>
                                      );
                                    }
                               })}
                                </table>
                                </td>
                                
                                
                             )
                        }
                        
                    }else{
                        return(
                            <td key={index}>
                            <table  className='w-full'>
                            {Array.from({ length: taille }, (v, i) => {
                             const groupe = 'G' + (i+1);
                             if (emploi.Dimanche[element][groupe]) {
                             return (
                             <tr key={i} className='h-10'>
                              <td>{groupe}</td>
                              <td>{emploi.Dimanche[element][groupe].seance.type} {emploi.Dimanche[element][groupe].enseignant.code_module}({emploi.Dimanche[element][groupe].enseignant.nom})</td>
                              <td>{emploi.Dimanche[element][groupe].locale.code_local}</td>
                             </tr>
                                 );
                            } else {
                             return (
                             <tr key={i} ></tr>
                              );
                            }
                       })}
                        </table>
                        </td>
                        )
                    }
                            
                        
                     
                    })}
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td className='head '>Lundi</td>
                    {Object.keys(emploi.Lundi).map((element,index)=>{
                    if(emploi.Lundi[element].G1){
                        if(emploi.Lundi[element].G1.seance.type=='Cours'){
                            return(
                                <td key={index} >Cours {emploi.Lundi[element].G1.enseignant.code_module}({emploi.Lundi[element].G1.enseignant.nom} {emploi.Lundi[element].G1.locale.code_local})</td>
    
                             )
                        }else{
                            return(
                                <td key={index}>
                                    <table  className='w-full'>
                                    {Array.from({ length: taille }, (v, i) => {
                                     const groupe = 'G' + (i+1);
                                     if (emploi.Lundi[element][groupe]) {
                                     return (
                                     <tr key={i} className='h-10'>
                                      <td>{groupe}</td>
                                      <td>{emploi.Lundi[element][groupe].seance.type} {emploi.Lundi[element][groupe].enseignant.code_module}({emploi.Lundi[element][groupe].enseignant.nom})</td>
                                      <td>{emploi.Lundi[element][groupe].locale.code_local}</td>
                                     </tr>
                                         );
                                    } else {
                                     return (
                                     <tr key={i} ></tr>
                                      );
                                    }
                               })}
                                </table>
                                </td>
                                
                                
                             )
                        }
                        
                    }else{
                        return(
                            <td key={index}>
                            <table  className='w-full'>
                            {Array.from({ length: taille }, (v, i) => {
                             const groupe = 'G' + (i+1);
                             if (emploi.Lundi[element][groupe]) {
                             return (
                             <tr key={i} className='h-10'>
                              <td>{groupe}</td>
                              <td>{emploi.Lundi[element][groupe].seance.type} {emploi.Lundi[element][groupe].enseignant.code_module}({emploi.Lundi[element][groupe].enseignant.nom})</td>
                              <td>{emploi.Lundi[element][groupe].locale.code_local}</td>
                             </tr>
                                 );
                            } else {
                             return (
                             <tr key={i} ></tr>
                              );
                            }
                       })}
                        </table>
                        </td>
                        )
                    }
                            
                        
                     
                    })}
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td className='head '>Mardi</td>
                    {Object.keys(emploi.Mardi).map((element,index)=>{
                    if(emploi.Mardi[element].G1){
                        if(emploi.Mardi[element].G1.seance.type=='Cours'){
                            return(
                                <td key={index} >Cours {emploi.Mardi[element].G1.enseignant.code_module}({emploi.Mardi[element].G1.enseignant.nom} {emploi.Mardi[element].G1.locale.code_local})</td>
    
                             )
                        }else{
                            return(
                                <td key={index}>
                                    <table  className='w-full'>
                                    {Array.from({ length: taille }, (v, i) => {
                                     const groupe = 'G' + (i+1);
                                     if (emploi.Mardi[element][groupe]) {
                                     return (
                                     <tr key={i} className='h-10'>
                                      <td>{groupe}</td>
                                      <td>{emploi.Mardi[element][groupe].seance.type} {emploi.Mardi[element][groupe].enseignant.code_module}({emploi.Mardi[element][groupe].enseignant.nom})</td>
                                      <td>{emploi.Mardi[element][groupe].locale.code_local}</td>
                                     </tr>
                                         );
                                    } else {
                                     return (
                                     <tr key={i} ></tr>
                                      );
                                    }
                               })}
                                </table>
                                </td>
                                
                                
                             )
                        }
                        
                    }else{
                        return(
                            <td key={index}>
                            <table  className='w-full'>
                            {Array.from({ length: taille }, (v, i) => {
                             const groupe = 'G' + (i+1);
                             if (emploi.Mardi[element][groupe]) {
                             return (
                             <tr key={i} className='h-10'>
                              <td>{groupe}</td>
                              <td>{emploi.Mardi[element][groupe].seance.type} {emploi.Mardi[element][groupe].enseignant.code_module}({emploi.Mardi[element][groupe].enseignant.nom})</td>
                              <td>{emploi.Mardi[element][groupe].locale.code_local}</td>
                             </tr>
                                 );
                            } else {
                             return (
                             <tr key={i} ></tr>
                              );
                            }
                       })}
                        </table>
                        </td>
                        )
                    }
                            
                        
                     
                    })}
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td className='head '>Mercredi</td>
                    {Object.keys(emploi.Mercredi).map((element,index)=>{
                    if(emploi.Mercredi[element].G1){
                        if(emploi.Mercredi[element].G1.seance.type=='Cours'){
                            return(
                                <td key={index} >Cours {emploi.Mercredi[element].G1.enseignant.code_module}({emploi.Mercredi[element].G1.enseignant.nom} {emploi.Mercredi[element].G1.locale.code_local})</td>
    
                             )
                        }else{
                            return(
                                <td key={index}>
                                    <table  className='w-full'>
                                    {Array.from({ length: taille }, (v, i) => {
                                     const groupe = 'G' + (i+1);
                                     if (emploi.Mercredi[element][groupe]) {
                                     return (
                                     <tr key={i} className='h-10'>
                                      <td>{groupe}</td>
                                      <td>{emploi.Mercredi[element][groupe].seance.type} {emploi.Mercredi[element][groupe].enseignant.code_module}({emploi.Mercredi[element][groupe].enseignant.nom})</td>
                                      <td>{emploi.Mercredi[element][groupe].locale.code_local}</td>
                                     </tr>
                                         );
                                    } else {
                                     return (
                                     <tr key={i} ></tr>
                                      );
                                    }
                               })}
                                </table>
                                </td>
                                
                                
                             )
                        }
                        
                    }else{
                        return(
                            <td key={index}>
                            <table  className='w-full'>
                            {Array.from({ length: taille }, (v, i) => {
                             const groupe = 'G' + (i+1);
                             if (emploi.Mercredi[element][groupe]) {
                             return (
                             <tr key={i} className='h-10'>
                              <td>{groupe}</td>
                              <td>{emploi.Mercredi[element][groupe].seance.type} {emploi.Mercredi[element][groupe].enseignant.code_module}({emploi.Mercredi[element][groupe].enseignant.nom})</td>
                              <td>{emploi.Mercredi[element][groupe].locale.code_local}</td>
                             </tr>
                                 );
                            } else {
                             return (
                             <tr key={i} ></tr>
                              );
                            }
                       })}
                        </table>
                        </td>
                        )
                    }
                            
                        
                     
                    })}
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td className='head '>Jeudi</td>
                    {Object.keys(emploi.Jeudi).map((element,index)=>{
                    if(emploi.Jeudi[element].G1){
                        if(emploi.Jeudi[element].G1.seance.type=='Cours'){
                            return(
                                <td key={index}>Cours {emploi.Jeudi[element].G1.enseignant.code_module}({emploi.Jeudi[element].G1.enseignant.nom} {emploi.Jeudi[element].G1.locale.code_local})</td>
    
                             )
                        }else{
                            return(
                                <td key={index}>
                                    <table  className='w-full'>
                                    {Array.from({ length: taille }, (v, i) => {
                                     const groupe = 'G' + (i+1);
                                     if (emploi.Jeudi[element][groupe]) {
                                     return (
                                     <tr key={i} className='h-10'>
                                      <td>{groupe}</td>
                                      <td>{emploi.Jeudi[element][groupe].seance.type} {emploi.Jeudi[element][groupe].enseignant.code_module}({emploi.Jeudi[element][groupe].enseignant.nom})</td>
                                      <td>{emploi.Jeudi[element][groupe].locale.code_local}</td>
                                     </tr>
                                         );
                                    } else {
                                     return (
                                     <tr key={i} ></tr>
                                      );
                                    }
                               })}
                                </table>
                                </td>
                                
                             )
                        }
                        
                    }else{
                        return(
                            <td key={index}>
                            <table  className='w-full'>
                            {Array.from({ length: taille }, (v, i) => {
                             const groupe = 'G' + (i+1);
                             if (emploi.Jeudi[element][groupe]) {
                             return (
                             <tr key={i} className='h-10'>
                              <td>{groupe}</td>
                              <td>{emploi.Jeudi[element][groupe].seance.type} {emploi.Jeudi[element][groupe].enseignant.code_module}({emploi.Jeudi[element][groupe].enseignant.nom})</td>
                              <td>{emploi.Jeudi[element][groupe].locale.code_local}</td>
                             </tr>
                                 );
                            } else {
                             return (
                             <tr key={i} ></tr>
                              );
                            }
                       })}
                        </table>
                        </td>
                        )
                    }
                            
                        
                     
                    })}
                    <td>
                        
                    </td>
                </tr>
            </table>
            {data.data && data.data.success && parseInt(data.headers['content-length'])>=2000 ?<div className='w-full flex justify-between mt-8'>
                <button className='emploimodifier text-white rounded-2xl px-3 py-2 w-28 transition-all delay-100' onClick={()=>{
                    setShow(!Show);
                }}>Modifier</button>
                <button className='emploimodifier text-white rounded-2xl px-3 py-2 w-28 transition-all delay-100' onClick={()=>{
                    const info={
                        data:JSON.stringify(emploi),
                        semestre:sm[sm.length-1],
                        annee:an,
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
                }}>Approuver</button>

            </div>:null}
        </div>
    )
}
export default Afficher;
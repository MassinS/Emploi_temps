import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import '../Admin/Emploi.css'
import image from '../assets/download.png'
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from '../axiosConfig.js';
import img from '../assets/360_F_134863241_QNHFFoMB6co8VdC1XY2VcDUPVWl9a3or.jpg'
import toast from 'react-hot-toast';
import './emp.css'
function MainSection({page}){
    const [reverse,setReverse]=useState(false);
    const [reverse2,setReverse2]=useState(false);
    const [reverse4,setReverse4]=useState(false);
    const [selected,setSelected]=useState('Selectionner une annee');
    const [selected2,setSelected2]=useState('Choisir semestre');
    const [code_specialite,setCodespecialite]=useState('Choisir specialite');
    const [specialites, setSpecialites] = useState([]);
    const [emp, setEmp] = useState([]);
    const [sections, setSections] = useState([]);
    const [newsections, setNewsections] = useState(sections);
    let user=Cookies.get('user');
  if(user){
    user=JSON.parse(user);
  }
  const np=user?user.nom+' '+user.prenom:'';
  const role=user?user.role : '';
    useEffect(() => {
        axios.get("http://localhost:3000/Specialite/",{
            withCredentials: true
          }).then(respo =>{
          setSpecialites(respo.data.specialites)
         })
         .catch(err => console.log(err));
     
    },[]);

    useEffect(() => {
        if(selected!="Selectionner une annee" && selected2!="Choisir semestre" && page=="Mon emploi"){
            const matricule=user?user.matricule:0;
            axios.get("http://localhost:3000/Creneau/enseignant/"+matricule+"/"+selected2+"/"+selected,{
                withCredentials: true
              }).then(respo =>{
              setEmp(respo.data.Creneaux);
             })
             .catch(err => console.log(err));
        }
        
     
    },[selected,selected2]);

    useEffect(()=>{
        setEmp([]);
        setSelected("Selectionner une annee");
        setSelected2("Choisir semestre");
        setCodespecialite('Choisir specialite');
        setSections([]);
    },[page])

    useEffect(() => {
        if(page!="Mon emploi" && page!="Occupation"){
            axios.get("http://localhost:3000/section",{
                withCredentials: true
              }).then(respo =>{
                const sectionsFiltres = respo.data.sections.filter(section => section.niveau === page && section.code_specialite===code_specialite);
                const updatesection = sectionsFiltres.map(section => ({ ...section, generated: true }));
              setSections(updatesection);
             })
             .catch(err => console.log(err));
        }
        
     
    },[code_specialite,page]);
    
    useEffect(() => {
        const updateSection=[... sections];
        if(page!="Mon emploi" && page!="Occupation"){
        if(sections.length>0){
            sections.map((section,index)=>{
            
                axios.get('http://localhost:3000/groupe',{
                    withCredentials: true
                  }).then((res)=>{                                                             
                    const grouprfilter=res.data.groupes.filter((gr)=> gr.code_section===section.code_section);
                    grouprfilter.map((gr)=>{
                       const id_groupe=parseInt(gr.id_groupe);
                        axios.get('http://localhost:3000/EmploisTemps/groupes/'+id_groupe+"/"+selected2+"/"+selected+"/"+page,{
                    withCredentials: true
                  }).then(()=>{
                    updateSection[index].generated=true;
                    setNewsections(updateSection);
                  }).catch(()=> {
                    updateSection[index].generated=false;
                    setNewsections(updateSection);
                })
                    })
                   
        
                  })
                .catch(err=>{
                    console.log(err)
                });
            })
        }else{
            setNewsections([]);//refresh le tableau d'affichage et afficher rien s'il n'existe pas de section pour niveau et la specialite choisie
        }
        }
    }
    ,[sections,selected2,page,selected]);
    
    const getYears = () => {
        const Year = new Date().getFullYear() + 1;
        return Array.from(new Array(10), (val, index) => `${Year - index - 1}/${Year - index}`);
      }

    return(
        <>
        {user===undefined?<Navigate to="/"  replace={true} />:null}{/*pour savoir si le cookie est expire*/}
         <div className='flex flex-col w-full h-full main px-10'>
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
    <div className='flex w-full justify-between'>
        <div className='drop relative' onClick={()=>{
            setReverse(!reverse);
        }}>
            <span className='text-black'>{selected}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse ? 'icone rotate' : 'icone'} />
             <ul className='list ' style={{display:reverse?'block':'none', bottom:"-500px"}}>
             {getYears().map((year,index)=>{
                    return(
                        <li key={index} onClick={()=>{
                            setSelected(year.split("/")[1]);
                        }} style={{borderLeft:selected==year.split("/")[1]?'3px solid #0029FF':null}}>{year}</li>
                    )
                    
                   })}
                
               
             </ul>
        </div>

        {page!="Mon emploi"?<div className='drop relative' onClick={()=>{
            setReverse4(!reverse4);
        }}>
            <span className='text-black'>{code_specialite}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse4 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-32' style={{display:reverse4?'block':'none',height:'98px'}}>
             {specialites.map((spec,index)=>{
                return <li key={index} onClick={()=>{
                    setCodespecialite(spec.code_specialite);
                }} style={{borderLeft:code_specialite===spec.code_specialite?'3px solid #0029FF':null}}>{spec.code_specialite}</li>
               })}
                
               
             </ul>
        </div>:null}

        <div className='drop relative' onClick={()=>{
            setReverse2(!reverse2);
        }}>
            <span className='text-black'>{selected2}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse2 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-28' style={{display:reverse2?'block':'none'}}>
                <li onClick={()=>{
                    setSelected2('1');
                }} style={{borderLeft:selected2==='1'?'3px solid #0029FF':null}}>semestre 1</li>
                <li onClick={()=>{
                    setSelected2('2');
                }} style={{borderLeft:selected2==='2'?'3px solid #0029FF':null}}>semestre 2</li>
             </ul>
        </div>


        

    </div>
    {
        emp && emp.Dimanche && emp.Dimanche[0] && emp.Dimanche[0].debut?<>
        <div className='flex w-full'>
        <table className='enseignant mt-10 w-full'>
          <tr className='head enstr'>
            <td className='head w-48'>Jour/heure</td>
            {Object.keys(emp.Dimanche).map((element, index) => (
              <td key={index} className='head w-48'>
                {emp.Dimanche[element].debut}-{emp.Dimanche[element].fin}
              </td>
            ))}
          </tr>
        
       
        {Object.keys(emp).map((jour, index) => {
            return(
                <tr key={index } className='enstr'>
                    <td className='head'>{jour}</td>
                    {Object.keys(emp[jour]).map((heure,ind)=>{
                        if(emp[jour][heure].info){
                            const innerseance=emp[jour][heure].info;
                            return(
                                <td key={ind}>
                                {innerseance && innerseance.seance && innerseance.locale ? 
                                    `${innerseance.seance.type} ${innerseance.seance.code_module} (${innerseance.locale.code_local} ${innerseance.seance.niveau}${innerseance.seance.code_specialite})` 
                                    : null}
                            </td>
                            )
                        }else{
                            return(
                                <td key={ind}></td>
                            )
                        }
                    })}
                </tr>
            )
        })}
        

        </table>

    </div>
    <div className='w-full flex justify-center mt-4'>
    <button type="submit" className='flex w-48 py-1 px-2 rounded-xl justify-center text-white bg-blue-700' onClick={()=>{
        const matricule=user?user.matricule:0;
        window.location.href="http://localhost:3000/EmploisTemps/enseignant/"+matricule+"/"+selected2+"/"+selected+"/xlsx";
        
    }}>
             Telecharger
            </button>
    </div>
        </>
        :null
    }
    {newsections?<div className="w-full flex flex-wrap mt-8 ">
    {newsections.map((section,index)=>{
        if(section.generated){
            return(
                <div key={index} className='w-96 mr-6 py-6 px-4  emploi' >
                    <img className='h-3/4 img' src={img}>
                        
                    </img>
                    <div className="w-full flex justify-between mt-8">
                        <p className="font-bold">Section {section.code_section}</p>
                        <button type="submit" className='flex w-48 py-1 px-2 rounded-xl justify-center text-white bg-blue-700' onClick={()=>{
                         window.location.href="http://localhost:3000/EmploisTemps/section/"+section.id_section+"/"+selected2+"/"+selected+"/xlsx";
        
    }}>
             Telecharger
            </button>
                    </div>
                </div>
            )
        }
    })}
    </div>:null}
    
    
    
    

    
</main>
        </div>
        </>
       
    )
}
export default MainSection;
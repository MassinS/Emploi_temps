
import '../Admin/Formajout.css'
import { useState, useEffect } from "react";
import axios from '../axiosConfig.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';
function Ajouter({onAdd,typep,modify}){
    const[nom,SetNom]=useState(modify.nom);
    const[prenom,SetPrenom]=useState(modify.prenom);
    const[email,SetEmail]=useState(modify.email);
    const[password,Setmdp]=useState('');
    const [specialite, setSpecialite] = useState([]);
    const [sections, setSection] = useState([]);
    const [gr, setGr] = useState([]);
    const [modules, setModule] = useState([]);
    const [ensModules, setensMod] = useState([]);
    const [anneeBac, setAnneeBac] = useState(modify.anneebac ||null);
    const [code_specialite, setSpecia] = useState(modify.code_specialite ||null);
    const [nom_specialite, setNomspecia] = useState(modify.nom_specialite ||null);
    const [niveau, setNiveau] = useState(modify.niveau ||null);
    const [semestre, setSemestre] = useState('');
    const [code_groupe, setCode_groupe] = useState(modify.code_groupe ||null);
    const [code_section, setCode_section] = useState(modify.code_section ||null);
    const [Id_section, setId_section] = useState(modify.id_section ||null);
    const [matricule, setMatricule] = useState(modify.matricule);
    const [role, setRole] = useState(modify.role ||null);
    const [charges, setCharges] = useState(modify.charges ||null);
    const [priorite, setPriorite] = useState(modify.charges ||null);
    const [id_groupe, setId_groupe] = useState(modify.id_groupe ||null);
    const [code_module, setCode_module] = useState(modify.code_module);
    const [nom_module, setNom_module] = useState(modify.nom_module);
    const [capacite, setCapacite] = useState(parseInt(modify.capacite,10));
    const [type, setType] = useState(modify.type ||typep);
    const [Bloc, setBloc] = useState(
        modify.type === 'SalleTD' || modify.type === 'SalleTP'
          ? modify.code_local?.substring(1, 2) || '' 
          : null
      );
      
      const [Salle, setSalle] = useState(
        modify.type === 'SalleTD' || modify.type === 'SalleTP'
          ? modify.code_local?.substring(3) || ''
          : modify.code_local?.substring(5) || ''
      );
    let code_local=type==='Amphi'?'Amphi'+Salle:'B'+Bloc+'S'+Salle;
    const [showmenu, setShowmenu] = useState(false);
    const [showmenu2, setShowmenu2] = useState(false);
    const personnes={matricule,nom,prenom,email,password,type,role,anneeBac,niveau,charges,id_groupe,code_specialite};
    const module={code_module,nom_module};
    const local={code_local,capacite,type};
    const specialites={code_specialite,nom_specialite};
    const section={code_section,niveau,code_specialite}
    const options = [
        { key: 'COUR', label: 'Cours', checked: false },
        { key: 'TD', label: 'TD', checked: false },
        { key: 'TP', label: 'TP', checked: false }
    ];
    const [typeS, setTypeS] = useState(options);

    useEffect(() => {
        axios.get("http://localhost:3000/module/",{
            withCredentials: true
          }).then(respo =>{
          setModule(respo.data.Modules);
          const modul = respo.data.Modules.map((module) => {
            return { ...module, checked: false };
        });
        setensMod(modul);
        axios.get("http://localhost:3000/moduleens",{
            withCredentials: true
          }).then(respo =>{
            const moduleens = respo.data.ModuleEns.filter((mdl) => mdl.matricule == matricule );
            setPriorite(moduleens[0].priorite);
            moduleens.forEach((module) => {
            const updatedOptions = [...modul] ;
            updatedOptions.forEach((mdl,idx)=>{
                if(module.code_module==mdl.code_module){
                updatedOptions[idx].checked = true;
                setensMod(updatedOptions);
            
                }
            })
            
           
        });
         })
         .catch(err => console.log(err));

         })
         .catch(err => console.log(err));
     
    },[]);

    
    const handleClick = (key) => {
        const updatedOptions = [...typeS ] ;
     
        updatedOptions[key].checked = !updatedOptions[key].checked;
        setTypeS(updatedOptions);
    };

    const handleClick2 = (key) => {
        const updatedOptions = [...ensModules ] ;
        updatedOptions[key].checked = !updatedOptions[key].checked;
        setensMod(updatedOptions);
        
    };

    const checkstyle=(key)=>{
        return{
            backgroundColor:typeS[key].checked?'#4070f4':null
        };
    }
    const iconstyle=(key)=>{
        return{
            display:typeS[key].checked?'block':null
        };
    }
    const checkstyle2=(key)=>{
        return{
            backgroundColor:ensModules[key].checked?'#4070f4':null
        };
    }
    const iconstyle2=(key)=>{
        return{
            display:ensModules[key].checked?'block':null
        };
    }

    const getYears = () => {
        const Year = new Date().getFullYear() + 1;
        return Array.from(new Array(10), (val, index) => `${Year - index - 1}/${Year - index}`);
      }
    

    useEffect(() => {
        axios.get("http://localhost:3000/Specialite/",{
            withCredentials: true
          }).then(respo =>{
          setSpecialite(respo.data.specialites)
         })
         .catch(err => console.log(err));
     
    },[]);

    useEffect(() => {
        axios.get("http://localhost:3000/section",{
            withCredentials: true
          }).then(respo =>{
            const sectionsFiltres = respo.data.sections.filter(section => section.niveau === niveau && section.code_specialite===code_specialite);
          setSection(sectionsFiltres);
         })
         .catch(err => console.log(err));
     
    },[code_specialite,niveau]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/groupe/",{
            withCredentials: true
          }).then(respo =>{
            const groupes = respo.data.groupes.filter((gr) => (gr.code_specialite === code_specialite && gr.id_section==Id_section) );
            console.log(Id_section);
          setGr(groupes);
         })
         .catch(err => console.log(err));
     
    },[niveau,code_specialite,Id_section]);

    
        useEffect(() => {
        axios.get("http://localhost:3000/seance/",{
            withCredentials: true
          }).then(respo =>{
            const seances = respo.data.Seances.filter((sc) => sc.code_module === code_module );
          setSpecia(seances[0].code_specialite);
          setSemestre(seances[0].semestre);
           setNiveau(seances[0].niveau);
          seances.forEach((seance) => {
            const updatedOptions = [...typeS ] ;
            updatedOptions.forEach((option,idx)=>{
                if(seance.type===option.label){
                updatedOptions[idx].checked = true;
                setTypeS(updatedOptions);
                }
            })
            
           
        });
         })
         .catch(err => console.log(err));
     
    },[]);

    


   
    const ajouter = (e) => {
        e.preventDefault();
        if(typep==='Etudiant'|| typep==='Enseignant' || typep==='Administrateur'){
        if (password.length > 8 && nom !== '' && prenom !== '' && email !== '' && typep==='Etudiant'?anneeBac:role !== '' && typep==='Etudiant'?code_specialite !== '':typep==='Enseignant'?charges !== '':true && typep==='Etudiant'?niveau !== '':true) {
            if(modify==''){
                
                axios.post('http://localhost:3000/personne',personnes,{
                    withCredentials: true
                  }).then(()=> {
                    
                    if(typep==='Enseignant'){
                        ensModules.forEach((module)=>{
                            const code_module=module.code_module;
                            const modules={matricule:parseInt(matricule),code_module,priorite:priorite};
                            if(module.checked){
                                axios.post('http://localhost:3000/moduleens',modules,{
                              withCredentials: true
                        }).then(()=>{onAdd();toast.success("ajout avec succes");});
                            }
                        })
                    }else{
                        onAdd();
                        toast.success("ajout avec succes");
                    }
                    
                
                
                })
            .catch(err=>{
                toast.error("ajout echoue");
                console.log(err)
            });
            }else{
                axios.put('http://localhost:3000/personne/'+modify.matricule,personnes,{
                    withCredentials: true
                  }).then(()=> {
                    if(typep==='Enseignant'){
                    axios.delete('http://localhost:3000/moduleens/'+modify.matricule,{
                        withCredentials: true
                      }).then(()=>{
                        ensModules.forEach((module) => {
                            if (module.checked) {
                                const mod = { code_module:module.code_module, matricule,priorite:1 };
                                axios.post("http://localhost:3000/moduleens",mod,{
                                    withCredentials: true
                                  }).then(()=>{onAdd();toast.success("modification réussie");})
                                    .catch(err => {console.log(err);toast.error("modification echoué");});
                            }
                        });
                      })
                    }else{
                        onAdd();
                        toast.success("modification réussie");
                    }
                })
                .catch(err=>{
                    toast.error("modification echoué");
                    console.log(err)
                });
            }
            
           
        }
    }else if(typep==='Modules') {
        if(modify===''){
            axios.post('http://localhost:3000/module/',module,{
                withCredentials: true
              }).then(() => {
            typeS.forEach((option) => {
                if (option.checked) {
                    let type=option.label;
                    const seance = { code_module, code_specialite,type,niveau,semestre };
                    axios.post("http://localhost:3000/seance/",seance,{
                        withCredentials: true
                      }).then(()=>{onAdd();})
                        .catch(err => {console.log(err);toast.error("ajout echoué")});
                }
            });
        }).then(()=>toast.success("ajout avec succes")).catch(err =>{ console.log(err);toast.error("ajout echoué");});
        }else{
           let module={code_module_new:code_module, nom_module}
            axios.put('http://localhost:3000/module/'+modify.code_module,module,{
                withCredentials: true
              }).then(()=>{
               axios.delete('http://localhost:3000/seance/modules/'+code_module,{
                withCredentials: true
              }).then(()=>{
                typeS.forEach((option) => {
                    if (option.checked) {
                        let type=option.label;
                        const seance = { code_module, code_specialite,type,niveau,semestre };
                        
                        axios.post("http://localhost:3000/seance/",seance,{
                            withCredentials: true
                          }).then(()=>{onAdd();})
                            .catch(err => {console.log(err);toast.error("modification echoué")});
                    }
                });
              }).then(()=>toast.success("modification réussie")).catch(err=>{
                console.log(err);
                toast.error("modification echoué");
            });
            }).catch(err=>{
                console.log(err);
                toast.error("modification echoué")
            });
        }
        

    }else if(typep==='Local'){
        if(modify===''){//pour savoir s'il s'agit d'une modification ou un ajout
            axios.post('http://localhost:3000/local/',local,{
                withCredentials: true
              }).then(()=> {onAdd();toast.success("ajout avec succés")})
            .catch(err=>{
                toast.success("ajout echoué");
                console.log(err)
            });
        }else{
            const code_local_new=code_local
            const lc={code_local_new,capacite,type};
            axios.put('http://localhost:3000/local/'+modify.code_local,lc,{
                withCredentials: true
              }).then(()=>{onAdd();toast.success("modification réussie")})
            .catch(err=>{
                console.log(err)
                toast.error("modification echoué");
            });
        }
       
    }else if(typep==='Specialite'){
        if(modify===''){
            
            axios.post('http://localhost:3000/specialite/',specialites,{
                withCredentials: true
              }).then(()=> {onAdd();toast.success("ajout avec succés")})
            .catch(err=>{
                toast.error("ajout echoué");
                console.log(err)
            });
        }else{
            const specia={code_specialite_new:code_specialite,nom_specialite}
            axios.put('http://localhost:3000/specialite/'+modify.code_specialite,specia,{
                withCredentials: true
              }).then(()=>{onAdd();toast.success("modification réussie")})
            .catch(err=>{
                toast.error("modification echoué");
                console.log(err)
            });
        }
    }else if(typep==='Section'){
        if(modify===''){
            
            axios.post('http://localhost:3000/section/',section,{
                withCredentials: true
              }).then(()=> {onAdd();toast.success("ajout avec succés")})
            .catch(err=>{
                toast.error("ajout echoué");
                console.log(err)
            });
        }else{
            axios.put('http://localhost:3000/section/'+modify.id_section,section,{
                withCredentials: true
              }).then(()=>{onAdd();toast.success("modification réussie")})
            .catch(err=>{
                toast.error("modification echoué");
                console.log(err)
            });
        }
    }else if(typep==='Groupe'){
        if(modify===''){
            axios.get("http://localhost:3000/section",{
            withCredentials: true
          }).then(respo =>{
            const sectionsFiltres = respo.data.sections.filter(section => section.niveau === niveau && section.code_section===code_section && section.code_specialite===code_specialite);
            const groupe={code_groupe,id_section:sectionsFiltres[0].id_section}
            axios.post('http://localhost:3000/groupe',groupe,{
                withCredentials: true
              }).then(()=> {onAdd();toast.success("ajout avec succés")})
            .catch(err=>{
                toast.success("ajout echoué");
                console.log(err)
            });
         })
         .catch(err => {
            toast.success("ajout echoué");
            console.log(err)});

        }
    }

    }
    return(
        <form className="form flex flex-col justify-between z-10" onSubmit={ajouter}>
            <div className='close' onClick={()=>{onAdd()}}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            {typep==='Modules'?<>
            <div className="flex w-full justify-between">
               <input type="text" placeholder="code module" value={code_module}  className='w-1/2' onChange={(e)=>{
                setCode_module(e.target.value);
               }}/>
               <input type="text" placeholder="nom module" value={nom_module} className="ml-4 w-1/2" onChange={(e)=>{
                setNom_module(e.target.value);
               }}/> 
            </div>

            <div className="flex w-full justify-between">
                <div className='w-1/2 down border-b border-b-gray-500 flex justify-between items-center relative' >
                <div className='flex w-full down  justify-between items-center' onClick={()=>{
                    setShowmenu(!showmenu);
                }}>
                    <span className='h-full text-gray-400' >selectionner un type</span>
                <FontAwesomeIcon icon={faAngleDown} className={showmenu ? ' rotate-180 text-sm text-gray-400' : 'text-sm text-gray-400'}/>
                </div>
                {showmenu?<ul className='droplist -bottom-44'>
                {options.map((option,index) => (
    <li key={index} className='flex items-center p-2' onClick={() => handleClick(index)}>
        <span className='checkbtn' style={checkstyle(index)}>
            <FontAwesomeIcon icon={faCheck} className='icon'  style={iconstyle(index)} />
        </span>
        <span>{option.label}</span>
    </li>
))}
            </ul>:null}
                </div>
            
               
              <select className='w-1/2 ml-4 border-b border-b-gray-500 text-gray-400' value={code_specialite}  onChange={(e)=>{
                setSpecia(e.target.value);
            }}>
               <option  disabled selected>Specialite</option>
               {specialite.map((spec,index)=>{
                return <option key={index} value={spec.code_specialite}>{spec.code_specialite}</option>
               })}
               
            </select>
            </div>
            <div className="flex w-full justify-between">
            <select className='w-full  border-b border-b-gray-500' value={niveau} onChange={(e)=>{
                setNiveau(e.target.value);
            }}>
               <option value="" disabled selected>Niveau</option>
               <option value="L1">L1</option>
               <option value="L2">L2</option>
               <option value="L3">L3</option>
               <option value="M1">M1</option>
               <option value="M2">M2</option> 
            </select>

            <select className='w-full  border-b ml-4 border-b-gray-500' value={semestre} onChange={(e)=>{
                setSemestre(e.target.value);
            }}>
               <option value="" disabled selected>Semestre</option>
               <option value="1">1</option>
               <option value="2">2</option>
            </select>
            </div>
            </>:typep==='Local'?
            <>
            <div className="flex w-full justify-between">
            <select className='border-b border-b-gray-500' style={type==='Amphi'?{width:'100%'}:{width:'50%'}} value={type} onChange={(e)=>{
                    setType(e.target.value);
                }}>
                   <option value="" disabled selected>Type</option>
                   <option value="SalleTD">SalleTD</option>
                   <option value="SalleTP">SalleTP</option>
                   <option value="Amphi">Amphi</option> 
                </select>
               {type==='SalleTD'||type==='SalleTP'?<input type="text" placeholder="Bloc*" value={Bloc} className="ml-4 w-1/2" onChange={(e)=>{
                setBloc(e.target.value);
               }}/> :null}
            </div>
            <div className="flex w-full justify-between">
               <input type="text" placeholder={type==="Amphi"?"Amphi*":"*Salle"} value={Salle} className=" w-1/2" onChange={(e)=>{
                setSalle(e.target.value);
               }}/> 
               <input type="text" placeholder="Capacite*"   className="ml-4 w-1/2" onChange={(e)=>{
                setCapacite(parseInt(e.target.value, 10));
               }}/> 
            </div>
            </>
    
            :typep==='Specialite'?
            <>
            <div className="flex w-full justify-between">
               <input type="text" placeholder="code specialite exemple:GL*" value={code_specialite} className='w-1/2' onChange={(e)=>{
                setSpecia(e.target.value);
               }}/>
               <input type="text" placeholder="nom specialite*" value={nom_specialite} className="ml-4 w-1/2" onChange={(e)=>{
                setNomspecia(e.target.value);
               }}/> 
            </div>
            </>:typep==='Section'?
            <>
            <div className="flex w-full justify-between">
            <select className='w-1/2 border-b border-b-gray-500' value={code_section} onChange={(e)=>{
                setCode_section(e.target.value);
            }}>
               <option value="" disabled selected>Section</option>
               <option value="A">A</option>
               <option value="B">B</option>
               <option value="C">C</option>
               <option value="D">D</option>
               <option value="E">E</option>
               <option value="G">G</option>
               <option value="H">H</option>
            </select>
            <select className='w-1/2 ml-4 border-b border-b-gray-500 text-gray-400' value={code_specialite}  onChange={(e)=>{
                setSpecia(e.target.value);
            }}>
               <option  disabled selected>Specialite</option>
               {specialite.map((spec,index)=>{
                return <option key={index} value={spec.code_specialite}>{spec.code_specialite}</option>
               })}
               
            </select>
            </div>
            <div className="flex w-full justify-between">
            <select className='w-full  border-b border-b-gray-500' value={niveau} onChange={(e)=>{
                setNiveau(e.target.value);
            }}>
               <option value="" disabled selected>Niveau</option>
               <option value="L1">L1</option>
               <option value="L2">L2</option>
               <option value="L3">L3</option>
               <option value="M1">M1</option>
               <option value="M2">M2</option> 
            </select>
            </div>
            </>:typep==='Groupe'?
            <>
            <div className="flex w-full justify-between">
            <select className='w-1/2  border-b border-b-gray-500 text-gray-400' value={code_specialite}  onChange={(e)=>{
                setSpecia(e.target.value);
            }}>
               <option  disabled selected>Specialite</option>
               {specialite.map((spec,index)=>{
                return <option key={index} value={spec.code_specialite}>{spec.code_specialite}</option>
               })}
               
            </select>

            <select className='w-1/2 ml-4  border-b border-b-gray-500' value={niveau} onChange={(e)=>{
                setNiveau(e.target.value);
            }}>
               <option value="" disabled selected>Niveau</option>
               <option value="L1">L1</option>
               <option value="L2">L2</option>
               <option value="L3">L3</option>
               <option value="M1">M1</option>
               <option value="M2">M2</option> 
            </select>

            </div>
            <div className="flex w-full justify-between">
            <select className='w-1/2 border-b border-b-gray-500' value={code_section} onChange={(e)=>{
                setCode_section(e.target.value);
            }}>
               <option value="" disabled selected>Section</option>
               {sections.map((section,index)=>{
                return <option key={index} value={section.code_section}>{section.code_section}</option>
               })}
            </select>

            <select className='w-1/2 ml-4 border-b border-b-gray-500' value={code_groupe} onChange={(e)=>{
                setCode_groupe(e.target.value);
            }}>
               <option value="" disabled selected>Groupe</option>
               <option value="G1">G1</option>
               <option value="G2">G2</option>
               <option value="G3">G3</option>
               <option value="G4">G4</option>
               <option value="G5">G5</option>
               <option value="G6">G6</option>
            </select>

            </div>
            </>
            :<>
            <div className="flex w-full justify-between">
               <input type="text" placeholder="Nom*" value={nom} className='w-1/2' onChange={(e)=>{
                SetNom(e.target.value);
               }}/>
               <input type="text" placeholder="Prenom*" value={prenom} className="ml-4 w-1/2" onChange={(e)=>{
                SetPrenom(e.target.value);
               }}/> 
            </div>

            <div className="flex w-full">
            <input type="email" placeholder="Email" value={email} className='w-full' onChange={(e)=>{
              SetEmail(e.target.value);
              
            }}/>
            <input placeholder="Mot de passe" value={password} className='w-full ml-4' onChange={(e)=>{
                Setmdp(e.target.value);
              }}/>
            </div>

            { typep==='Etudiant'?<div className="flex w-full justify-between">
                
                <select className='w-full border-b border-b-gray-500' value={anneeBac} onChange={(e)=>{
                    setAnneeBac(e.target.value, 10);
                }}>
                   <option value="" disabled selected>Annee du bac</option>
                   {getYears().map((year,index)=>{
                    return(
                        <option key={index} value={year.split("/")[1]} >{year}</option>
                    )
                    
                   })} 
                </select>
            <select className='w-full ml-4 border-b border-b-gray-500' value={code_specialite} onChange={(e)=>{
                setSpecia(e.target.value);
            }}>
               <option value="" disabled selected>Specialite</option>
               {specialite.map((spec,index)=>{
                return <option key={index} value={spec.code_specialite}>{spec.code_specialite}</option>
               })}
               
            </select>
            </div>:null
            }
            <div className="flex w-full ">
            {typep==='Etudiant' ?<select className='w-1/2 border-b border-b-gray-500' value={niveau} onChange={(e)=>{
                setNiveau(e.target.value);
            }}>
               <option value="" disabled selected>Niveau</option>
               <option value="L1">L1</option>
               <option value="L2">L2</option>
               <option value="L3">L3</option>
               <option value="M1">M1</option>
               <option value="M2">M2</option> 
            </select>:null
}
            {typep==='Enseignant' || typep==='Administrateur'? <select className='w-1/2 border-b border-b-gray-500' value={role} onChange={(e)=>{
                setRole(e.target.value);
            }}>
                
               <option value="" disabled selected>Role</option>
               { typep==='Administrateur'?<>
               <option value="admin pro">admin pro</option>
               <option value="Admin assistant">Admin assistant</option>
               <option value="Admin principale">Admin principale</option>
                </>:null}
               
            {typep==='Enseignant'?<>
            <option value="Doctorant">Doctorant</option>
               <option value="vacataire">vacataire</option>
               <option value="Professeur">Professeur</option>
            </>:null}
               
 
            </select>:null}
            

            <input type="text" placeholder="Matricule" defaultValue={matricule} className='w-1/2 ml-4' onChange={(e)=>{
              setMatricule(e.target.value, 10);
              
            }}/>
            </div>
            {
                typep==='Etudiant'?<div className="flex w-full ">
                    
                    <select className='w-1/2 border-b border-b-gray-500' value={Id_section} onChange={(e)=>{
                setId_section(e.target.value);
            }}>
               <option value="" disabled selected>Section</option>
               {sections.map((section,index)=>{
                return <option key={index} value={section.id_section}>{section.code_section}</option>
               })}
            </select>

                <select className='w-1/2 ml-4 border-b border-b-gray-500' value={id_groupe} onChange={(e)=>{
                    setId_groupe(e.target.value);
                }}>
                   <option value="" disabled selected>Groupe</option>
                   {gr.map((groupe,index)=>{
                    return <option key={index} value={groupe.id_groupe}>{groupe.code_groupe}</option>
                   })}
                </select>

                
                </div>:null
            }
            { typep==='Enseignant'?<>
            <div className="flex w-full justify-between">
                
                <select className='w-1/2 border-b border-b-gray-500' value={charges} onChange={(e)=>{
                    setCharges(e.target.value);
                }}>
                   <option value="" disabled selected>nombre seance maximale</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="6">6</option>
                   <option value="7">7</option>
                   <option value="8">8</option>
                   <option value="9">9</option>
                   <option value="10">10</option>
                </select>
                <div className='w-1/2 down border-b border-b-gray-500 flex justify-between items-center relative ml-4'>
                
                    <div className='w-full down flex justify-between' onClick={()=>{
                    setShowmenu2(!showmenu2)
                }}>
                    <span className='h-full text-gray-400' >selectionner module</span>
                <FontAwesomeIcon icon={faAngleDown} className={showmenu2 ? ' rotate-180 text-sm text-gray-400' : 'text-sm text-gray-400'}/>
                    </div>
                    
                {showmenu2?<ul className='droplist h-44 'style={{bottom:'-180px'}}>
                {modules.map((module,index) => (
         <li key={index} className='flex items-center p-2' onClick={() => handleClick2(index)}>
        <span className='checkbtn' style={checkstyle2(index)}>
            <FontAwesomeIcon icon={faCheck} className='icon'  style={iconstyle2(index)} />
        </span>
        <span>{module.nom_module}</span>
    </li>
))}
            </ul>:null}
                
                
            </div>

            </div>
            <div className="flex w-full justify-between">
            <select className='w-full border-b border-b-gray-500' value={priorite} onChange={(e)=>{
                    setPriorite(e.target.value);
                }}>
                   <option value="" disabled selected>Priorite</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                </select>
            </div>
            </>  :null
}
</>
            }
            <div className="flex w-full justify-center">
            <button type="submit" className='flex w-56 py-1 px-2 justify-center text-white bg-blue-700'>
             confirmer {modify !== '' ? "la modification" : null}
            </button>
            </div>
            
            
            
        </form>
    )
}
export default Ajouter;
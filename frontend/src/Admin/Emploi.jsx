import Cookies from 'js-cookie';
import image from '../assets/download.png'
import './Emploi.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import Afficher from '../Admin/afficherEmploi'
import AfficherEmp from '../Admin/Afficher'
import Modifier from '../Admin/modifier'
import axios from '../axiosConfig.js';
import toast from 'react-hot-toast';
function Emploi(){
    const [reverse,setReverse]=useState(false);
    const [reverse2,setReverse2]=useState(false);
    const [reverse3,setReverse3]=useState(false);
    const [reverse4,setReverse4]=useState(false);
    const [reverse5,setReverse5]=useState(false);
    const [reverse6,setReverse6]=useState(false);
    const [reverse7,setReverse7]=useState(false);
    const [reverse8,setReverse8]=useState(false);
    const [reverse9,setReverse9]=useState(false);
    const [annee,setAnnee]=useState('Selectionner une annee');
    const [semestre,setSemestre]=useState('Choisir semestre');
    const [niveau,setNiveau]=useState('Choisir niveau');
    const [code_specialite,setCodespecialite]=useState('Choisir specialite');
    const [dureeSeance,setdureeSeance]=useState('durée seance');
    const [debut,setDebut]=useState('Heure de début');
    const [fin,setFin]=useState('Heure de fin');
    const [dureePose,setPose]=useState('durée pose');
    const [sections, setSections] = useState([]);
    const [newsections, setNewsections] = useState(sections);
    const [specialites, setSpecialites] = useState([]);
    const [supprime, setSupprime] = useState(false);
    const [emploi,setEmploi]=useState([]);
    const [emploi2,setEmploi2]=useState([]);
    const [Show,setShow]=useState(false);
    const [Show2,setShow2]=useState(false);
    const [Show3,setShow3]=useState(false);
    const [terminer,setTerminer]=useState(false);
    const [groupes,setGroupes]=useState(0);
    const [id_sec,setIdsec]=useState(0);
    const [ignorer,setIgnorer]=useState('ignorer la charge');

    const GOOGLE_CLIENT_ID = "148373478842-lab6hq5l2piurkludiu36158p6tm0mah.apps.googleusercontent.com"; 
    const GOOGLE_REDIRECT_URI = "http://localhost:5000/email/send/callback";
    const sendEmail = (emps) => {
        const googleParams_s = Cookies.get("google_params");
        if (googleParams_s) {
            const googleParams = JSON.parse(googleParams_s);
            emps.forEach((emp) => {
                const t = toast.loading(`Sending Emails To ${emp.niveau}${emp.code_specialite} ${emp.code_section} ${emp.code_groupe}...`);
            axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                Authorization: `Bearer ${googleParams.access_token}`,
                },
            })
            .then((res) => {
                axios
                .post(
                    "http://localhost:3000/email/send",
                    {
                    id_emp: emp.id_emp,
                    user_email: res.data.email,
                    access_token: googleParams.access_token,
                    },
                    {
                    withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    toast.success(`${emp.niveau}${emp.code_specialite} ${emp.code_section} ${emp.code_groupe} Emails sent successfully`, { id: t });
                })
                .catch((err) => {
                    toast.error(`${emp.niveau}${emp.code_specialite} ${emp.code_section} ${emp.code_groupe} Error sending emails`, { id: t });
                    console.log(err);
                });
            })
            .catch((err) => {
                toast.error(`Error getting user email`, { id: t });
                Cookies.remove("google_params");
                console.log(err);
            });
            })
            
        }else{
            toast.error("Please authenticate with Google first");
            oauth2SignIn(() => sendEmail(emps));
        }
    }
    
    const oauth2SignIn = (callback) => {
        // Function to generate a random state value
        const generateCryptoRandomState = () => {
            const randomValues = new Uint32Array(2);
            window.crypto.getRandomValues(randomValues);

            // Encode as UTF-8
            const utf8Encoder = new TextEncoder();
            const utf8Array = utf8Encoder.encode(
            String.fromCharCode.apply(null, randomValues)
            );

            // Base64 encode the UTF-8 data
            return btoa(String.fromCharCode.apply(null, utf8Array))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        };
        // create random state value to check return result for a possible CSRF Attack
        const state = generateCryptoRandomState();
        // Google's OAuth 2.0 endpoint for requesting an access token
        const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

        
        // Parameters to pass to OAuth 2.0 endpoint.
        const params = {
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_REDIRECT_URI,
        scope:
            "https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.metadata https://www.googleapis.com/auth/userinfo.email https://mail.google.com/",
        state: state,
        include_granted_scopes: "true",
        response_type: "token",
        };

        const googlePopUp = window.open(undefined, 'Google Auth', 'height=600,width=450');
        // Create element to open OAuth 2.0 endpoint in new window.
        const form = googlePopUp.document.createElement("form");
        form.setAttribute("method", "GET"); // Send as a GET request.
        form.setAttribute("action", oauth2Endpoint);

        // Add form parameters as hidden input values.
        for (let p in params) {
        const input = googlePopUp.document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        googlePopUp.document.body.appendChild(form);
        form.submit();
        googlePopUp.document.body.remove(form);
        const start = Date.now();
        const checkForResult = setInterval(() => {
            const elapsed = Date.now() - start;// time elapsed in milliseconds
            if(elapsed >= 300000){ // try for 5 minutes
                clearInterval(checkForResult);
                toast.error("Google Auth Attempt Failed, Must Be done in less than 5 minutes, Please Retry")
            }

            const google_params_s = Cookies.get("google_params"); 
            console.log(google_params_s);
            if(google_params_s){
                clearInterval(checkForResult);
                const google_params = JSON.parse(google_params_s);
                console.log(google_params);
                if(google_params["state"] !== state){
                    console.log("Possible CSRF Detected");
                    toast.error("Possible CSRF Detected");
                    Cookies.remove("google_params")
                    return;
                }
                if(google_params["access_token"] === undefined){
                    console.log("Failed to get access_token");
                    toast.error("Google Auth Failed");
                    Cookies.remove("google_params")
                    return;
                }
                callback();
            }
        }, 100);
            
    };


    useEffect(() => {
        axios.get("http://localhost:3000/Specialite/",{
            withCredentials: true
          }).then(respo =>{
          setSpecialites(respo.data.specialites)
         })
         .catch(err => console.log(err));
     
    },[]);

    useEffect(() => {
        axios.get("http://localhost:3000/section",{
            withCredentials: true
          }).then(respo =>{
            const sectionsFiltres = respo.data.sections.filter(section => section.niveau === niveau && section.code_specialite===code_specialite);
            const updatesection = sectionsFiltres.map(section => ({ ...section, generated: false, emps:{} }));
          setSections(updatesection);
          
          
         })
         .catch(err => console.log(err));
     
    },[code_specialite,niveau]);

    useEffect(() => {
        const updateSection=[... sections];
       
        if(sections.length>0){
            sections.map((section,index)=>{
            
                axios.get('http://localhost:3000/groupe',{
                    withCredentials: true
                  }).then((res)=>{           
                    console.log(res);                                                  
                    const grouprfilter=res.data.groupes.filter((gr)=> gr.code_section===section.code_section);
                    setGroupes(grouprfilter.length);
                    grouprfilter.map((gr)=>{
                       const id_groupe=parseInt(gr.id_groupe);
                       const sem=semestre[semestre.length-1]
                        axios.get('http://localhost:3000/EmploisTemps/groupes/'+id_groupe+"/"+sem+"/"+annee+"/"+niveau,{
                    withCredentials: true
                  }).then((res)=>{
                    updateSection[index].generated=true;
                    (new Set()).a
                    updateSection[index].emps[gr.code_groupe] = res.data.Emplois_temps;
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
     
    ,[sections,semestre,niveau,annee,supprime,terminer]);
    
    
    let user=Cookies.get('user');
  if(user){
    user=JSON.parse(user);
  }
  const np=user?user.nom+' '+user.prenom:'';
  const role=user?user.role : '';

  const generer=(id_section)=>{
    if(debut!="Heure de début" && fin!="Heure de fin" && dureePose!="durée pose" && dureeSeance!="durée seance"){
        const duree=dureeSeance.split('h');
        const db=debut.split('h');
        const fn=fin.split('h');
        let ignor;
        if(ignorer=="oui"){
            ignor="1";
        }else{
            ignor="0";
        }
        
        const data={
            semestre:semestre[semestre.length-1],
            temps_debut:JSON.stringify({
                h:parseInt(db[0]),
                m:parseInt(db[1])
            }),
            temps_fin:JSON.stringify({
                h:parseInt(fn[0]),
                m:parseInt(fn[1])
            }),
            
            duree_creneaux:JSON.stringify({
                h:parseInt(duree[0]),
                m:parseInt(duree[1])
            }),
            minutes_entre_creneaux:parseInt(dureePose),
            annee,
            shuffle:1,
            ignore_charges:ignor
            
        }
        axios.get('http://localhost:3000/groupe',{
            withCredentials: true
          }).then((res)=>{           
            const grouprfilter=res.data.groupes.filter((gr)=> gr.id_section===id_section);
            setGroupes(grouprfilter.length);
            axios.post("http://localhost:3000/generate/"+id_section,data,{
                withCredentials: true
              }).then((res)=>{
                setEmploi(res);
                setShow(true);
                if(res.data.success ){
                    if(parseInt(res.headers['content-length'])>=2000){
                        toast.success("generation avec succes");
                    }else{
                        toast.success("emploi du temps vide");
                    }
                }else if(res.data.error){
                    if(res.data.error=="Some seances have not been scheduled"){
                        toast.success("emploi du temps generer mais il manque des seance qui ne sont pas affecter vous devez soit ajouter des enseignat ou ignorer les charge d'enseignant", {
                            duration: 8000
                          });
                    }
                }
              }).catch((err)=>{
                toast.error("erreur lors du generation");
              })
          })
    
    }else{
        toast.error("vous devez selectionner tous les champs")
    }
        
    
   
  }
  const affiche=(id_section,respo)=>{
                const sem=semestre[semestre.length-1];
                axios.get("http://localhost:3000/creneau/section/"+id_section+'/'+sem+'/'+annee,{
                    withCredentials: true
                  }).then((res)=>{
                    setEmploi2(res.data.Creneaux);
                    console.log(emploi2)
                    if(emploi2.Dimanche || emploi2.Samedi){
                        if(respo==1){
                            setShow3(!Show3);
                        }else{
                            setShow2(!Show2);
                        }
                        
                    }
                  }).catch((err)=>{
                    console.log(err)
                  })
  }
  

  const handleAdd = () => {
    
    setShow(false);//fermer le formulaire
    setTerminer(!terminer);//pour faire un refresh a la table
    setIgnorer("ignorer la charge");
  };
  const handleAdd2 = () => {
    
    setShow2(false);//fermer le formulaire
  };
  const handleAdd3 = () => {
    
    setShow3(false);//fermer le formulaire
  };

  const getYears = () => {
    const Year = new Date().getFullYear() + 1;
    return Array.from(new Array(10), (val, index) => `${Year - index - 1}/${Year - index}`);
  }

    return(
        <div className='flex flex-col w-full h-full main px-10 z-0 relative' id={(Show || Show2 || Show3) ? 'mainflou' : undefined} style={(Show || Show2 || Show3) ?{zIndex:"9"}:null}>
            {Show?<Afficher onAdd={handleAdd} data={emploi} taille={groupes} db={debut} dr={dureeSeance} fn={fin} ps={dureePose} sm={semestre} an={annee} section={id_sec}  />:null /*formulaire d'ajout*/}
            {Show2?<AfficherEmp onAdd={handleAdd2} emploie={emploi2}/>:null}
            {Show3?<Modifier onAdd={handleAdd3} emploie={emploi2} an={annee} section={id_sec} semes={semestre}/>:null}
            <header className="flex w-full  justify-between  mt-8 h-fit">
    <div className="">
    <p className="text-black  text-3xl font-bold">Emploi du temps</p>
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
            <span className='text-black'>{annee}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse ? 'icone rotate' : 'icone'} />
             <ul className='list ' style={{display:reverse?'block':'none', bottom:"-500px"}}>
             {getYears().map((year,index)=>{
                    return(
                        <li key={index} onClick={()=>{
                            setAnnee(year.split("/")[1]);
                        }} style={{borderLeft:annee==year.split("/")[1]?'3px solid #0029FF':null}}>{year}</li>
                    )
                    
                   })}
                
               
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse2(!reverse2);
        }}>
            <span className='text-black'>{semestre}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse2 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-28' style={{display:reverse2?'block':'none'}}>
                <li onClick={()=>{
                    setSemestre("semestre 1");
                }} style={{borderLeft:semestre==="semestre 1" ?'3px solid #0029FF':null}}>semestre 1</li>
                <li onClick={()=>{
                    setSemestre("semestre 2");
                }} style={{borderLeft:semestre==="semestre 2"?'3px solid #0029FF':null}}>semestre 2</li>
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse3(!reverse3);
        }}>
            <span className='text-black'>{niveau}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse3 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-64' style={{display:reverse3?'block':'none'}}>
                <li onClick={()=>{
                    setNiveau('L1');
                }} style={{borderLeft:niveau==='L1'?'3px solid #0029FF':null}}>L1</li>
                <li onClick={()=>{
                    setNiveau('L2');
                }} style={{borderLeft:niveau==='L2'?'3px solid #0029FF':null}}>L2</li>
                <li onClick={()=>{
                    setNiveau('L3');
                }} style={{borderLeft:niveau==='L3'?'3px solid #0029FF':null}}>L3</li>
                <li onClick={()=>{
                    setNiveau('M1');
                }} style={{borderLeft:niveau==='M1'?'3px solid #0029FF':null}}>M1</li>
                <li onClick={()=>{
                    setNiveau('M2');
                }} style={{borderLeft:niveau==='M2'?'3px solid #0029FF':null}}>M2</li>
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
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
        </div>

    </div>

    {(code_specialite!='Choisir specialite' && niveau!='Choisir niveau' && annee!='Selectionner une annee' && semestre!='Choisir semestre')?
    <>
    <div className='w-full'>
        <p className="text-black  text-2xl font-bold mt-8">Champs pour generation d&apos;emploi du temps</p>
        <div className='w-full flex justify-between mt-6'>

        <div className='drop relative' onClick={()=>{
            setReverse8(!reverse8);
        }}>
            <span className='text-black'>{debut}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse8 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-28' style={{display:reverse8?'block':'none'}}>
                <li onClick={()=>{
                    setDebut('8h00');
                }} style={{borderLeft:debut==='8h00'?'3px solid #0029FF':null}}>8h00</li>
                <li onClick={()=>{
                    setDebut('8h30');
                }} style={{borderLeft:debut==='8h30'?'3px solid #0029FF':null}}>8h30</li>
                
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse9(!reverse9);
        }}>
            <span className='text-black'>{fin}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse9 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-52' style={{display:reverse9?'block':'none'}}>
                <li onClick={()=>{
                    setFin('15h00');
                }} style={{borderLeft:fin==='15h00'?'3px solid #0029FF':null}}>15h00</li>
                <li onClick={()=>{
                    setFin('16h00');
                }} style={{borderLeft:fin==='16h00'?'3px solid #0029FF':null}}>16h00</li>
                <li onClick={()=>{
                    setFin('17h00');
                }} style={{borderLeft:fin==='17h00'?'3px solid #0029FF':null}}>17h00</li>
                <li onClick={()=>{
                    setFin('18h00');
                }} style={{borderLeft:fin==='18h00'?'3px solid #0029FF':null}}>18h00</li>
                
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse5(!reverse5);
        }}>
            <span className='text-black'>{dureeSeance}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse5 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-40' style={{display:reverse5?'block':'none'}}>
                <li onClick={()=>{
                    setdureeSeance('1h00');
                }} style={{borderLeft:dureeSeance==='1h00'?'3px solid #0029FF':null}}>1h00</li>
                <li onClick={()=>{
                    setdureeSeance('1h30');
                }} style={{borderLeft:dureeSeance==='1h30'?'3px solid #0029FF':null}}>1h30</li>
                <li onClick={()=>{
                    setdureeSeance('2h00');
                }} style={{borderLeft:dureeSeance==='2h00'?'3px solid #0029FF':null}}>2h00</li>
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse6(!reverse6);
        }}>
            <span className='text-black'>{dureePose}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse6 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-40' style={{display:reverse6?'block':'none'}}>
                <li onClick={()=>{
                    setPose('5');
                }} style={{borderLeft:dureePose==='5'?'3px solid #0029FF':null}}>5</li>
                <li onClick={()=>{
                    setPose('10');
                }} style={{borderLeft:dureePose==='10'?'3px solid #0029FF':null}}>10</li>
                <li onClick={()=>{
                    setPose('20');
                }} style={{borderLeft:dureePose==='20'?'3px solid #0029FF':null}}>20</li>
             </ul>
        </div>

        <div className='drop relative' onClick={()=>{
            setReverse7(!reverse7);
        }}>
            <span className='text-black'>{ignorer}</span>
            <FontAwesomeIcon
             icon={faAngleDown}
             className={reverse7 ? 'icone rotate' : 'icone'} />
             <ul className='list -bottom-28' style={{display:reverse7?'block':'none'}}>
                <li onClick={()=>{
                    setIgnorer('oui');
                }} style={{borderLeft:ignorer==='oui'?'3px solid #0029FF':null}}>oui</li>
                <li onClick={()=>{
                    setIgnorer('non');
                }} style={{borderLeft:ignorer==='non'?'3px solid #0029FF':null}}>non</li>
              
             </ul>
        </div>

        

        </div>

    </div>
    <table className='mt-10 z-0 w-full aks' >
        <tr className='head'>
        <td>Id</td>
        <td>specialite</td>
        <td>niveau</td>
        <td>status</td>
        <td>section</td>
        <td>Action</td>
        </tr>
        {newsections.map((section,index)=>{
            
            return (
                <tr key={index} className='group'>
                  <td>{index+1}</td>
                  <td>{section.code_specialite}</td>
                  <td>{section.niveau}</td>
                  <td>
                  
                  {section.generated?<FontAwesomeIcon icon={faCheck} className='text-white bg-green-500 p-1 rounded-3xl hv'/>:
                  <FontAwesomeIcon icon={faXmark} className='text-white bg-red-600 px-1.5 py-1 rounded-3xl'/>
                  }
                 
                  </td>
                  <td>{section.code_section}</td>
                  <td>

                  {section.generated?
                  <>

                   <FontAwesomeIcon icon={faEye} className='ml-4 text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                    affiche(section.id_section);
            }}/>
               <FontAwesomeIcon icon={faPen} className='ml-8 text-blue-700 group-hover:text-white cursor-pointer' onClick={()=>{
                affiche(section.id_section,1);
                setIdsec(section.id_section);
                }}/>
                <FontAwesomeIcon icon={faTrash} className='ml-8 text-red-600 cursor-pointer' onClick={()=>{
                 axios.get('http://localhost:3000/groupe',{
                    withCredentials: true
                  }).then((res)=>{
                    let success=false;
                    const grouprfilter=res.data.groupes.filter((gr)=> gr.code_section===section.code_section);
                    grouprfilter.map((gr)=>{
                        const id_groupe=parseInt(gr.id_groupe);
                        const seme=semestre[semestre.length-1];
                        axios.delete('http://localhost:3000/EmploisTemps/groupes/'+id_groupe+"/"+seme+"/"+annee,{
                            withCredentials: true
                          }).then((rr)=>{
                            if(success==false){
                                toast.success("suppresion avec succes");
                            }
                            success=true;
                            console.log(rr)
                            setSupprime(!supprime);
                          }).catch(()=> {
                            toast.error("suppression echoué");
                        })
                    })
                  })
                   
                 
                 
               }}/>
                <FontAwesomeIcon icon={faDownload} className='ml-4 text-green-600 cursor-pointer hv' onClick={()=>{
                    const seme=semestre[semestre.length-1];
                    window.location.href="http://localhost:3000/EmploisTemps/section/"+section.id_section+"/"+seme+"/"+annee+"/xlsx";
            }}/>
            <FontAwesomeIcon icon={faEnvelope} className='ml-4 text-blue-700 group-hover:text-white cursor-pointer' onClick={() => {
                    sendEmail(Object.values(section.emps));
            }}/>
                  </>
                  
               
               :<>
               <FontAwesomeIcon icon={faAdd} className=' ml-4 text-blue-700 text-xl cursor-pointer hv' onClick={()=>{
                generer(section.id_section);
                setIdsec(section.id_section);
                }}/>
               
               </>}
                  </td>
                  
                 
                </tr>
              );
             
        })}
        
    </table>
    </>
    :null}

    
</main>
        </div>
    )
}
export default Emploi;
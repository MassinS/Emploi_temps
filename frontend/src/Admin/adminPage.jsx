import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faS } from '@fortawesome/free-solid-svg-icons'
import { faG } from '@fortawesome/free-solid-svg-icons'
import '../navbar.css'
import Section from '../Admin/mainSection'
import { useState } from "react";
import Emploi from './Emploi'
import Cookies from 'js-cookie';
function AdminPage() {
  const [nomPage, setNomPage] = useState("Etudiant");

  return (
    
    <div className='flex w-full h-full bg-white' >
        <div className="flex flex-col w-56  background h-full h-screen pl-3 fixed" style={{zIndex:"1"}}>
            <div className=' flex pl-3 pt-8 items-center'>
                <div className='logo'></div>
                <p className='text-white text-3xl font-semibold ml-3'>Logo</p>
            </div>
            <div className='mt-20 items'>
            <div className='parent 
            relative
            flex
            items-center
            py-2 h-14
            
            rounded-2xl
            pl-3
             '  onClick={()=>{
              setNomPage("Etudiant")
            }}>
            <FontAwesomeIcon icon={faGraduationCap} className='text-lg w-5 child' />
            <li className='list-none ml-3 child text-base'>Liste des étudiants</li>
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative'  onClick={()=>{
              setNomPage("Enseignant")
            }}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='text-lg h-5 w-5 text-white child ' />
            <li className='list-none ml-3 text-white text-base child'>Liste des enseignant</li>
           
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative'  onClick={()=>{
              setNomPage("Administrateur")
            }}>
            <FontAwesomeIcon icon={faUserTie} className='text-lg w-5 text-white child ' />
            <li className='list-none ml-3 text-white text-base child'>Liste admin</li>
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative' onClick={()=>{
              setNomPage("Modules")
            }}>
            <FontAwesomeIcon icon={faBookOpen} className='text-lg w-5 text-white child ' />
            <li className='list-none ml-3 text-white text-base child' >Modules</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Local")
            }}>
            <FontAwesomeIcon icon={faBuilding} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child' >Local</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Specialite")
            }}>
            <FontAwesomeIcon icon={faList} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child' >Specialite</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Section")
            }}>
            <FontAwesomeIcon icon={faS} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child' >Section</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Groupe")
            }}>
            <FontAwesomeIcon icon={faG} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child' >Groupe</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Emploi du temps")
            }}>
            <FontAwesomeIcon icon={faCalendarDays} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child' >Emploi du temps</li>
            </div>
            
            

            </div>
            <div  className='flex deconnecter bottom-4 pl-3 items-center py-2 h-14 hover:bg-white rounded-2xl parent  absolute'onClick={()=>{
             Cookies.remove('user');
             Cookies.remove('token');
             setNomPage('');//juste pour faire un render
             }}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-lg w-5 text-white child' />
            <li className='list-none ml-3 text-white text-base child '>Se deconnecter</li>
            </div>
            

        </div>
        {nomPage==='Emploi du temps'?<Emploi/>:<Section page={nomPage}/>}
        
    </div>

     
    
  )
}

export default AdminPage

import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Navigate } from "react-router-dom";
import '../navbar.css'
import MainSection from '../etud&ens/mainSection'
import { useState } from "react";
import Emploi from '../Admin/Emploi'
import Occupation from './occupation'
import Cookies from 'js-cookie';
function MenuPage() {
  const [nomPage, setNomPage] = useState("L1");
  let user=Cookies.get('user');
  if(user){
    user=JSON.parse(user);
  }
  return (
    <>
    <div className='flex w-full h-full bg-white' >
        <div className="flex flex-col w-56 background h-full h-screen pl-3 fixed">
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
              setNomPage("L1")
            }}>
            
            <li className='list-none ml-3 child text-base'>1 er année</li>
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative'  onClick={()=>{
              setNomPage("L2")
            }}>
            
            <li className='list-none ml-3 text-white text-base child'>2 éme année</li>
           
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative'  onClick={()=>{
              setNomPage("L3")
            }}>
            
            <li className='list-none ml-3 text-white text-base child'>3 éme année</li>
            </div>

            <div  className='parent flex pl-3  items-center py-2 h-14  rounded-2xl  relative' onClick={()=>{
              setNomPage("M1")
            }}>
            
            <li className='list-none ml-3 text-white text-base child' >Master 1</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("M2")
            }}>
            
            <li className='list-none ml-3 text-white text-base child' >Master 2</li>
            </div>

            {
            user?user.type==='Enseignant'?<>
            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Occupation")
            }}>
           
            <li className='list-none ml-3 text-white text-base child' >Occupation</li>
            </div>

            <div  className='flex pl-3 items-center py-2 h-14  rounded-2xl parent  relative'onClick={()=>{
              setNomPage("Mon emploi")
            }}>
           
            <li className='list-none ml-3 text-white text-base child' >Mon emploi</li>
            </div>
            </>:null:null}
            

            
            

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
        {nomPage==='Occupation'?<Occupation page={nomPage}/>:<MainSection page={nomPage} />}
        
    </div>

    </>
   
     
    
  )
}

export default MenuPage;

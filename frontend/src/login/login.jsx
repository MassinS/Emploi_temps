import Form from '../login/form'
import '../login/Login.css'
import image from '../assets/BlogImage.png'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Logo() {
    const user = (Cookies.get("user") && JSON.parse(Cookies.get("user"))) || null;

    return user !== null ? (
      user.type === 'Administrateur' ? <Navigate to='/admin' /> : <Navigate to='/etu' />
    ) : (
      <div className='flex-col w-screen min-w-full h-full min-h-screen bg-cover bg-no-repeat' style={{backgroundImage: `url(${image})`}}>
        <div className='h-20 w-screen min-w-full'></div>
        <div className='w-full px-8 py-8  flex-col md:flex-row sm:justify-between xl:px-20 items-center  md:flex sm:items-center relative '>
        <div className='hello mb-8 md:mb-20 flex flex-col justify-center'    >
          <p className='text-4xl sm:max-xl:text-5xl xl:text-6xl text-white font-semibold'>Planifiez Votre Semaine</p>
          <p className='mt-12 text-white '>Que vous soyez enseignant, étudiant ou membre de ladministration, notre plateforme vous offre un outil intuitif pour créer, gérer et optimiser vos emplois du temps. Simplifiez la planification de vos cours.</p>
          <hr className='mt-12 text-white md:w-72 border-2 border-solid border-white '/>
          <p className='mt-12 text-white '>Rejoignez notre communauté dès aujourdhui et découvrez comment           peut simplifier votre vie académique.</p>
        </div>
        <Form/>
        
      </div>
    </div>
      
    )
  }
  
  export default Logo
  
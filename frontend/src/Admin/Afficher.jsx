import React from 'react';
import './afficherEmploi.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
function AfficherEmp({onAdd, emploie }) {
  console.log(emploie);

  return (
    <div className='z-10 aksil'>
      <div className='close' onClick={()=>{onAdd()}}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
      <table className='emploi'>
        <thead>
          <tr className='head'>
            <td>Jour/heure</td>
            {Object.keys(emploie.Dimanche).map((element, index) => (
              <td key={index} className='head w-48'>
                {emploie.Dimanche[element].debut}-{emploie.Dimanche[element].fin}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(emploie).map((jour, index) => (
            <tr key={index}>
              <td className='head'>{jour}</td>
              {Object.keys(emploie[jour]).map((horaire, ind) => {
                const seance = emploie[jour][horaire].G1.seance;
                if (seance) {
                  if (seance.type === 'Cours') {
                    return (
                      <td key={ind}>
                        Cours {seance.code_module}({emploie[jour][horaire].G1.enseignant.nom} {emploie[jour][horaire].G1.locale.code_local})
                      </td>
                      
                    );
                  } else {
                    return (
                      <td key={ind}>
                        <table className='w-full h-full'>
                          {Object.keys(emploie[jour][horaire]).map((element, inx) => {
                            const innerSeance = emploie[jour][horaire][element].seance;
                            if(element!='debut' && element!='fin'){
                              if (innerSeance) {
                              return (
                                <tr key={inx} >
                                  <td>{element}</td>
                                  <td>
                                    {innerSeance.type} {innerSeance.code_module}({emploie[jour][horaire][element].enseignant.nom})
                                  </td>
                                  <td>{emploie[jour][horaire][element].locale.code_local}</td>
                                </tr>
                              );
                            } else {
                              return <tr key={inx}></tr>;
                            }
                            }
                            
                          })}
                        </table>
                      </td>
                    );
                  }
                } else {
                  return (
                    <td key={ind}>
                      <table className='w-full h-full'>
                        {Object.keys(emploie[jour][horaire]).map((element, inx) =>{
                          const innerSeance = emploie[jour][horaire][element].seance;
                          if(element!='debut' && element!='fin'){
                            if (innerSeance) {
                            return (
                              <tr key={inx} >
                                <td>{element}</td>
                                <td>
                                  {innerSeance.type} {innerSeance.code_module} ({emploie[jour][horaire][element].enseignant.nom})
                                </td>
                                <td>{emploie[jour][horaire][element].locale.code_local}</td>
                              </tr>
                            );
                          } else {
                            return <tr key={inx}></tr>;
                          }
                          }
                        } )}
                      </table>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AfficherEmp;
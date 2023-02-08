import { useState, useEffect } from 'react';

import api from "../../services/api";

import { ContactCard } from '../ContactCard';
import { NoneContacts } from '../NoneContacts';

export const Dashboard = () => {

  const [ contacts, setContacts ] = useState([])

  const renderizeContacts = async () => {
    const id = localStorage.getItem("@userId");
    const token = localStorage.getItem("@token");
 
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      api.get("/contacts").then(res => {
        const data = res.data
        setContacts(data)
      }
      ).catch(err => {
        console.error(err)
      })

    return contacts
  }

  useEffect(() => {
    
    

  }, [contacts])

  const name = JSON.parse(localStorage.getItem("@userData"))

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Olá {name.name}!</h1>
            <button onClick={() => { return renderizeContacts()}}
            className="rounded-md shadow-md w-52 bg-blue-600 text-white"> Renderizar contatos</button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col">
            {
              contacts[0] ?
              <h1 className= "self-center place-self-center text-3xl font-semibold">
                Estes são os seus contatos:
              </h1> :
              <NoneContacts/>
            }
            
            <div className="px-4 py-6 sm:px-0 flex justify-around items-center content-center">
              {
                contacts.map((elem, index) => {
                  return(
                    <ContactCard
                    name={elem.name}
                    email={elem.email}
                    telefone={elem.telefone}
                    key={index}/>
                  )
                })
              }
              
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
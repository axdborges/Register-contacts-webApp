import { useState, useEffect } from "react"

import { CreateContact } from "../CreateContact"

export const NoneContacts = () => {

    const [open, setOpen] = useState(false)

    useEffect(() => {


    }, [open])

    return (
        <div className="self-center place-self-center flex flex-col h-96 justify-evenly items-center content-center" >
            {open ? <CreateContact open={open} setOpen={setOpen}/> :
                <>
                    <h1 className= "self-center place-self-center text-3xl font-semibold">
                        Parece que você não tem contatos 
                    </h1>
                    <p className="w-80 text-center font-semibold">
                        Clique em renderizar contatos ou adicione um novo contato aqui:
                    </p>
                    <button className="rounded-md shadow-md w-52 h-9 bg-blue-600 text-white"
                    onClick={() => setOpen(true)}>
                        Adicionar contatos
                    </button>
                </>
            }
        </div>
    )
}
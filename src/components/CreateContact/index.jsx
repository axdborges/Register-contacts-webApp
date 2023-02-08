import { Fragment, useRef, useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import api from "../../services/api"

export const CreateContact = ({open, setOpen}) =>  {

  const schema = yup.object().shape({
    name: yup.string().required("Nome completo obrigatório"),
    telefone: yup.number().required("Telefone obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  });

  const { register, handleSubmit, formState: {errors}, } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFunction = (data) => {
    const token = localStorage.getItem("@token");

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api.post("/contacts", data).then(res => {
      const data = res.data;
      alert(`Novo contato ${data.name} criado`)
      setOpen(false)
    }).catch(err => {
      console.error(err.message)
    })
  }

  return (
    <form className="w-96 bg-blue-600 h-96 flex flex-col justify-evenly rounded-md shadow-md" 
    onSubmit={handleSubmit(submitFunction)}>
      <AiOutlineClose className="rounded-md shadow-md w-8 h-9 text-white flex items-end justify-end self-end"
        onClick={() => setOpen(false)}/>
      <div className="h-full bg-white flex flex-col items-center justify-around w-full">
        <div className="flex flex-col items-start">
          <label htmlFor="">Nome</label>
          <input type="text" {...register("name")}/>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Email</label>
          <input type="text" {...register("email")}/>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Telefone</label>
          <input type="text" {...register("telefone")}/>
        </div>
        <button className="rounded-md shadow-md w-52 h-9 bg-blue-600 text-white">
          Criar contato
        </button>
      </div>
    </form>
  )
}
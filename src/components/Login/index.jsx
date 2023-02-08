import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';

import api from "../../services/api"

export const Login = () => {

  const [ userId, setUserId ] = useState("");
  const [ user, setUser ] = useState(null);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const { register, handleSubmit, formState: {errors}, } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFunction = (data) => {
    api.post('/login' , data)
    .then((response) => {
    localStorage.clear();
    localStorage.setItem("@token", response.data.token) 
    setUserId(response.data.user.id)
    setUser(response.data.user)
    localStorage.setItem("@userData", JSON.stringify(response.data.user))
    localStorage.setItem("@userId", response.data.user.id)
    
    navigate(`/contacts`)
    
    })
    .catch((err) => {
        alert('Email ou Senha incorretos')
        localStorage.clear()
        console.log(err)
    })
    
}

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Faça o seu login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou se é novo usuário {' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Faça o seu cadastro
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit(submitFunction)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Endereço de email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Endereço de email"
                  {...register("email")}
                />
                <span>{errors.email?.message}</span>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Senha"
                  {...register("password")}
                />
                <span>{errors.password?.message}</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                </span>
                Logar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
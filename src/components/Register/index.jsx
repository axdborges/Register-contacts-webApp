import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import api from "../../services/api"

export const Register = () => {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Nome completo obrigatório"),
    telefone: yup.number().required("Telefone obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    isAdm: yup.bool().default(false)
  });

  const { register, handleSubmit, formState: {errors}, } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFunction = (data) => {
    api.post('/users' , data)
    .then((response) => {
    console.log(response.data)
    localStorage.clear();
    alert("Usuário cadastrado com sucesso")
    
    navigate(`/login`)
    
    })
    .catch((err) => {
        alert('Não foi possivel fazer cadastro')
        localStorage.clear()
        console.log(err)
    })
    
}




    return (
        <form action="#" onSubmit={handleSubmit(submitFunction)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="complete-name" className="block text-sm font-medium text-gray-700">
                        Seu nome completo
                      </label>
                      <input
                        type="text"
                        name="complete-name"
                        id="complete-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("name")}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="number"
                        name="telefone"
                        id="telefone"
                        maxLength="11"
                        autoComplete="phonenumber"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("telefone")}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Endereço de email
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("email")}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Senha
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("password")}
                      />
                    </div>


                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                  
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Faça o login
                  </Link>
                  <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
    )
}
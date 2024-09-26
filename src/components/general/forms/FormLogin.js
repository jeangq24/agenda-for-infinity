import { useState } from "react"
import InputText from "../inputs/InputText"
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useUser } from "@/config/UserContext";

export default () => {
    const {login} = useUser()
    const [userName, setUsename] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUserName = (e) => {
        const { value } = e.target;
        setUsename(value);
    }

    const handleChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
    }

    const submit = async() => {
        try {
            if(userName.length === 0){
                return toast.error("Escriba un usuario valido");
            };

            if(password.length === 0) {
                return toast.error("Escriba una contraseña valida");
            };

            await login(userName, password);
        } catch (error) {
            console.log(error);
            return;
        }
    }
    return (
        <div className="w-full grow lg:h-full flex items-center justify-center">
        <div className="w-full grow p-8 lg:p-40 rounded-lg">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Iniciar Sesión</h1>
      
          <div className="flex flex-col gap-6">
            <InputText
              placeholder="Insertar usuario"
              onChange={handleChangeUserName}
              textLabel="Usuario"
              type="text"
              value={userName}
              className="font-poppins w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-infinity-pink-softPink"
            />
      
            <InputText
              placeholder="Insertar contraseña"
              onChange={handleChangePassword}
              textLabel="Contraseña"
              type="password"
              value={password}
              className="font-poppins w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-infinity-pink-softPink"
            />
          </div>
      
          <div className="mt-6 flex justify-between items-center">
            <a onClick={()=>{toast.success("Comunicate con el admistrador de Infinity Peluqueria")}} className="cursor-pointer text-sm text-gray-600 hover:underline font-poppins">¿Olvidaste tu contraseña?</a>
          </div>
      
          <div className="mt-8">
            <Button
              className="font-poppins w-full py-3 bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-infinity-pink-softPink"
              onClick={() => submit()}
            >
              Ingresar
            </Button>
          </div>
        </div>
      </div>
      
    )
}
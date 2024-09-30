import { useState } from "react";
import DropDown from "../dropdown/DropDown";
import InputText from "../inputs/InputText";
import { Key } from "@phosphor-icons/react";

export default ({formData, handleInputChange, setFormData}) => {

  // Campos del formulario
  const fields = [
    { name: "name", type: "text", placeholder: "Nombre del usuario", label: "Nombre" },
    { name: "email", type: "email", placeholder: "Correo del usuario", label: "Correo" },
    { name: "phone", type: "number", placeholder: "Celular del usuario", label: "Número de Celular" },
    { name: "username", type: "text", placeholder: "Username del usuario", label: "Username" },
    { name: "password", type: "password", placeholder: "Contraseña para el usuario", label: "Contraseña" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Mapeo de los campos de entrada */}
      {fields.map((field) => (
        <InputText
          key={field.name}
          placeholder={field.placeholder}
          textLabel={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={(e)=>handleInputChange(e, field.name)}
          className="font-poppins w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-infinity-pink-softPink"
        />
      ))}

      {/* Dropdown para seleccionar el rol */}
      <DropDown listItems={["Admin", "Employee"]} setValue={(value) => setFormData({ ...formData, role: value })} value={formData.role.length > 0 ? formData.role : null}>
        <Key className={""} />
        <span>Rol:</span>
      </DropDown>
    </div>
  );
};

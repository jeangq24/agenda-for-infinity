// TableUsers.js
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Button, Tooltip, Input } from "@nextui-org/react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Trash, Gear, PlusCircle, Eye, User, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import ModalAction from "../modal/ModalAction";
import FormAddUser from "../forms/FormAddUser";
import { useUser } from "@/config/UserContext";
import AvatarProfile from "../profile/AvatarProfile";

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Celular", uid: "phone" },
  { name: "Rol", uid: "role" },
  { name: "Acciones", uid: "actions" },
];

const TableUsers = ({ users, functions }) => {
  const { user: userProvider } = useUser();
  const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onOpenView, onOpenChange: onOpenChangeView } = useDisclosure();
  const [userRef, setUserRef] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });

  // Manejador de cambios de los campos del formulario
  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const submitEditUser = async () => {
    try {
      const { name: nameInput, email: emailInput, phone: phoneInput, username: usernameInput, password, role } = formData;
      const { person, username, rolId, id } = userRef;
      const { email, phone, name } = person;

      // Función para validar correo electrónico
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      // Función para validar teléfono (10 dígitos numéricos)
      const isValidPhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
      };

      // Validaciones
      if (nameInput === name && emailInput === email && phoneInput === phone && usernameInput === username && role.toLowerCase() === rolId.toLowerCase() && password.length === 0) {
        return toast.error("No se ha modiciado ningun campo");
      }

      if (!isValidEmail(emailInput)) {
        return toast.error("Correo electrónico no válido");
      }

      if (!isValidPhone(phoneInput)) {
        return toast.error("El número de teléfono debe ser de 10 dígitos numéricos");
      }

      if (usernameInput.length < 4 || usernameInput.length > 20) {
        return toast.error("El nombre de usuario debe tener entre 4 y 20 caracteres");
      }

      const data = {
        name: nameInput,
        phone: phoneInput,
        username: usernameInput,
        email: emailInput,
        rol: role
      }
      if (password.length > 0) {
        if (password.length < 4 || password.length > 20) {
          return toast.error("La contraseña debe tener entre 4 y 20 caracteres");
        };
        data.password = password;
      };

      const result = await functions.editEmployee(id, data)
      if (result) {
        toast.success("Usuario se edito con éxito");
        setUserRef(null);
        onOpenChangeEdit(false);  // Close the modal after submission

      };
    } catch (error) {
      toast.error("Error al editar usuario");
    }
  };


  const classNamaHeadIconButton = `w-8 h-8 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold p-2 transition duration-500`;

  const renderCell = useMemo(() => (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col gap-2 font-poppins justify-center">
            <span className="font-bold">{user?.person?.name}</span>
            <span className="text-infinity-black-slateGray">{user?.person?.email}</span>
          </div>
        );
      case "phone":
        return <p className="text-bold text-sm capitalize font-poppins">{user?.person?.phone}</p>;
      case "role":
        return <p className="text-bold text-sm capitalize font-poppins">{user?.rolId.toLowerCase() === "employee" ? "Empleado" : user?.rolId.toLowerCase() === "admin" ? "Administrador" : "No definido"}</p>;
      case "actions":
        return (
          <div className="flex gap-2 justify-center">
            <Tooltip content="Ver detalles">
              <Eye
                className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                onClick={() => {

                  setUserRef(user);
                  onOpenChangeView(!isViewOpen);
                }}
              />
            </Tooltip>
            <Tooltip content="Editar usuario">
              <Gear
                className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                onClick={() => {
                  const { person, rolId, username } = user;
                  const { name, email, phone } = person;
                  setFormData({
                    name,
                    email,
                    phone,
                    username,
                    password: "",
                    role: rolId
                  })
                  setUserRef(user);
                  onOpenChangeEdit(!isEditOpen)
                }}
              />
            </Tooltip>
            <Tooltip color="danger" content="Eliminar usuario">
              <Trash
                className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                onClick={() => {
                  if (user.id === userProvider.id) {
                    return toast.error("No puede eliminar su mismo usuario");
                  }
                  setUserRef(user)
                  onOpenChangeDelete(!isDeleteOpen)
                }}
              />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <AddUser addEmployee={functions?.addEmployee} />
      <Table aria-label="table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="bg-infinity-black-carbon text-infinity-pink-lightPink font-bold text-md">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users || []} emptyContent="Sin registros disponibles">
          {(item) => (
            <TableRow key={item.id} className="shadow-md drop-shadow-md rounded-2xl">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ELIMINAR USER */}
      <ModalAction
        isOpen={isDeleteOpen}
        onOpen={onOpenDelete}
        onOpenChange={onOpenChangeDelete}
        titleHead={`¿Desea eliminar el usuario: ${userRef?.username}?`}
        labelAction={"Eliminar"}
        handleAction={async () => {
          const result = await functions.dltEmployee(userRef?.id);
          if (result) {
            setUserRef(null);
            onOpenChangeDelete(!isDeleteOpen);
            toast.success("Usuario eliminado con exito");
          };
        }}
      >
        <span>Esta acción no se puede deshacer una vez confirmada</span>
      </ModalAction>


      {/* MODAL PARA CONFIRMAR EDITAR */}
      <ModalAction
        isOpen={isEditOpen}
        onOpen={onOpenEdit}
        onOpenChange={onOpenChangeEdit}
        titleHead={`Editar usuario`}
        labelAction={"Editar"}
        handleAction={submitEditUser}
      >
        <FormAddUser
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
        />

      </ModalAction>



      {/* MODAL PARA VER USER */}
      <ModalAction
        isOpen={isViewOpen}
        onOpen={onOpenView}
        onOpenChange={onOpenChangeView}
        titleHead={userRef?.person?.name}
        labelAction={"Aceptar"}
        handleAction={() => {
          onOpenChangeView(!isViewOpen)
          setUserRef(null);
        }}
      >
        <UserCard user={userRef} />
      </ModalAction>
    </>

  );
};

const AddUser = ({ addEmployee }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });

  // Manejador de cambios de los campos del formulario
  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitUser = async () => {
    try {
      const { name, email, phone, username, password, role } = formData;

      // Función para validar correo electrónico
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      // Función para validar teléfono (10 dígitos numéricos)
      const isValidPhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
      };

      // Validaciones
      if (!name || !email || !phone || !username || !password || !role) {
        return toast.error("Todos los campos deben ser rellenados");
      }

      if (!isValidEmail(email)) {
        return toast.error("Correo electrónico no válido");
      }

      if (!isValidPhone(phone)) {
        return toast.error("El número de teléfono debe ser de 10 dígitos numéricos");
      }

      if (username.length < 4 || username.length > 20) {
        return toast.error("El nombre de usuario debe tener entre 4 y 20 caracteres");
      }

      if (password.length < 4 || password.length > 20) {
        return toast.error("La contraseña debe tener entre 4 y 20 caracteres");
      }
      const result = await addEmployee({ name, phone, username, email, password, rol: role })
      if (result) {
        toast.success("Usuario creado con éxito");
        onOpenChange(false);  // Close the modal after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          role: "",
        });
      };
    } catch (error) {
      toast.error("Error al crear usuario");
    }
  };

  return (
    <div>
      <Tooltip content="Crear usuario">
        <Button
          onPress={onOpen}
          className="z-10 fixed bottom-6 right-6 rounded-full bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink"
        >
          <PlusCircle className="w-full h-full text-infinity-white-snow" />
        </Button>
      </Tooltip>

      <ModalAction
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        titleHead="Crear usuario"
        labelAction="Crear usuario"
        handleAction={submitUser}
      >
        <FormAddUser
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
        />
      </ModalAction>
    </div>
  );
};

const UserCard = ({ user }) => {
  const { person, username, rolId } = user;
  const { name, phone, email } = person;

  return (
    <div className="flex flex-col gap-6">
      <div className="">
        <AvatarProfile
          name={name}
          role={rolId.toLowerCase() === "employee" ? "Empleado" : rolId.toLowerCase() === "admin" ? "Administrador" : "No definido"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          className=""
          type="text"
          label={<div className="flex flex-row items-center gap-2">
            <User className={""} />
            <span className={""}>Usuario</span>
            <span>{username}</span>
          </div>}
          labelPlacement={"inside"}
          disabled={true}
        />

        <Input
          className=""
          type="text"
          label={<div className="flex flex-row items-center gap-2">
            <EnvelopeSimple className={""} />
            <span className={""}>Correo</span>
            <span>{email}</span>
          </div>}
          labelPlacement={"inside"}
          disabled={true}
        />

        <Input
          className=""
          type="text"
          label={<div className="flex flex-row items-center gap-2">
            <Phone className={""} />
            <span className={""}>Celular</span>
            <span>{phone}</span>
          </div>}
          labelPlacement={"inside"}
          disabled={true}
        />
      </div>
    </div>
  );
};


export default TableUsers;

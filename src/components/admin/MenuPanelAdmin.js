import AvatarProfile from "@/components/general/profile/AvatarProfile";
import { useUser } from "@/config/UserContext";
import { useBurgerMenu } from "@/config/BurgerMenuContext";
import { getMenuItems } from "@/lib/menuItems"; // Importamos los ítems del menú


// Documentación del componente
/**
 * MenuPanelAdmin es el componente que renderiza el menú de navegación para un panel de administración,
 * mostrando diferentes ítems según el rol del usuario.
 * @param {Array} menuItems - Los ítems del menú que se mostrarán.
 * @param {Function} setMenuItems - Función para actualizar los ítems del menú.
 */

const MenuPanelAdmin = ({ menuItems, setMenuItems }) => {
    const { logout, user } = useUser();
    const { handleBurgerClick } = useBurgerMenu();
    // Genera la clase CSS para ítems activos e inactivos
    const getMenuItemClassName = (isActive) =>
        `w-full py-3 md:py-5 ${isActive ? 'bg-infinity-pink-salmonPink text-infinity-white-snow' : 'hover:bg-infinity-pink-softPink hover:text-infinity-white-snow'} 
    rounded-2xl px-3 flex flex-row justify-between items-center gap-2 cursor-pointer transition duration-700`;


    // Cambia el ítem seleccionado en el menú
    const handleChangeSelectedMenu = async (item, index) => {
        if (item.id === "cerrarSesion") {
            await logout();
            handleBurgerClick();
            return;
        }

        const updatedMenuItems = getMenuItems();
         // Resetea el menú
        updatedMenuItems[index].selected = true; // Marca el ítem seleccionado
        setMenuItems(updatedMenuItems);
    };

    // Renderiza los ítems del menú según el rol del usuario
    const renderMenuItems = () => {
        return menuItems
            .filter((item) => user?.rol === "admin" || ["agenda", "horario", "cerrarSesion"].includes(item.id)) // Filtra por rol
            .map((item, index) => (
                <li
                    key={item.id + "_items"}
                    className={getMenuItemClassName(item.selected)} // Aplica clase activa o inactiva
                    onClick={() => handleChangeSelectedMenu(item, index)}
                >
                    {item?.Icon}
                    <div className="w-full h-full flex items-center justify-start">{item.content}</div>
                </li>
            ));
    };

    return (
        <div className="w-full h-full flex flex-col justify-between gap-5 lg:gap-10 p-10 bg-infinity-black-carbon overflow-auto z-10">
            {/* Avatar del perfil */}
            <AvatarProfile size={14} name={user?.name} role={user?.rolId}/>

            {/* Ítems del menú */}
            <ul className="text-infinity-pink-lightPink w-full h-full flex flex-col justify-items font-poppins font-bold gap-2 md:gap-5 lg:gap-10">
                {renderMenuItems()}
            </ul>
        </div>
    );
};

export default MenuPanelAdmin;

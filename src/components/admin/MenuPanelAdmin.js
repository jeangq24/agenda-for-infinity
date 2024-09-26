import { CalendarDots, Clock, Package, UsersFour, XCircle, Trash, Gear, Pulse, PlusCircle } from "@phosphor-icons/react";
import AvatarProfile from "@/components/general/profile/AvatarProfile";
import { useUser } from "@/config/UserContext";
import { useBurgerMenu } from "@/config/BurgerMenuContext";

export default  ({ menuItems, setMenuItems }) => {
    const {logout, user} = useUser();
    const { handleBurgerClick } = useBurgerMenu();
    const classNameItemActive = `w-full py-3 md:py-5 bg-infinity-pink-salmonPink rounded-2xl px-3 text-infinity-white-snow flex flex-row justify-between item-center gap-2 cursor-pointer transition duration-700`;
    const classNameItemInactive = `w-full py-3 md:py-5 hover:bg-infinity-pink-softPink hover:text-infinity-white-snow rounded-2xl px-3 flex flex-row justify-between item-center gap-2 cursor-pointer transition duration-700`;

    const classNameContainerNameItem = `w-full h-full flex items-center justify-start`;

    const handleChangeSeletedMenu = async(item, index) => {

        if(item.id === "cerraSesion" ) {
            await logout();
            handleBurgerClick();
            return;
        };

        const menuFormat = [
            { id: "agenda", content: "Agenda", selected: false, Icon: <CalendarDots className="w-8 h-8" /> },
            { id: "horario", content: "Horario", selected: false, Icon: <Clock className="w-8 h-8" /> },
            { id: "servicios", content: "Servicios", selected: false, Icon: <Package className="w-8 h-8" /> },
            { id: "equipo", content: "Equipo de trabajo", selected: false, Icon: <UsersFour className="w-8 h-8" /> },
            { id: "cerraSesion", content: "Cerrar Sesion", selected: false, Icon: <XCircle className="w-8 h-8"/> }
        ];

        menuFormat[index].selected = true;
        setMenuItems(menuFormat);
        handleBurgerClick();
    }
    return (
        <div className="w-full h-full flex flex-col justify-between gap-5 lg:gap-10 p-10 bg-infinity-black-carbon overflow-auto z-10">
            <AvatarProfile
                size={14}
                name={user?.name}

            />

            <ul className="text-infinity-pink-lightPink w-full h-full flex flex-col justify-items font-poppins font-bold gap-2 md:gap-5 lg:gap-10">
                {menuItems?.map((item, index) => {
                    return (
                        <li
                            className={item.selected ? classNameItemActive : classNameItemInactive}
                            onClick={() => {
                                handleChangeSeletedMenu(item, index)
                            }}
                        >
                            {item?.Icon}
                            <div className={classNameContainerNameItem}>{item.content}</div>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
};

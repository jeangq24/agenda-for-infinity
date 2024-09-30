import { Avatar,  AvatarIcon } from "@nextui-org/avatar";

export default ({name, role, size}) => {
    return (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-4">
            <Avatar
                icon={<AvatarIcon />}
                isBordered
                color="danger"
                classNames={{
                    base: `bg-gradient-to-br from-infinity-pink-lightPink to-infinity-pink-salmonPink ${size && "w-"+size+" h-"+size}`,
                    icon: "text-infinity-black-carbon",
                }}

                
            />

            {name &&
            <div className="flex flex-col items-start justify-center">
                <p className="text-infinity-pink-lightPink font-bold text-xl">{name}</p>
                {role && <p className="text-infinity-black-slateGray font-bold text-sm">{role}</p>}
            </div>}
        </div>
    )
}
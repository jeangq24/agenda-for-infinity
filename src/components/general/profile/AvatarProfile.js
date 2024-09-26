import { Avatar,  AvatarIcon } from "@nextui-org/avatar";

export default ({name, size}) => {
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

            {name && <p className="text-infinity-pink-lightPink font-bold text-xl">{name}</p>}
        </div>
    )
}
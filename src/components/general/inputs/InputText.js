import {Input} from "@nextui-org/react";
export default ({ type, placeholder, textLabel, onChange, value, children}) => {
    return (
       <div>
        <Input 
        type={type}
        variant={"flat"} 
        label={textLabel} 
        placeholder={placeholder}
        onChange={(e)=>onChange(e)}
        value={value}
        startContent={
            <div className="pointer-events-none flex gap-2 items-center">
                {children && children}
            </div>
        }
        />
       </div>
    )
}
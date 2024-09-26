import {Input} from "@nextui-org/react";
export default ({ type, placeholder, textLabel, onChange, value}) => {
    return (
       <div>
        <Input 
        type={type}
        variant={"flat"} 
        label={textLabel} 
        placeholder={placeholder}
        onChange={(e)=>onChange(e)}
        value={value}
        />
       </div>
    )
}
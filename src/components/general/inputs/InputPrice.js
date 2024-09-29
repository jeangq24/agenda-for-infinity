import { CurrencyCircleDollar } from "@phosphor-icons/react";
import { Input } from "@nextui-org/react";
export default ({ onChange, value }) => {
    return (
        <div>
            <Input
                type="number"
                label="Precio"
                variant={"flat"} 
                placeholder="0.00"
                startContent={
                    <div className="pointer-events-none flex gap-2 items-center">
                        <CurrencyCircleDollar className={""} />                     
                    </div>
                }
                onChange={(e) => onChange(e)}
                value={value}
            />
        </div>
    )
}






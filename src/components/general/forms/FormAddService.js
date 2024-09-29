import { Clock, } from "@phosphor-icons/react";
import DropDown from "../dropdown/DropDown";
import { listDuration } from "@/lib/times";
import InputText from "../inputs/InputText";
import InputPrice from "../inputs/InputPrice";

export default ({valueName,valuePrice,setValueDuration,handleChangeName,handleChangePrice}) => {
   
    return (
        <div className="py-4 flex flex-col gap-4">

            <InputText
                placeholder="Insertar nombre del servicio"
                onChange={handleChangeName}
                textLabel="Nombre de servicio"
                type="text"
                value={valueName}
                className="font-poppins w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-infinity-pink-softPink"
            />



            <InputPrice
                value={valuePrice}
                onChange={handleChangePrice}
            />
            <DropDown listItems={listDuration.horas} setValue={setValueDuration} >
                <Clock className={""} />
                <span>Duracion:</span>
            </DropDown>

        </div>
    )
}
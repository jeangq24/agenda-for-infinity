import { PlusCircle } from "@phosphor-icons/react";
import { useDisclosure, Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalAction from "../general/modal/ModalAction";
import toast from "react-hot-toast";
import { listDuration } from "@/lib/times";
import FormAddService from "../general/forms/FormAddService";

const CardAddService = ({ addService }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valueName, setValueName] = useState('');
    const [valuePrice, setValuePrice] = useState("");
    const [valueDuration, setValueDuration] = useState("");

    const handleChangeName = (e) => {
        const { value } = e.target;
        setValueName(value);
    };

    const handleChangePrice = (e) => {
        const { value } = e.target;
        if (Number(value) && Number(value) < 0) {
            return toast.error("Valor no valido")
        };
        setValuePrice(value);
    };



    const submitService = async () => {
        try {

            if (valueName.length === 0 || valueDuration.length === 0 || valuePrice.length === 0) {
                return toast.error("Los datos del servicio no son correctos");
            };

            const validDollar = /^\$?\d+(,\d{3})*(\.\d{2})?$/;
            if (!validDollar.test(valuePrice)) {
                return toast.error("El precio deb ser en una cifra valida (1 o 1.00)")
            };

            const durationServiceMinutesFormat = listDuration.minutos[listDuration.horas.indexOf(valueDuration)];
            const result = await addService({ name: valueName, price: parseFloat(valuePrice).toFixed(2), duration: Number(durationServiceMinutesFormat) });

            if (result) {
                toast.success("Servicio agregado con exito");
            };
            onOpenChange(!isOpen)

        } catch (error) {
            console.log(error);
            toast.error(error);
            return;
        };
    };
    return (
        <div>
            <Tooltip content="Crear Servicio">
                <Button

                    onPress={onOpen}
                    className={"z-10 fixed bottom-6 right-6 rounded-full bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink transition duration-500"}
                >
                    <PlusCircle className="w-full h-full text-infinity-white-snow" />

                </Button>

            </Tooltip>
            <ModalAction
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                titleHead={"Agregar Servicio"}
                labelAction={"Agregar"}
                handleAction={() => submitService()}
            >
                <FormAddService
                    valueName={valueName}
                    valuePrice={valuePrice}
                    setValueDuration={setValueDuration}
                    handleChangeName={handleChangeName}
                    handleChangePrice={handleChangePrice}
                />

            </ModalAction>
        </div>
    )
};

export default CardAddService;
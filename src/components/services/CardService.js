import { Clock, Trash, Gear, PlusCircle, CurrencyCircleDollar } from "@phosphor-icons/react";
import { Card, CardHeader, CardBody, useDisclosure, Input, Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalAction from "../general/modal/ModalAction";
import toast from "react-hot-toast";
import { listDuration } from "@/lib/times";
import DropDown from "../general/dropdown/DropDown";
import InputPrice from "../general/inputs/InputPrice";
import InputText from "../general/inputs/InputText";

const CardService = ({ dataService, editService, deleteService }) => {

    const nameService = dataService?.name;
    const durationService = dataService?.duration_minutes.toString();
    const priceService = dataService?.price;
    const idService = dataService?.id;
    const durationServiceHourFormat = listDuration.horas[listDuration.minutos.indexOf(durationService)];
    const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const [cardEditStatus, setCardEditStatus] = useState(false);
    const [valueName, setValueName] = useState(nameService || "");
    const [valueDuration, setValueDuration] = useState(durationServiceHourFormat || "");
    const [valuePrice, setValuePrice] = useState(priceService || "");

    const onSubmitEdit = async () => {

        if (valueName === nameService && valueDuration === durationServiceHourFormat && priceService === valuePrice) {
            return toast.error("No se ha modificado ningun dato")
        }

        const validDollar = /^\$?\d+(,\d{3})*(\.\d{2})?$/;
        if (!validDollar.test(valuePrice)) {
            return toast.error("El precio debe ser en una cifra valida (1 o 1.00)")
        };

        const durationServiceMinutesFormat = listDuration.minutos[listDuration.horas.indexOf(valueDuration)];
        const result = await editService(idService, { name: valueName, duration: Number(durationServiceMinutesFormat), price: parseFloat(valuePrice).toFixed(2) });
        if (result) {
            onOpenChangeEdit(!isEditOpen);
            toast.success("Servicio editado con exito");
            setCardEditStatus(!cardEditStatus);

        };
    };

    const handleChangePrice = (e) => {
        const { value } = e.target;
        if (Number(value) && Number(value) < 0) {
            return toast.error("Valor no valido")
        };
        setValuePrice(value);
    };

    const handleChangeName = (e) => {
        const { value } = e.target;
        setValueName(value);
    };
    const classNamaHeadIconButton = `w-8 h-8 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold p-2 transition duration-500`;


    return (
        <Card className="z-0 bg-infinity-white-snow h-[300px] w-full md:w-80 flex flex-col gap-3">
            <CardHeader className="z-0 w-full h-16 rounded-t-2xl bg-infinity-black-carbon flex flex-row justify-between items-center px-4">
                <span className="text-infinity-pink-lightPink font-bold">
                    {nameService}
                </span>
                <div className="w-auto flex flex-row justify-end items-center gap-3">
                    <Tooltip content="Eliminar servicio" color="danger">
                    <Trash
                        onClick={() => {

                            onOpenChangeDelete(!isDeleteOpen)
                        }}
                        className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                    />
                    </Tooltip>

                    <Tooltip content="Editar Servicio">
                    <Gear className={`${classNamaHeadIconButton} ${cardEditStatus ? "bg-infinity-pink-salmonPink/90" : "bg-infinity-pink-softPink"}`}
                        onClick={() => {
                            setCardEditStatus(!cardEditStatus);
                        }} />

                    </Tooltip>

                </div>
            </CardHeader>

            <CardBody className="z-0 w-full h-full p-4 flex flex-col justify-center items-center gap-2 font-poppins">
                <div className="w-full flex flex-col gap-2">

                    {cardEditStatus && <InputText
                        placeholder="Insertar nombre del servicio"
                        onChange={handleChangeName}
                        textLabel="Nombre de servicio"
                        type="text"
                        value={valueName}
                        className="font-poppins w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-infinity-pink-softPink"
                    />}


                    {cardEditStatus ?
                        <InputPrice
                            value={valuePrice}
                            onChange={handleChangePrice}
                        />
                        :
                        <Input
                            className=""
                            type="text"
                            label={<div className="flex flex-row justify-start items-center gap-2">
                                <CurrencyCircleDollar className={""} />
                                <span className={""}>Precio</span>
                                <span>{priceService}</span>
                            </div>}
                            labelPlacement={"inside"}
                            disabled={true}
                            value={null}

                        />}

                    {cardEditStatus ?
                        <DropDown listItems={listDuration.horas} setValue={setValueDuration} value={durationServiceHourFormat}>
                            <Clock className={""} />

                        </DropDown>
                        :
                        <Input
                            className=""
                            type="text"
                            label={<div className="flex flex-row items-center justify-start gap-2">
                                <Clock className={""} />
                                <span className={""}>Duracion</span>
                                <span>{durationServiceHourFormat}</span>
                            </div>}
                            labelPlacement={"inside"}
                            disabled={true}
                            value={null}


                        />}
                </div>

                {cardEditStatus && <div className="w-full flex flex-row justify-end gap-2">

                    <Button
                        className={"bg-transparent drop-shadow-md shadow-md hover:bg-infinity-pink-lightPink"}
                        onClick={() => {
                            setCardEditStatus(!cardEditStatus);
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        className="drop-shadow-md shadow-md bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-infinity-white-snow font-bold"
                        onClick={onOpenChangeEdit}>
                        Guardar
                    </Button>
                </div>}

                {/* MODAL PARA CONFIRMAR ELIMINAR */}
                <ModalAction
                    isOpen={isDeleteOpen}
                    onOpen={onOpenDelete}
                    onOpenChange={onOpenChangeDelete}
                    titleHead={`¿Desea eliminar el Servicio con nombre: ${nameService}?`}
                    labelAction={"Eliminar"}
                    handleAction={async () => {
                        const result = await deleteService(idService);
                        if (result) {
                            onOpenChangeDelete(!isDeleteOpen);
                            toast.success("Servicio eliminado con exito");
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
                    titleHead={`¿Desea editar el servicio con nombre: ${nameService}?`}
                    labelAction={"Editar"}
                    handleAction={() => onSubmitEdit()}
                >
                    <span>Esta acción no se puede deshacer una vez confirmada</span>
                </ModalAction>

            </CardBody>
        </Card>

    );
}

export default CardService;
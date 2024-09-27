import { Clock, Trash, Gear, Pulse, PlusCircle } from "@phosphor-icons/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useSchedules } from "@/hooks/useSchedules";
import { useDisclosure } from "@nextui-org/react";
import ModalAction from "../general/modal/ModalAction";
import NoContent from "../general/notFound/NoContent";
import FormAddSchedule from "../general/forms/FormAddSchedule";
import { useCalendar, useDates } from "@/hooks/useCalendar";
import toast from "react-hot-toast";
import { postSchedule } from "@/config/schedule";
import { Button } from "@nextui-org/react";
import { listTimes } from "@/lib/times";
import DropDown from "../general/dropdown/DropDown";

export default () => {
    const { schedules, editSchedule, dltSchedule } = useSchedules();

    return (
        <div className="w-full h-full grow p-5 md:p-10">
            <CardAddSchedule />
            <div className={`w-full grow h-full ${schedules?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row" : "flex flex-col"} gap-4`}>
                {schedules.length > 0 ? (
                    schedules?.map((schedule, index) => (
                        <CardSchedule
                            key={index + "SCHE"}
                            dataSchedule={schedule}
                            editSchedule={editSchedule}
                            deleteSchedule={dltSchedule}
                        />
                    ))
                ) : (
                    <NoContent textBody="No se encontraron horarios disponibles." />
                )}
            </div>
        </div>

    );
};

const CardSchedule = ({ dataSchedule, editSchedule, deleteSchedule }) => {
    const startTime = dataSchedule?.start_time;
    const endTime = dataSchedule?.end_time;
    const status = dataSchedule?.status;
    const idSchedule = dataSchedule?.id;
    const daySchedule = dataSchedule?.day;
    const monthSchedule = dataSchedule?.month;
    const yearSchedule = dataSchedule?.year;

    const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const {
        rangeDate,
        validateTimeRange
    } = useDates();
    const [cardEditStatus, setCardEditStatus] = useState(false);
    const [valueEndTime, setValueEndTime] = useState(endTime || null);
    const [valueStartTime, setValueStartTime] = useState(startTime || null);


    const onSubmitEdit = async () => {
        if (valueEndTime === endTime && valueStartTime === startTime) {
            return toast.error("Ningun dato ha sido modificado")
        };

        if (!validateTimeRange(valueStartTime, valueEndTime)) {
            return toast.error("La hora de inicio no debe ser mayor a la hora final");
        };

        const result = await editSchedule(idSchedule, { startTime: valueStartTime, endTime: valueEndTime, status, day: daySchedule, month: monthSchedule, year: yearSchedule });
        if (result) {
            onOpenChangeEdit(!isEditOpen);
            toast.success("Horario editado con exito");
            setCardEditStatus(!cardEditStatus);

        };

    };


    const classNamaHeadIconButton = `w-8 h-8 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold p-2 transition duration-500`;
    return (
        <Card className="z-0 bg-infinity-white-snow h-[270px] w-full md:w-80 flex flex-col gap-3">
            <CardHeader className="z-0 w-full h-16 rounded-t-2xl bg-infinity-black-carbon flex flex-row justify-between items-center px-4">
                <span className="text-infinity-pink-lightPink font-bold">
                    {`${daySchedule}-${monthSchedule}-${yearSchedule}`}
                </span>
                <div className="w-auto flex flex-row justify-end items-center gap-3">
                    <Trash onClick={onOpenChangeDelete} className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`} />
                    <Gear className={`${classNamaHeadIconButton} ${cardEditStatus ? "bg-infinity-pink-salmonPink/90" : "bg-infinity-pink-softPink"}`}
                        onClick={() => {
                            if (!rangeDate(daySchedule, monthSchedule, yearSchedule)) {
                                return toast.error("Este horario caduco, no se puede editar");
                            };
                            setCardEditStatus(!cardEditStatus);
                        }} />

                </div>
            </CardHeader>

            <CardBody className="z-0 w-full h-full p-4 flex flex-col justify-center items-center gap-2 font-poppins">
                <div className="w-full flex flex-row gap-2">

                    {cardEditStatus ?
                        <DropDown listItems={listTimes} setValue={setValueStartTime} value={startTime}>
                            <Clock className={""} />
                            <span>Inicio:</span>
                        </DropDown>
                        :
                        <Input
                            className=""
                            type="text"
                            label={<div className="flex flex-row items-center justify-start gap-2">
                                <Clock className={""} />
                                <span className={""}>Inicio</span>
                                <span>{startTime}</span>
                            </div>}
                            labelPlacement={"inside"}
                            disabled={true}
                            value={null}


                        />}




                    {cardEditStatus ?
                        <DropDown listItems={listTimes} setValue={setValueEndTime} value={endTime}>
                            <Clock className={""} />
                            <span>Final:</span>
                        </DropDown>
                        :
                        <Input
                            className=""
                            type="text"
                            label={<div className="flex flex-row justify-start items-center gap-2">
                                <Clock className={""} />
                                <span className={""}>Final</span>
                                <span>{endTime}</span>
                            </div>}
                            labelPlacement={"inside"}
                            disabled={true}
                            value={null}

                        />}
                </div>

                <Input
                    className=""
                    type="text"
                    label={<div className="flex flex-row items-center gap-2">
                        <Pulse className={""} />
                        <span className={""}>Status</span>
                        <span>{status ? "Activado" : "Desactivado"}</span>
                    </div>}
                    labelPlacement={"inside"}
                    disabled={true}


                />
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
                    titleHead={"¿Desea eliminar este horario?"}
                    labelAction={"Eliminar"}
                    handleAction={async() => {
                        const result = await deleteSchedule(idSchedule);
                        if(result) {
                            onOpenChangeDelete(!isDeleteOpen);
                            toast.success("Horario eliminado con exito");
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
                    titleHead={"¿Desea editar este horario?"}
                    labelAction={"Editar"}
                    handleAction={() => onSubmitEdit()}
                >
                    <span>Esta acción no se puede deshacer una vez confirmada</span>
                </ModalAction>

            </CardBody>
        </Card>
    );
}

const CardAddSchedule = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const {
        isDateUnavailable,
        selectedDate,
        currentDate,
        twoMonthsLater,
        handleDateSelect,
    } = useCalendar();


    const submitSchedule = async () => {
        try {

            if (!selectedDate) {
                return toast.error("Seleccione una fecha.");
            };

            if (selectedDate < currentDate || selectedDate > twoMonthsLater) {
                toast.error("Seleccione una fecha en el rango de dos meses desde la fecha actual.");
            };

            if (!endTime?.length || !startTime?.length) {
                return toast.error("No se ha seleccionado un hora de inicio o final.");
            };

            const result = await postSchedule(startTime, endTime, true, selectedDate.day, selectedDate.month, selectedDate.year);
            if (!result) {
                return;
            };
            onOpenChange(!isOpen)
            toast.success("Horario Agregado con exito");
        } catch (error) {
            console.log(error);
            toast.error(error);
            return;
        };
    };
    return (
        <div>
            <Button

                onPress={onOpen}
                className={"z-10 fixed bottom-6 right-6 rounded-full bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink transition duration-500"}
            >
                <PlusCircle className="w-full h-full text-infinity-white-snow" />

            </Button>
            <ModalAction
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                titleHead={"Agregar Horario"}
                labelAction={"Agregar"}
                handleAction={() => submitSchedule()}
            >
                <FormAddSchedule
                    data={
                        {
                            isDateUnavailable,
                            selectedDate,
                            currentDate,
                            twoMonthsLater,
                            handleDateSelect,
                            setStartTime,
                            setEndTime,
                            startTime,
                            endTime
                        }
                    }
                />
            </ModalAction>
        </div>
    )
}




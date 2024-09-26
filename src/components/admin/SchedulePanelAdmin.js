import { Clock, Trash, Gear, Pulse, PlusCircle } from "@phosphor-icons/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useSchedules } from "@/hooks/useSchedules";
import { useDisclosure } from "@nextui-org/react";
import ModalAction from "../general/modal/ModalAction";
import NoContent from "../general/notFound/NoContent";
import FormAddSchedule from "../general/forms/FormAddSchedule";
import { useCalendar } from "@/hooks/useCalendar";
import toast from "react-hot-toast";
import { postSchedule } from "@/config/schedule";
import { Button } from "@nextui-org/react";
export default () => {
    const { schedules } = useSchedules();

    return (
        <div className="w-full h-full grow p-5 md:p-10">
            <div className={`w-full grow h-full ${schedules?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row" : "flex flex-col"} gap-4`}>
                <Schedule mode="add" />
                {schedules.length > 0 ? (
                    schedules?.map((schedule, index) => (
                        <Schedule
                            key={index + "SCHE"}
                            mode={"personalized"}
                            dataSchedule={schedule}
                        />
                    ))
                ) : (
                    <NoContent textBody="No se encontraron horarios disponibles." />
                )}
            </div>
        </div>

    );
};


const Schedule = ({ mode, dataSchedule }) => {

    return (
        <>
            {(mode === "default" || mode === "personalized") && <CardSchedule
                currentSchedule={`${dataSchedule?.day}-${dataSchedule?.month}-${dataSchedule?.year}`}
                startTime={dataSchedule?.start_time}
                endTime={dataSchedule?.end_time}
                status={dataSchedule?.status}
            />}

            {mode === "add" && <CardAddSchedule />}
        </>
    );
};

const CardSchedule = ({ currentSchedule, startTime, endTime, status }) => {
    const inputStartTime = useRef(null);
    const inputStartEnd = useRef(null);
    const [cardEditStatus, setCardEditStatus] = useState(false);
    const classNamaHeadIconButton = `w-8 h-8 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold p-2 transition duration-500`;
    return (
        <Card className="z-0 bg-infinity-white-snow h-[260px] w-full md:w-72 flex flex-col gap-2">
            <CardHeader className="z-0 w-full h-16 rounded-t-2xl bg-infinity-black-carbon flex flex-row justify-between items-center px-4">
                <span className="text-infinity-pink-lightPink font-bold">
                    {currentSchedule ? currentSchedule : "Pedeterminado"}
                </span>
                <div className="w-auto flex flex-row justify-end items-center gap-3">
                    <Trash className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`} />
                    <Gear className={`${classNamaHeadIconButton} ${cardEditStatus ? "bg-infinity-pink-salmonPink/90" : "bg-infinity-pink-softPink"}`}
                        onClick={() => {

                            if (cardEditStatus) {
                                if (inputStartTime.current) {
                                    inputStartTime.current.value = "";
                                };

                                if (inputStartEnd.current) {
                                    inputStartEnd.current.value = "";
                                };
                            };


                            setCardEditStatus(!cardEditStatus)


                        }} />

                </div>
            </CardHeader>

            <CardBody className="z-0 w-full h-full p-4 flex flex-col justify-center items-center gap-3 font-poppins">
                <div className="flex flex-row gap-2">

                    <Input
                        className=""
                        type="text"
                        label={<div className="flex flex-row items-center gap-2">
                            <Clock className={""} />
                            <span className={""}>Inicio</span>
                            {!cardEditStatus && <span>{startTime}</span>}
                        </div>}
                        labelPlacement={"inside"}
                        disabled={cardEditStatus ? false : true}
                        ref={inputStartTime}

                        value={cardEditStatus ? startTime : null}


                    />

                    <Input
                        className=""
                        type="text"
                        label={<div className="flex flex-row items-center gap-2">
                            <Clock className={""} />
                            <span className={""}>Final</span>
                            {!cardEditStatus && <span>{endTime}</span>}
                        </div>}
                        labelPlacement={"inside"}
                        disabled={cardEditStatus ? false : true}
                        ref={inputStartEnd}

                        value={cardEditStatus ? endTime : null}

                    />
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

                    <Button>Cancelar</Button>
                    <Button>Guardar</Button>
                </div>}
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
                className={"absolute bottom-6 w-14 h-14 right-6 rounded-full bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink transition duration-500"}
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




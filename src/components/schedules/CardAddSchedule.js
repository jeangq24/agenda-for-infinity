import { useState } from "react";
import { Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { PlusCircle } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import ModalAction from "../general/modal/ModalAction";
import FormAddSchedule from "../general/forms/FormAddSchedule";
import { useCalendar } from "@/hooks/useCalendar";

const CardAddSchedule = ({ addSchedule }) => {
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

      const result = await addSchedule({ startTime, endTime, status: true, day: selectedDate.day, month: selectedDate.month, year: selectedDate.year });
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
      <Tooltip content="Crear Horario">
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

export default CardAddSchedule;
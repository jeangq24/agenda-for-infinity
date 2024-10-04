import { useRef, useEffect, useState, forwardRef } from "react";
import { listTimes } from "@/lib/times";
import { useEmployeesAgenda } from "@/hooks/useEmployeesSchedule";
import DropDown from "../dropdown/DropDown";
import toast from "react-hot-toast";
import { getEmployeesAgenda } from "@/config/agenda";
import { useDisclosure } from "@nextui-org/react";
import ModalAction from "@/components/general/modal/ModalAction";
import TimeLine from "@/components/general/agenda/TimeLine";
import EmployeeSchedule from "@/components/general/agenda/EmployeeSchedule";
import FormAddQuote from "../forms/FormAddQuote";

export async function getServerSideProps() {
  const employeesAgenda = await getEmployeesAgenda();
  return {
    props: { initialEmployeesAgenda: employeesAgenda || [] },
  };
}

export default ({ initialEmployeesAgenda, date }) => {
  const lineTime = useRef(null);
  const pingLineTime = useRef(null);
  const contenedorAgenda = useRef(null);
  const [filter, setFilter] = useState("Todos");
  const { 
    employeesAgenda, 
    employeesNames, 
    selectFilter, 
    services,
    addQuote } = useEmployeesAgenda(initialEmployeesAgenda, date, filter);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formDataAddQuote, setFormDataAddQuote] = useState({
    startTime: "",
    endTime: "",
    products: [],
    userId: null,
    clientId: null,
    day: date?.day,
    month: date?.month,
    year: date?.year,
  });

  const onSubmitQuote = async() => {
    const {startTime, endTime, products, userId, day, month, year} = formDataAddQuote;
    if(!startTime.length || !endTime.length || !userId || !day || !month || !year || !products.length) {
      toast.error("Seleccione uno mas productos para continuear");
    };

    const result = await addQuote({startTime, endTime, products, userId, clientId: null, status: true, day, month, year});
    if(result) {
      toast.success("Cita generada con exito");
      onOpenChange(!isOpen)
    };
  };
  
  return (
    <div className="w-full lg:w-[75%] lg:h-full h-[500px] relative rounded-2xl overflow-auto flex flex-col gap-4">
      <Header date={date} employeesNames={employeesNames} filter={filter} setFilter={setFilter} selectFilter={selectFilter} />
      <ScheduleContainer ref={contenedorAgenda}>
        <ScheduleList timeSlots={listTimes} >
          {employeesAgenda?.map((employee, index) => (
            
              <EmployeeSchedule
                key={employee.id}
                employee={employee}
                employeeIndex={index}
                totalEmployees={employeesAgenda.length}
                onOpenChange={onOpenChange}
                setFormData={setFormDataAddQuote}
                formData={formDataAddQuote}
              />

            
          ))}
          <TimeLine lineTime={lineTime} pingLineTime={pingLineTime} contenedorAgenda={contenedorAgenda} />
        </ScheduleList>

      </ScheduleContainer>
      <ModalAction
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        titleHead={`Agregar cita: ${date?.day}-${date?.month}-${date?.year}`}
        labelAction="Agregar"
        handleAction={() => onSubmitQuote()}
      >
        <FormAddQuote
          formData={formDataAddQuote}
          setFormData={setFormDataAddQuote}
          services={services}
        />
      </ModalAction>
    </div>
  );
}

// Header component
const Header = ({ date, employeesNames, filter, setFilter, selectFilter }) => (
  <div className="px-4 w-full md:text-center text-start bg-infinity-black-carbon relative text-infinity-pink-lightPink font-bold py-2 rounded-2xl">
    Agenda: <span>{date.day}-{date.month}-{date.year} </span>
    <div className="absolute -top-0 right-0">
      <DropDown listItems={employeesNames} setValue={setFilter} value={filter} handleClickItem={() => selectFilter(filter)}>
        <div>Estilista: </div>
      </DropDown>
    </div>
  </div>
);

// ScheduleContainer component
const ScheduleContainer = forwardRef(({ children }, ref) => (
  <div className="w-full h-auto flex flex-row border-1 drop-shadow-lg rounded-2xl bg-infinity-white-snow overflow-auto" ref={ref}>
    {children}
  </div>
));

// ScheduleList component
const ScheduleList = ({ timeSlots, children }) => (
  <>
    <ul className={`h-auto grid grid-row-${timeSlots.length} border-r-1 bg-infinity-black-carbon text-infinity-pink-lightPink font-bold rounded-tl-2xl rounded-bl-2xl`}>
      {timeSlots.map(slot => (
        <li key={slot} className="w-20 h-[60px] flex justify-center items-center bg-infinity-black-carbon">
          <span>{slot}</span>
        </li>
      ))}
    </ul>
    <div className="w-full h-full relative">
      <>
        <ul className={`grid ${"grid-row-" + timeSlots.length} w-full h-full`}>
          {timeSlots.map((slot) => (
            <li key={slot} className="w-full h-[60px] flex justify-center items-center">
              <div className="w-full h-[1px] bg-infinity-gray-darkGray"></div>
            </li>
          ))}
        </ul>
        {children}
      </>
    </div>
  </>
);

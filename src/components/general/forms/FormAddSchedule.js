import { Clock, } from "@phosphor-icons/react";
import { Input } from "@nextui-org/react";
import Calendar from "../agenda/Calendar";
import DropDown from "../dropdown/DropDown";
import { listTimes } from "@/lib/times";

export default ({ data }) => {
    const {
        isDateUnavailable,
        selectedDate,
        currentDate,
        twoMonthsLater,
        handleDateSelect,
        setStartTime,
        setEndTime,
        startTime,
        endTime } = data;

    return (
        <div className="py-4 flex flex-col gap-4">
            <Calendar
                isDateUnavailable={isDateUnavailable}
                selectedDate={selectedDate}
                currentDate={currentDate}
                twoMonthsLater={twoMonthsLater}
                handleDateSelect={handleDateSelect}
            />
            <div className="flex md:flex-row flex-col gap-4 w-full">
                <DropDown listItems={listTimes} textLabel={"Hora inicial"} setValue={setStartTime}/>
                <DropDown listItems={listTimes} textLabel={"Hora final"} setValue={setEndTime}/>

            </div>

        </div>
    )
}
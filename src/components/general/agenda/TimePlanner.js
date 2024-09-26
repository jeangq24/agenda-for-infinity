import AgendaDisplay from "@/components/general/agenda/AgendaDisplay";
import Calendar from "./Calendar";
import { useCalendar } from "@/hooks/useCalendar";

export default () => {

    const { isDateUnavailable,
        selectedDate,
        currentDate,
        twoMonthsLater,
        handleDateSelect,
        agenda } = useCalendar();

    return (
        <div className="w-full h-full flex flex-col lg:flex-row items-start gap-10 p-5 md:p-10">
            <div className="h-auto w-full lg:w-[25%] font-poppins">
                <Calendar
                    isDateUnavailable={isDateUnavailable}
                    selectedDate={selectedDate}
                    currentDate={currentDate}
                    twoMonthsLater={twoMonthsLater}
                    handleDateSelect={handleDateSelect}
                />

            </div>

            {<AgendaDisplay date={selectedDate} agenda={agenda} />}
        </div>
    )
}
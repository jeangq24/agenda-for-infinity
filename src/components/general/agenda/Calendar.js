import { Calendar } from "@nextui-org/calendar";
import localFont from 'next/font/local';
const laviossa = localFont({ src: "../../../../public/fonts/LaviossaMedium.woff2" })
export default ({isDateUnavailable, selectedDate, currentDate, twoMonthsLater, handleDateSelect}) => {

    return (

        <Calendar
            aria-label="Calendario"
            isDateUnavailable={isDateUnavailable || null}
            defaultValue={selectedDate || null}
            minValue={currentDate || null}
            maxValue={twoMonthsLater || null}
            visibleMonths={1}
            weekdayStyle={"short"}
            classNames={{
                base: "w-full h-full",
                content: "w-full h-auto overscroll-auto",
                title: "text-infinity-pink-lightPink font-bold overflow-auto font-bold " + laviossa.className,
                prevButton: "bg-infinity-pink-softPink text-infinity-black-carbon",
                nextButton: "bg-infinity-pink-softPink text-infinity-black-carbon",
                headerWrapper: "bg-infinity-black-carbon w-full h-auto overflow-auto py-4",
                gridWrapper: "bg-infinity-white-snow w-full h-auto flex flex-col md:flex-row gap-2 overflow-auto",
                grid: "",
                gridHeader: "bg-infinity-white-snow text-black",
                gridHeaderCell: "text-infinity-black-carbon shadow-md drop-shadow-md",
                gridHeaderRow: "gap-4 py-4",
                gridBodyRow: "gap-4 py-2",
                cellButton: "shadow-md drop-shadow-md bg-infinity-pink-lightPink text-infinity-black-carbon"

            }}
            onChange={handleDateSelect || null}
        />
    );
};
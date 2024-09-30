import { useRef, useEffect } from "react";
import { listTimes } from "@/lib/times";
export default ({ date, agenda }) => {
  const lineTime = useRef(null);
  const pingLineTime = useRef(null);
  const contenedorAgenda = useRef(null);

  const startTime = 1; // Hora de inicio del día
  const endTime = 24; // Hora de fin del día
  const interval = 30; // Intervalo en minutos

  const timeSlots = listTimes;
  useEffect(() => {
    const updateLineTimePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Verifica si la hora actual está dentro del rango del día laboral
      if (currentHour >= startTime && currentHour <= endTime) {
        // Calcula los minutos transcurridos desde las 8:00 AM
        const minutesSinceStart = (currentHour - startTime) * 60 + currentMinutes;

        // Cada minuto equivale a 2px, y la posición inicial es 30px
        const linePosition = 30 + minutesSinceStart * 2;

        // Actualiza la posición de la línea en píxeles
        if (lineTime.current) {
          lineTime.current.style.top = `${linePosition}px`;
          pingLineTime.current.style.top = ` ${linePosition - 5}px`;
        }

        if (pingLineTime.current) {
          pingLineTime.current.style.top = ` ${linePosition - 5}px`;
        }

        if (contenedorAgenda.current) {
          contenedorAgenda.current.scrollTo({
            top: linePosition - contenedorAgenda.current.clientHeight / 2,
            behavior: 'smooth', // Efecto de scroll suavizado
          });
        }
      }
    };

    // Actualiza la posición de la línea al cargar la página
    updateLineTimePosition();

    // Actualiza la posición de la línea cada minuto
    const intervalId = setInterval(updateLineTimePosition, 60000);
   
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="w-full lg:w-[75%] lg:h-full h-[500px] relative rounded-2xl overflow-auto flex flex-col gap-4">
      <h1 className="w-full text-center bg-infinity-black-carbon text-infinity-pink-lightPink font-bold py-2 rounded-2xl">Agenda: <span>{date.day}-{date.month}-{date.year} </span></h1>
      <div className="w-full h-auto flex flex-row border-1 drop-shadow-lg rounded-2xl bg-infinity-white-snow overflow-auto" ref={contenedorAgenda} >
        <ul className={`h-auto grid ${"grid-row-" + timeSlots.length} border-r-1 bg-infinity-black-carbon text-infinity-pink-lightPink font-bold rounded-tl-2xl rounded-bl-2xl font-poppins`}>
          {timeSlots.map((slot) => (
            <li key={slot} className="w-20 h-[60px] flex justify-center items-center bg-infinity-black-carbon">
              <span>{slot}</span>
            </li>
          ))}

        </ul>
        <div className="w-full h-auto relative">

          <ul className={`grid ${"grid-row-" + timeSlots.length} w-full h-full`}>
            {timeSlots.map((slot) => (
              <li key={slot} className="w-full h-[60px] flex justify-center items-center">
                <div className="w-full h-[1px] bg-infinity-gray-darkGray"></div>
              </li>
            ))}

          </ul>

          <div ref={lineTime} className="w-full h-[2px] bg-infinity-pink-salmonPink absolute z-10">

          </div>

          <span ref={pingLineTime} className="flex h-3 w-3 absolute -left-2 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-infinity-pink-softPink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-infinity-pink-salmonPink"></span>
          </span>
        </div>

      </div>
    </div>
  );
};

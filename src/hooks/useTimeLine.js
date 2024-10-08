import { useEffect } from "react";

export const useTimeLine = (lineTime, pingLineTime, contenedorAgenda) => {
  useEffect(() => {
    let linePosition
    const updateLineTimePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      if (currentHour >= 1 && currentHour <= 24) {
        const minutesSinceStart = (currentHour - 1) * 60 + currentMinutes;
        linePosition = 30 + minutesSinceStart * 2;

        if (lineTime.current) {
          lineTime.current.style.top = `${linePosition}px`;
          pingLineTime.current.style.top = `${linePosition - 5}px`;
        }
      }
    };

    updateLineTimePosition();
    if (contenedorAgenda.current) {
      contenedorAgenda.current.scrollTo({
        top: linePosition - contenedorAgenda.current.clientHeight / 2,
        behavior: 'smooth',
      });
    }
    const intervalId = setInterval(updateLineTimePosition, 60000);

    return () => clearInterval(intervalId);
  }, [lineTime, pingLineTime, contenedorAgenda]);

};

import { useTimeLine } from "@/hooks/useTimeLine";

export default ({lineTime, pingLineTime, contenedorAgenda }) => {
    useTimeLine(lineTime, pingLineTime, contenedorAgenda);
    return (
        <>
          <div ref={lineTime} className="w-full h-[2px] bg-infinity-pink-salmonPink absolute z-10"></div>
          <span ref={pingLineTime} className="flex h-3 w-3 absolute -left-2 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-infinity-pink-softPink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-infinity-pink-salmonPink"></span>
          </span>
        </>
      );
}
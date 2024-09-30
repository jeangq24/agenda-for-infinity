import { getSchedules } from "@/config/schedule";
import CardAddSchedule from "@/components/schedules/CardAddSchedule";
import CardSchedule from "@/components/schedules/CardSchedule";
import NoContent from "@/components/general/notFound/NoContent";
import { useSchedules } from "@/hooks/useSchedules";

export async function getServerSideProps() {
  const schedules = await getSchedules();
  return {
    props: { initialSchedules: schedules || [] },
  };
}

export default ({ initialSchedules }) => {
  const { schedules, editSchedule, dltSchedule, addSchedule } = useSchedules(initialSchedules);

  return (
    <div className="w-full h-full grow p-5 md:p-10">
      <CardAddSchedule addSchedule={addSchedule} />
      <div className={`w-full grow h-full ${schedules.length ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "flex flex-col"}`}>
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <CardSchedule key={index} dataSchedule={schedule} editSchedule={editSchedule} deleteSchedule={dltSchedule} />
          ))
        ) : (
          <NoContent textBody="No se encontraron horarios disponibles." />
        )}
      </div>
    </div>
  );
};
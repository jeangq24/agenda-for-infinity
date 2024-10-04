import { Input } from "@nextui-org/react";
import { Clock, Stack } from "@phosphor-icons/react";
import DropDown from "../dropdown/DropDown";
import { useDates } from "@/hooks/useCalendar";
const InputLabel = ({ labelText, value }) => (
  <Input
    type="text"
    label={
      <div className="flex flex-row justify-start items-center gap-2">
        <Clock />
        <span>{labelText}</span>
        <span>{value}</span>
      </div>
    }
    labelPlacement="inside"
    disabled={true}
  />
);

export default ({ services, formData, setFormData }) => {
  const { calculateEndTime } = useDates();
  return (
    <div className="flex flex-col gap-2">
      <InputLabel labelText="Hora inicio" value={formData?.startTime} />
      <InputLabel labelText="Hora final" value={formData?.endTime} />

      <DropDown
        listItems={services?.map((service) => service.name) || []}
        onAction={(key) => alert(key)}
        setValue={(value) => {
          let minutesDurationTotal = 0;

          let products = value.map((item) => {
            const service = services.filter((data) => {
              if (item === data.name) {
                return data
              }
            });

            if (service[0]) {
              minutesDurationTotal = minutesDurationTotal + service[0].duration_minutes
              return service[0].id
            };
          })

          setFormData({
            ...formData, products, endTime: calculateEndTime(formData.startTime, minutesDurationTotal)
          });
        }
        }
        
        mode="multiple"
      >
        <Stack />
        <span>Servicios:</span>
      </DropDown>
    </div>
  );
};

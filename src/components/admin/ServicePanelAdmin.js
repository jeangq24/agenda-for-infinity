import { useServices } from "@/hooks/useServices";
import NoContent from "../general/notFound/NoContent";
import CardService from "../services/CardService.js";
import CardAddService from "@/components/services/CardAddService";
import { getServices } from "@/config/service";

export async function getServerSideProps() {
    const services = await getServices();
    return {
      props: { initialServices: services || [] },
    };
  }

export default ({initialServices}) => {
    const { services, editService, dltService, addService } = useServices(initialServices);

    return (
        <div className="w-full h-full grow p-5 md:p-10">
            <CardAddService addService={addService} />
            <div className={`w-full grow h-full ${services?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row" : "flex flex-col"} gap-4`}>
                {services.length > 0 ? (
                    services?.map((service, index) => (
                        <CardService
                            key={service.id}
                            dataService={service}
                            editService={editService}
                            deleteService={dltService}
                        />
                    ))
                ) : (
                    <NoContent textBody="No se encontraron servicios disponibles." />
                )}
            </div>
        </div>

    );
};



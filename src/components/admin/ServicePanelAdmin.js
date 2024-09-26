import { Clock, Trash, Gear, Pulse, PlusCircle,  Timer, CurrencyCircleDollar  } from "@phosphor-icons/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image,} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";

export default () => {
    return (
        <div className="w-full h-full p-5 md:p-10">
            <div className="w-full h-auto lg:h-full grid grid-cols-1 md:grid-cols-2 grid-flow-row overflow-auto gap-4">
                <Service
                    mode="add"
                />
                 <Service
                    mode="personalized"
                />
            </div>
        </div>
    )
}


const Service = ({ mode }) => {

    return (
        <>
            {(mode === "personalized") && <CardService
                serviceName={"Corte"}
                serviceDuration={"60"}
                servicePrice={8}
            />}

            {mode === "add" && <CardAddService />}
        </>
    );
};


const CardService = ({ serviceName, serviceDuration, servicePrice }) => {
    const inputServiceDuration = useRef(null);
    const inputServicePrice = useRef(null);
    const [cardEditStatus, setCardEditStatus] = useState(false);
    const classNamaHeadIconButton = `w-8 h-8 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold p-2 transition duration-500`;
    return (
        <Card className="bg-infinity-white-snow h-[260px] w-full md:w-72 flex flex-col gap-2">
            <CardHeader className="w-full h-16 rounded-t-2xl bg-infinity-black-carbon flex flex-row justify-between items-center px-4">
                <span className="text-infinity-pink-lightPink font-bold">
                    {serviceName}
                </span>
                <div className="w-auto flex flex-row justify-end items-center gap-3">
                    <Trash className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`} />
                    <Gear className={`${classNamaHeadIconButton} ${cardEditStatus ? "bg-infinity-pink-salmonPink/90" : "bg-infinity-pink-softPink"}`}
                        onClick={() => {

                            if (cardEditStatus) {
                                if (inputServiceDuration.current) {
                                    inputServiceDuration.current.value = "";
                                };

                                if (inputServicePrice.current) {
                                    inputServicePrice.current.value = "";
                                };
                            };


                            setCardEditStatus(!cardEditStatus)


                        }} />

                </div>
            </CardHeader>

            <CardBody className="w-full h-full p-4 flex flex-col justify-center items-center gap-3 font-poppins">
                <div className="flex flex-row gap-2">

                    <Input
                        className=""
                        type="text"
                        label={<div className="flex flex-row items-center gap-2">
                            <Timer className={""} />
                            <span className={""}>Duracion</span>
                            {!cardEditStatus && <span>{serviceDuration}</span>}
                        </div>}
                        labelPlacement={"inside"}
                        disabled={cardEditStatus ? false : true}
                        ref={inputServiceDuration}

                        value={cardEditStatus ? serviceDuration : null}


                    />

                    <Input
                        className=""
                        type="text"
                        label={<div className="flex flex-row items-center gap-2">
                            <CurrencyCircleDollar className={""} />
                            <span className={""}>Precio</span>
                            {!cardEditStatus && <span>{servicePrice}</span>}
                        </div>}
                        labelPlacement={"inside"}
                        disabled={cardEditStatus ? false : true}
                        ref={inputServicePrice}

                        value={cardEditStatus ? servicePrice : null}

                    />
                </div>
            </CardBody>
        </Card>
    );
}

const CardAddService = () => {
    return (
        <Card className="bg-infinity-gray-slateGray/80 h-[260px] w-full md:w-72 p-10 ">
            <CardBody className="bg-infinity-gray-lightGray/50 hover:bg-infinity-pink-salmonPink/50 transition duration-700 h-full w-full rounded-2xl shadow-md drop-shadow-md flex justify-center items-center">
                <button className="w-14 h-15 rounded-full bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink transition duration-700">
                    <PlusCircle className="w-full h-full text-infinity-white-snow" />
                </button>
            </CardBody>
        </Card>
    )
}
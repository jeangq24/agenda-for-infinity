import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import localFont from 'next/font/local';
const laviossa = localFont({ src: "../../../../public/fonts/LaviossaMedium.woff2" })
export default ({ isOpen, onOpen, onOpenChange, children, titleHead, labelAction, handleAction }) => {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className={"p-4 " + laviossa.className}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{titleHead}</ModalHeader>
                            <ModalBody className="font-poppins">
                                {children}
                            </ModalBody>
                            <ModalFooter className="flex flex-row w-full justify-end gap-2 font-poppins">
                                <Button  
                                className={"bg-transparent drop-shadow-md shadow-md hover:bg-infinity-pink-lightPink"}
                                onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button 
                                className="drop-shadow-md shadow-md bg-infinity-pink-softPink hover:bg-infinity-pink-salmonPink text-infinity-white-snow font-bold"
                             onPress={()=>handleAction()}>
                                    {labelAction}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
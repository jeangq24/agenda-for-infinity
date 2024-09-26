import { Empty } from "@phosphor-icons/react"
export default ({ textBody, textFooter }) => {
    return (
        <div className="w-full h-full bg-infinity-white-snow rounded-2xl flex flex-col items-center justify-center gap-6">
            <div>
                <Empty className="w-32 h-32 text-infinity-gray-darkGray" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-2xl text-infinity-gray-darkGray font-bold text-center">
                    {textBody}
                </p>
                {textFooter && (
                    <span className="text-lg font-poppins font-bold">
                        {textFooter}
                    </span>
                )}
            </div>
        </div>

    );
};
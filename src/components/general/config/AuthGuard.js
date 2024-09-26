import { useUser } from "@/config/UserContext";

export default ({children}) => {
    const { loading } = useUser();
    return (
        <>{children}</>
    )
};

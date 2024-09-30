import LayaoutContainer from "@/components/general/config/LayaoutContainer";
import AdminPanel from "@/components/admin/AdminPanel";
import { useUser } from "@/config/UserContext";
import { useEffect } from "react";
import FormLogin from "@/components/general/forms/FormLogin";

export default () => {
    const{ user } = useUser();
    return (
        <LayaoutContainer>
           {user ? <AdminPanel/> : <FormLogin/>}
        </LayaoutContainer>
    )
}
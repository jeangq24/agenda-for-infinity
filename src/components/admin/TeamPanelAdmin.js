import { useEmployees } from "@/hooks/useEmployees"
import TableUsers from "../general/table/TableUsers"
import { getEmployees } from "@/config/employee";

export async function getServerSideProps(context) {
    const employees = await getEmployees();
    return {
        props: {
            initialEmployees: employees || []
        },
    };
};


export default ({ initialEmployees }) => {
    const { employees, addEmployee, dltEmployee, editEmployee } = useEmployees(initialEmployees);

    return (
        <div className="w-full h-full grow p-5 md:p-10">
            <TableUsers
                users={employees}
                functions={{
                    addEmployee,
                    dltEmployee,
                    editEmployee
                }}
            />
        </div>
    )
}
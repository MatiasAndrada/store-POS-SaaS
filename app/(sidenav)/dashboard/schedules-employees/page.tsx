/* import { TableEmployees } from "@/components/dashboard/employees/tableEmployees"; */
/* import { SchedulesEmployees } from "@/components/dashboard/employees/SchedulesEmployees"; */
/* import { getAllEmployees } from "@/data/employees";
import { getStoreScheduleOpen } from "@/data/schedules";
 */
//TODO 1: Table for view employees and their permissions
//TODO 2: Table for view schedules and edit them
//TODO 3: Implement TUI calendar to display schedules
export default async function Page() {
  /*   const [listEmployees, storeSchedule] = await Promise.all([
    getAllEmployees({
      select: {
        id: true,
        role: true,
        user: {
          select: { name: true },
        },
      },
    }),
    getStoreScheduleOpen(),
  ]);

  const listEmployeesFormatted = listEmployees.map((employee) => ({
    id: employee.id,
    title: employee.user.name,
  })); */

  return (
    <section className="flex flex-col gap-4 ">
      {/*       <TableEmployees /> */}
      <h1 className="text-2xl font-bold">Horarios</h1>
      {/*       {listEmployees.length <= 1 ? ( */}
      <p>Tienes que agregar empleados para poder ver sus horarios.</p>
      {/*       ) : null} */}
      {/*       {storeSchedule ? (
        <SchedulesEmployees listEmployees={listEmployeesFormatted} />
      ) : (
        <p>No hay horarios registrados para la tienda.</p>
      )} */}
      {/*    <SchedulesEmployees listEmployees={listEmployeesFormatted} /> */}
    </section>
  );
}

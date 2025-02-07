import { TableEmployees } from "@/components/dashboard/employees/tableEmployees";
import { SchedulesEmployees } from "@/components/dashboard/employees/SchedulesEmployees";

import { getAllEmployees } from "@/data/employees";

//TODO 1: Table for view employees and their permissions
//TODO 2: Table for view schedules and edit them
//TODO 3: Implement TUI calendar to display schedules
export default async function Page() {
  const employees = await getAllEmployees({
    select: {
      role: true,
      user: {
        select: { name: true },
      },
    },
  });

  return (
    <section className="flex flex-col gap-4 ">
      {/*       <TableEmployees /> */}
      <h1 className="text-2xl font-bold">Horarios</h1>
      {employees.length <= 1 ? (
        <p>Tienes que agregar empleados para poder ver sus horarios.</p>
      ) : null}
      <TableEmployees />
      <SchedulesEmployees />
    </section>
  );
}

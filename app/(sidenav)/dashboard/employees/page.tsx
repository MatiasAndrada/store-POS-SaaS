import { TableEmployees } from "@/components/dashboard/employees/tableEmployees";
//TODO 1: Table for view employees and their permissions
//TODO 2: Table for view schedules and edit them
//TODO 3: Implement TUI calendar to display schedules
export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Personal</h1>
      <TableEmployees />
    </section>
  );
}

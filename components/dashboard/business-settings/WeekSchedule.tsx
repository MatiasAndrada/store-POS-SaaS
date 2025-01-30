"use client";

import { Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { WeekScheduleProps } from "../../../types/dashboard/Schedules";

export function WeekSchedule({
  weekSchedule,
  setWeekSchedule,
}: WeekScheduleProps) {
  const handleWeekScheduleChange = (
    type: "weekdays" | "weekends",
    field: "startTime1" | "endTime1" | "startTime2" | "endTime2",
    value: string
  ) => {
    setWeekSchedule((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const renderTimeInputs = (type: "weekdays" | "weekends") => (
    <>
      <div className="flex gap-4">
        <Input
          type="time"
          label="Hora inicio 1"
          value={weekSchedule[type].startTime1}
          onChange={(e) =>
            handleWeekScheduleChange(type, "startTime1", e.target.value)
          }
        />
        <Input
          type="time"
          label="Hora fin 1"
          value={weekSchedule[type].endTime1}
          onChange={(e) =>
            handleWeekScheduleChange(type, "endTime1", e.target.value)
          }
        />
      </div>
      <div className="flex gap-4 mt-2">
        <Input
          type="time"
          label="Hora inicio 2"
          value={weekSchedule[type].startTime2}
          onChange={(e) =>
            handleWeekScheduleChange(type, "startTime2", e.target.value)
          }
        />
        <Input
          type="time"
          label="Hora fin 2"
          value={weekSchedule[type].endTime2}
          onChange={(e) =>
            handleWeekScheduleChange(type, "endTime2", e.target.value)
          }
        />
      </div>
    </>
  );

  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <h2 className="text-xl font-bold">
          Configurar horarios de atención por semana
        </h2>
      </CardHeader>
      <CardBody>
        <div className="grid gap-4">
          <div className="w-full">
            <h3 className="font-medium">Días de semana</h3>
            {renderTimeInputs("weekdays")}
          </div>
          <div className="w-full">
            <h3 className="font-medium">Fines de semana</h3>
            {renderTimeInputs("weekends")}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

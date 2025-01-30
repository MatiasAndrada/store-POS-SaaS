"use client";

import { Switch, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { CustomScheduleProps } from "../../../types/dashboard/Schedules";

export function CustomSchedule({ schedule, setSchedule }: CustomScheduleProps) {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleToggleDay = (index: number) => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index
          ? {
              ...day,
              custom: !day.custom,
              enabled: !day.custom,
              startTime1: "",
              endTime1: "",
              startTime2: "",
              endTime2: "",
            }
          : day
      )
    );
  };

  const handleTimeChange = (
    index: number,
    field: "startTime1" | "endTime1" | "startTime2" | "endTime2",
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index
          ? { ...day, [field]: value, enabled: value ? true : day.enabled }
          : day
      )
    );
  };

  const renderTimeInputs = (index: number) => (
    <div className="mt-2 flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          type="time"
          label="Hora inicio 1"
          value={schedule[index].startTime1}
          onChange={(e) =>
            handleTimeChange(index, "startTime1", e.target.value)
          }
        />
        <Input
          type="time"
          label="Hora fin 1"
          value={schedule[index].endTime1}
          onChange={(e) => handleTimeChange(index, "endTime1", e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Input
          type="time"
          label="Hora inicio 2"
          value={schedule[index].startTime2}
          onChange={(e) =>
            handleTimeChange(index, "startTime2", e.target.value)
          }
        />
        <Input
          type="time"
          label="Hora fin 2"
          value={schedule[index].endTime2}
          onChange={(e) => handleTimeChange(index, "endTime2", e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <h2 className="text-xl font-bold">
          Configurar horarios de atención personalizados por día
        </h2>
      </CardHeader>
      <CardBody>
        <div className="grid gap-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-center w-full">
                <span
                  className={`font-medium ${
                    !schedule[index].enabled ? "opacity-60" : ""
                  }`}
                >
                  {day}
                  {!schedule[index].enabled ? " - Cerrado" : null}
                </span>
                <Switch
                  checked={schedule[index].custom}
                  onChange={() => handleToggleDay(index)}
                  aria-label={`Toggle ${day}`}
                />
              </div>
              {schedule[index].enabled && !schedule[index].custom && (
                <div className="mt-2">
                  <p>
                    {schedule[index].startTime1} - {schedule[index].endTime1}{" "}
                    {schedule[index].startTime2 && (
                      <>
                        y {schedule[index].startTime2} -{" "}
                        {schedule[index].endTime2}
                      </>
                    )}
                  </p>
                </div>
              )}
              {schedule[index].custom && renderTimeInputs(index)}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

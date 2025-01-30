"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  Input,
  Button,
} from "@nextui-org/react";

export function StoreSchedule() {
  const [schedule, setSchedule] = useState(
    Array(7).fill({
      enabled: false,
      startTime1: "",
      endTime1: "",
      startTime2: "",
      endTime2: "",
    })
  );

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
              enabled: !day.enabled,
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
      prev.map((day, i) => (i === index ? { ...day, [field]: value } : day))
    );
  };

  const handleSave = () => {
    console.log("Horario guardado:", schedule);
  };

  return (
    <Card className="max-w-lg mx-auto p-4">
      <CardHeader className="text-center">
        <h2 className="text-xl font-bold">Configurar horarios de atención</h2>
      </CardHeader>
      <CardBody>
        <div className="grid gap-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">{day}</span>
                <Switch
                  checked={schedule[index].enabled}
                  onChange={() => handleToggleDay(index)}
                  aria-label={`Toggle ${day}`}
                />
              </div>
              {schedule[index].enabled && (
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
                      onChange={(e) =>
                        handleTimeChange(index, "endTime1", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleTimeChange(index, "endTime2", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button onPress={handleSave} className="w-full">
            Guardar Horarios
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

"use client";
import { Card, CardHeader, Input, Button } from "@nextui-org/react";
import { useState } from "react";

interface KioskSchedule {
  [key: string]: { open: number; close: number };
}

interface KioskScheduleFormProps {
  initialSchedule: KioskSchedule;
  onScheduleUpdate: (newSchedule: KioskSchedule) => void;
}

export const StoreHours = ({
  initialSchedule,
  onScheduleUpdate,
}: KioskScheduleFormProps) => {
  const [schedule, setSchedule] = useState<KioskSchedule>(initialSchedule);

  const handleInputChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    const numValue = Number.parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 24) {
      setSchedule((prev) => ({
        ...prev,
        [day]: { ...prev[day], [type]: numValue },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleUpdate(schedule);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Horario del Kiosco</CardTitle>
        <CardDescription>
          Define los horarios de apertura y cierre para cada día
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(schedule).map(([day, hours]) => (
            <div key={day} className="flex items-center space-x-4">
              <Label className="w-24">{day}</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={hours.open}
                  onChange={(e) =>
                    handleInputChange(day, "open", e.target.value)
                  }
                  min="0"
                  max="24"
                  className="w-16"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={hours.close}
                  onChange={(e) =>
                    handleInputChange(day, "close", e.target.value)
                  }
                  min="0"
                  max="24"
                  className="w-16"
                />
              </div>
            </div>
          ))}
          <Button type="submit">Actualizar Horario</Button>
        </form>
      </CardContent>
    </Card>
  );
};

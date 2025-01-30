"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CustomSchedule } from "./CustomSchedule";
import { WeekSchedule } from "./WeekSchedule";
import {
  DaySchedule,
  WeekSchedule as WeekScheduleType,
} from "../../../types/dashboard/Schedules";

export function StoreSchedule() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    Array(7).fill({
      enabled: false,
      custom: false,
      startTime1: "",
      endTime1: "",
      startTime2: "",
      endTime2: "",
    })
  );

  const [weekSchedule, setWeekSchedule] = useState<WeekScheduleType>({
    weekdays: {
      startTime1: "",
      endTime1: "",
      startTime2: "",
      endTime2: "",
    },
    weekends: {
      startTime1: "",
      endTime1: "",
      startTime2: "",
      endTime2: "",
    },
  });

  const updateDaySchedule = (day: DaySchedule, index: number) => {
    if (!day.custom) {
      const isWeekday = index < 5;
      const scheduleType = isWeekday
        ? weekSchedule.weekdays
        : weekSchedule.weekends;
      return {
        ...day,
        enabled: Object.values(scheduleType).some((time) => time),
        ...scheduleType,
      };
    }
    return day;
  };

  const handleSave = () => {
    const updatedSchedule = schedule.map(updateDaySchedule);
    setSchedule(updatedSchedule);
    console.log("Horario guardado:", { updatedSchedule, weekSchedule });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <CustomSchedule schedule={schedule} setSchedule={setSchedule} />
      <WeekSchedule
        weekSchedule={weekSchedule}
        setWeekSchedule={setWeekSchedule}
      />
      <div className="mt-4 flex justify-center col-span-2">
        <Button onPress={handleSave} className="w-full">
          Guardar Horarios
        </Button>
      </div>
    </div>
  );
}

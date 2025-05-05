"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CustomSchedule } from "./CustomSchedule";
import { WeekSchedule } from "./WeekSchedule";
import {
  DaySchedule,
  WeekSchedule as WeekScheduleType,
} from "@/types/dashboard/Schedules";

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
  console.log("🦇  StoreSchedule  schedule:", schedule);

  const updateDaySchedule = (day: DaySchedule, index: number) => {
    if (!day.custom) {
      const isWeekday = index < 5;
      const scheduleType = isWeekday
        ? schedule[0] // Assuming the first element is the weekday schedule
        : schedule[6]; // Assuming the last element is the weekend schedule
      return {
        ...day,
        ...scheduleType,
        ...scheduleType,
      };
    }
    return day;
  };

  const handleSave = () => {
    //TODO: Save schedule to the database
    const updatedSchedule = schedule.map(updateDaySchedule);
    setSchedule(updatedSchedule);
    console.log("Horario guardado:", { updatedSchedule });
  };

  const weekSchedule = {
    weekdays: schedule[0],
    weekends: schedule[6],
  };

  const setWeekSchedule = (
    value: WeekScheduleType | ((prev: WeekScheduleType) => WeekScheduleType)
  ) => {
    setSchedule((prev) => {
      const newWeekSchedule =
        typeof value === "function"
          ? value({
              weekdays: prev[0],
              weekends: prev[6],
            })
          : value;
      const newSchedule = [...prev];
      newSchedule[0] = { ...newSchedule[0], ...newWeekSchedule.weekdays };
      newSchedule[6] = { ...newSchedule[6], ...newWeekSchedule.weekends };
      return newSchedule;
    });
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

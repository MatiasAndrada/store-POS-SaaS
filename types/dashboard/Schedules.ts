// types.ts
export interface DaySchedule {
    enabled: boolean;
    custom: boolean;
    startTime1: string;
    endTime1: string;
    startTime2: string;
    endTime2: string;
}

export interface WeekSchedule {
    weekdays: {
        startTime1: string;
        endTime1: string;
        startTime2: string;
        endTime2: string;
    };
    weekends: {
        startTime1: string;
        endTime1: string;
        startTime2: string;
        endTime2: string;
    };
}

export interface CustomScheduleProps {
    schedule: DaySchedule[];
    setSchedule: React.Dispatch<React.SetStateAction<DaySchedule[]>>;
}

export interface WeekScheduleProps {
    weekSchedule: WeekSchedule;
    setWeekSchedule: React.Dispatch<React.SetStateAction<WeekSchedule>>;
}

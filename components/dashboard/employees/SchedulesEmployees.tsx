"use client";
import React from "react";
import { useState } from "react";
import moment from "moment";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
const localizer = momentLocalizer(moment);

const employees = [
  { id: "1", title: "John Doe" },
  { id: "2", title: "Jane Smith" },
  { id: "3", title: "Bob Johnson" },
];

const closedHours = [{ start: "12:00", end: "14:00" }];

const initialEvents = [
  {
    id: 1,
    title: "Turno Mañana",
    start: new Date(2025, 0, 31, 9, 0),
    end: new Date(2025, 0, 31, 12, 0),
    resourceId: "1",
  },
  {
    id: 2,
    title: "Turno Tarde",
    start: new Date(2025, 0, 31, 14, 0),
    end: new Date(2025, 0, 31, 18, 0),
    resosurceId: "2",
  },
];

export function SchedulesEmployees() {
  const [events, setEvents] = useState(initialEvents);

  const handleSelectSlot = ({
    start,
    end,
    resourceId,
  }: {
    start: Date;
    end: Date;
    resourceId: string;
  }) => {
    if (!resourceId) return alert("Seleccione un empleado");
    if (isClosedTime(start, end))
      return alert("El trabajo está cerrado en este horario");

    const title = prompt("Ingrese el nombre del turno:");
    if (title) {
      setEvents([
        ...events,
        { id: events.length + 1, title, start, end, resourceId },
      ]);
    }
  };

  const isClosedTime = (start: Date, end: Date) => {
    const formatTime = (date: Date) => moment(date).format("HH:mm");
    return closedHours.some(
      ({ start: closedStart, end: closedEnd }) =>
        moment(formatTime(start), "HH:mm").isBetween(
          closedStart,
          closedEnd,
          null,
          "[)"
        ) ||
        moment(formatTime(end), "HH:mm").isBetween(
          closedStart,
          closedEnd,
          null,
          "[)"
        )
    );
  };

  return (
    <div className="container ">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={{ day: true, week: true }}
        step={30}
        resources={employees}
        resourceIdAccessor="id"
        resourceTitleAccessor="title"
        onSelectSlot={handleSelectSlot}
        defaultView={Views.WEEK}
      />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import moment from "moment";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";

const localizer = momentLocalizer(moment);

const closedHours = {
  Monday: [
    { start: "12:00", end: "14:00" },
    { start: "18:00", end: "20:00" },
  ],
  Tuesday: [{ start: "13:00", end: "15:00" }],
  Wednesday: [{ start: "12:00", end: "14:00" }],
  Thursday: [{ start: "12:00", end: "14:00" }],
  Friday: [{ start: "12:00", end: "14:00" }],
  Saturday: [{ start: "12:00", end: "14:00" }],
  Sunday: [{ start: "12:00", end: "14:00" }],
};

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
    resourceId: "2",
  },
];

export function SchedulesEmployees({
  listEmployees,
}: {
  listEmployees: { id: string; title: string | null }[];
}) {
  const [events, setEvents] = useState(initialEvents);

  const handleSelectSlot = ({ start, end, resourceId }: SlotInfo) => {
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
    const dayOfWeek = moment(start).format("dddd");
    const formatTime = (date: Date) => moment(date).format("HH:mm");
    const dayClosedHours =
      closedHours[dayOfWeek as keyof typeof closedHours] || [];

    return dayClosedHours.some(
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

  const dayPropGetter = (date: Date) => {
    const dayOfWeek = moment(date).format("dddd");
    const formatTime = (date: Date) => moment(date).format("HH:mm");
    const dayClosedHours =
      closedHours[dayOfWeek as keyof typeof closedHours] || [];

    const isClosed = dayClosedHours.some(
      ({ start: closedStart, end: closedEnd }) =>
        moment(formatTime(date), "HH:mm").isBetween(
          closedStart,
          closedEnd,
          null,
          "[)"
        )
    );

    if (isClosed) {
      return {
        className: "closed-hour",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      };
    }
    return {};
  };

  return (
    <div className="container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={{ day: true, week: true }}
        step={30}
        resources={listEmployees}
        resourceIdAccessor="id"
        resourceTitleAccessor="title"
        onSelectSlot={handleSelectSlot} // Seleccionar un rango de tiempo
        defaultView={Views.WEEK} // Vista por defecto
        min={new Date(2025, 0, 31, 8, 0)} // Hora mínima visible (8:00 AM)
        max={new Date(2025, 0, 31, 22, 0)} // Hora máxima visible (10:00 PM)
        dayPropGetter={dayPropGetter} // Cambia el estilo de los días cerrados
      />
    </div>
  );
}

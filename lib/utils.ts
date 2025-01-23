
import { type ClassValue, clsx } from "clsx"
import { CalendarDate } from "@internationalized/date";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para generar un UUID basado en `crypto`
export const generateUUID = async () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  // Convert the array to a UUID string format (e.g., "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx")
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, i) => {
    const r = (array[i] & 0xf) >> (c === 'x' ? 0 : 4);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

//*Dates formatters
export const formatDate = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; //los meses en js van de 0 a 11
  const year = date.getFullYear();
  const formatHour = `${hour}:${minute}`;
  const formatDay = `${day}/${month}/${year}`;
  return `${formatHour} ${formatDay}`;
}

export const formatDateToLocal = (date: Date) => {
  // Convert UTC date to local date
  const localDate = new Date(date);
  return localDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function convertToDateValue(date: Date): CalendarDate {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
}

//*End Date formatters 

//*Math formatter
export const convertFractionToPercentage = (numerator: number, denominator: number) => {
  const result = (numerator / denominator) * 100;
  return result.toFixed(0) + '%';
}
//*End Math formatter

//* Text formatters
export const initialLetters = (name: string) => {
  return name.split(' ').map((n) => n[0]).join('');
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeEachWord(text: string) {
  return text.split(' ').map(capitalizeFirstLetter).join(' ');
}

export function endWithPoint(text: string) {
  return text.endsWith('.') ? text : text + '.';
}
//*End Text formatters


/* export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;
 
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }
 
  return { yAxisLabels, topLabel };
}; */


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


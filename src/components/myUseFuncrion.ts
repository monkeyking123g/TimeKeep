import dayjs from "dayjs";

const date = new Date();
const dateYear = dayjs(date).get("year");

const getBusinessDatesCount = (startDate: Date, endDate: Date): number => {
  let count = 0;
  let curDate = new Date(startDate);
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (!(dayOfWeek === 6 || dayOfWeek === 0)) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

export const percentage = (partialValue: number, totalValue: number): number => {
  return (100 * partialValue) / totalValue;
};

export const precisionRound = (number: number, precision: number): number => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const numberWithSep = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

function getLastDayOfYear(): Date {
  return new Date(dateYear, 11, 31);
}
function getFirstDayOfYear(): Date {
  return new Date(dateYear, 0, 1);
}

export const totalHours = (): {year: number, month: number} => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const workDay = getBusinessDatesCount(firstDay, lastDay);
  const year =
    getBusinessDatesCount(getFirstDayOfYear(), getLastDayOfYear()) * 12;

  const month = workDay * 12;
  return { year, month };
};

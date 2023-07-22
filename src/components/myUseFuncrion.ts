import dayjs from "dayjs";

const date = new Date();
const dateYear = dayjs(date).get("year");

const getBusinessDatesCount = (startDate, endDate) => {
  let count = 0;
  var curDate = startDate;
  while (curDate <= endDate) {
    var dayOfWeek = curDate.getDay();
    if (!(dayOfWeek === 6 || dayOfWeek === 0)) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const precisionRound = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const numberWithSep = (x) => {
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return x.replace(".", ",");
};

export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

function getLastDayOfYear() {
  return new Date(dateYear, 11, 31);
}
function getFirstDayOfYear() {
  return new Date(dateYear, 0, 1);
}
export const totalHours = () => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const workDay = getBusinessDatesCount(firstDay, lastDay);
  const year =
    getBusinessDatesCount(getFirstDayOfYear(2022), getLastDayOfYear(2022)) * 12;

  const month = workDay * 12;
  return { year, month };
};

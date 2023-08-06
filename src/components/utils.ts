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


export const calculateConstants = (
  totalMonth: number,
  totalMonthHours: number,
  totalYear: number,
  totalYearHours: number,
  userEarningHour: number
) => {
  const PERCENTUAL_MONTH = precisionRound(percentage(totalMonth, totalMonthHours), 1);
  const PERCENTUAL_YEAR = precisionRound(percentage(totalYear, totalYearHours), 1);
  const ERNIN_HOUR_TOTAL = precisionRound(totalMonth * userEarningHour, 2);
  const ERNIN_HOUR_YEAR = precisionRound(totalYear * userEarningHour, 2);
  const PERCENTUAL_ERN_MONTH = precisionRound(
    percentage(ERNIN_HOUR_TOTAL, totalMonthHours * userEarningHour),
    1
  );
  const PERCENTUAL_ERN_YEAR = precisionRound(
    percentage(ERNIN_HOUR_YEAR, totalYearHours * userEarningHour),
    1
  );

  return {
    PERCENTUAL_MONTH,
    PERCENTUAL_YEAR,
    ERNIN_HOUR_TOTAL,
    ERNIN_HOUR_YEAR,
    PERCENTUAL_ERN_MONTH,
    PERCENTUAL_ERN_YEAR,
  };
};

import dayjs from "dayjs";
import Axios from "axios";
import "dayjs/locale/it";
import { reactLocalStorage } from "reactjs-localstorage";

const userCredensial: any  = reactLocalStorage.getObject("user");

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const loadData = async () => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_DOMAIN}/api/user/${userCredensial.id}/time`,
      config
    );
    if (Array.isArray(response.data.data)) {
      if (response.data.data.length > 0) {
        const rows = await response.data.data;
        const currentMonth = dayjs(new Date()).locale("it").format("MM");
        const currentYear = dayjs(new Date()).locale("it").format("YYYY");

        const eventsMonth = response.data.data.filter((e: any) => {
          const dataFromUser = dayjs(e.dateCreated)
            .locale("it")
            .format("YYYY-MM-DD");
          var [year, month] = dataFromUser.split("-"); // Or, var month = e.date.split('-')[1];

          return +currentMonth === +month && currentYear === year;
        });

        let calcolateTotalMonth = 0;
        await eventsMonth.forEach((element: any) => {
          calcolateTotalMonth += element.total;
        });

        const eventsYear = response.data.data.filter((e: any) => {
          const dataFromUser = dayjs(e.dateCreated)
            .locale("it")
            .format("YYYY-MM-DD");

          var [year] = dataFromUser.split("-"); // Or, var month = e.date.split('-')[1];
          return currentYear === year;
        });

        let calcolatetotalYear = 0;
        await eventsYear.forEach((element: any) => {
          calcolatetotalYear += element.total;
        });
        return { rows, calcolateTotalMonth, calcolatetotalYear };
      }
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
    } else {
      console.log("Error", error.message);
    }
  }
};

//////////////  POST  //////////////////////
export const postTimes = async (values: object) => {
  const post = await Axios.post(
    `${process.env.REACT_APP_DOMAIN}/api/user/times`,
    values,
    config
  );
  return post;
};
export const postMonth = async (newValuse: object) => {
  const response = await Axios.post(
    `${process.env.REACT_APP_DOMAIN}/api/user/month`,
    newValuse,
    config
  );
  return response;
};

////////////////// GET /////////////////////
export const getTimeUser = async () => {
  const response = await Axios.get(

    `${process.env.REACT_APP_DOMAIN}/time-day/user/${userCredensial.id}`,
    config
  );
  return response;
};
export const getUserMonth = async () => {
  const response = await Axios.get(

    `${process.env.REACT_APP_DOMAIN}/api/user/${userCredensial.id}/month`,
    config
  );
  return response;
};

////////////// DELETE /////////////////
export const deletMonth = async (id: string) => {
  await Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/user/${id}/month`);
};
export const deletTime = async (id: string) => {
  await Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/user/${id}/month`);
};

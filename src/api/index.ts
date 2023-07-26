import dayjs from "dayjs";
import Axios from "axios";
import "dayjs/locale/it";


const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const loadData = async (userId: string) => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_DOMAIN}/day/user/${userId}`,
      config
    );
   
    if (Array.isArray(response.data) && response.data.length > 0) {
      const currentMonth = dayjs().locale("it").format("MM");
      const currentYear = dayjs().locale("it").format("YYYY");
  
      const eventsMonth = response.data.filter((e) => {
        const { dateCreated } = e;
        const [year, month] = dayjs(dateCreated).locale("it").format("YYYY-MM-DD").split("-");
        return +currentMonth === +month && currentYear === year;
      });
  
      const calculateTotalMonth = eventsMonth.reduce((total, element) => total + element.total, 0);
  
      const eventsYear = response.data.filter((e) => {
        const { dateCreated } = e;
        const [year] = dayjs(dateCreated).locale("it").format("YYYY-MM-DD").split("-");
        return currentYear === year;
      });
  
      const calculateTotalYear = eventsYear.reduce((total, element) => total + element.total, 0);
  
      return { rows: response.data, calculateTotalMonth, calculateTotalYear };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
    } else {
      console.log("Error", error.message);
    }
  } 
};

/****************  Post  ************************/ 
export const postTimes = async (values: object) => {
  const post = await Axios.post(
    `${process.env.REACT_APP_DOMAIN}/day`,
    values,
    config
  );
  return post;
};
export const postMonth = async (newValuse: object) => {
  const response = await Axios.post(
    `${process.env.REACT_APP_DOMAIN}/month`,
    newValuse,
    config
  );
  return response;
};

/****************  GET  ************************/  
export const getUserTime = async (id: string) => {
  const response = await Axios.get(

    `${process.env.REACT_APP_DOMAIN}/day/user/${id}`,
    config
  );
  return response;
};
export const getUserMonth = async (id: string) => {
  const response = await Axios.get(

    `${process.env.REACT_APP_DOMAIN}/month/user/${id}`,
    config
  );
  return response;
};

/****************  DELETE  ************************/  
export const deletMonth = async (id: string) => {
  await Axios.delete(`${process.env.REACT_APP_DOMAIN}/month/${id}`);
};
export const deletTime = async (id: string) => {
  await Axios.delete(`${process.env.REACT_APP_DOMAIN}/day/${id}`);
};

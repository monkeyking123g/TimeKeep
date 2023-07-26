import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserMonth } from "../api";
import { grey } from '@mui/material/colors';
import dayjs from "dayjs";
import "dayjs/locale/it";
import React from "react";
import { useSelector } from "react-redux";

interface DataPoint {
  x: string;
  y: number;
}

interface DataEntry {
  id: string;
  color: string;
  data: DataPoint[];
}

const Data: DataEntry[] = [
  {
    id: `${dayjs().locale("it").year()}`,
    color: "#4cceac",
    data: [
      { x: "gennaio", y: 0 },
      { x: "febbraio", y: 0 },
      { x: "marzo", y: 0 },
      { x: "aprile", y: 0 },
      { x: "maggio", y: 0 },
      { x: "giugno", y: 0 },
      { x: "luglio", y: 0 },
      { x: "agosto", y: 0 },
      { x: "settembre", y: 0 },
      { x: "ottobre", y: 0 },
      { x: "novembre", y: 0 },
      { x: "dicembre", y: 0 },
    ],
  },
];


const LineChart: React.FC<{ isDashboard?: boolean }> = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getUserMonth(user._id);
        if (Array.isArray(response.data)) {
          Data[0].data.forEach((month) => {
            const currentYear = dayjs().locale("it").year();

            let ispresent = response.data.find((get: any) => {
              const yearX = +get.month.match(/\d/g).join("");
              const monthX = get.month.replace(/\d+/g, "").trim();

              return yearX === currentYear && monthX === month.x;
            });

            if (ispresent) month.y = ispresent.total;
          });
          setData(Data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log("Error", error.message);
        }
      }
    };
    loadData();
  }, []);
  return (
    <ResponsiveLine
      data={data}
      theme={{
        background: theme.palette.background.default,
        textColor: "#808080",

        axis: {
          domain: {
            line: {
              stroke: grey[100],
            },
          },
          legend: {
            text: {
              fill: grey[100],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary.main,
              strokeWidth: 1,
            },
            text: {
              fill: grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: grey[100],
          },
        },
        tooltip: {
          container: {
            color:  theme.palette.primary.main,
          },
        },
      }}
      // colors={isDashboard ? {datum: "color"}: {scheme: "nivo"}}
      colors={theme.palette.secondary.main}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      } as any }
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      } as any}
      enableGridX={false}
      enableGridY={false}
      enablePointLabel={true}
      pointSize={11}
      // pointColor={colors.greenAccent[500]}
      pointBorderWidth={0}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabelYOffset={-12}
      useMesh={true}
      // enableArea={true}
      areaBaselineValue={100}
      isInteractive={false}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

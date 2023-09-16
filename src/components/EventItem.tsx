import React from "react";
import { Typography, useTheme, Card, CardContent } from "@mui/material";
import { TimeData } from "../scenes/time";
import { MonthData } from "../scenes/month";

interface EventItemProps {
    event: TimeData | MonthData;
  }

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    const theme = useTheme();
  
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    return (
      <Card sx={{ minWidth: 275, marginBottom: theme.spacing(1) }}>
        <ul>
        {Object.keys(event).map((key) => {

            if(key === "id") return

            return (
              <li key={key} style={{padding: theme.spacing(1)}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {capitalizeFirstLetter(key)}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {event[key]}
                  </Typography>
              </li>
            )
        })}

        </ul>
        
      </Card>
    );
};

export default EventItem;
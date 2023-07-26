import React from "react";
import { Typography, useTheme, Card, CardContent } from "@mui/material";
import { TimeData } from "../scenes/time";
import { RowsData } from "../scenes/month";

interface EventItemProps {
    event: TimeData | RowsData;
  }

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    const theme = useTheme();
  
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    return (
      <Card sx={{ minWidth: 275, marginBottom: theme.spacing(1) }}>
        {Object.keys(event).map((key) => {
  
          if(key === "id") return
  
          return (
            <>
              <CardContent key={key} sx={{padding: theme.spacing(1)}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {capitalizeFirstLetter(key)}
                </Typography>
                <Typography variant="h6" component="div">
                  {event[key]}
                </Typography>
              </CardContent> 
            </>
          )
        })}
      </Card>
    );
};

export default EventItem;
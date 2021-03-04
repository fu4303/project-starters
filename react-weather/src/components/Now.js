import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Now = ({ now }) => {
  return (
    <Card>
      <CardContent>
        <img src={now.icon} alt="weather icon"></img>
        <Typography variant="h2">
          {now.temperature.current}°{now.unitIndicator}
        </Typography>
        <Typography variant="h4">{now.description}</Typography>
        <Typography variant="h6">
          Sunrise {now.sunrise} Sunset {now.sunset}
        </Typography>
        <Typography variant="h6">
          Min {now.temperature.min}°{now.unitIndicator} Max{" "}
          {now.temperature.max}°{now.unitIndicator}
        </Typography>
        <Typography variant="h6">Wind {now.wind} km/h</Typography>
        <Typography variant="h6">Humidity {now.humidity}%</Typography>
      </CardContent>
    </Card>
  );
};

export default Now;

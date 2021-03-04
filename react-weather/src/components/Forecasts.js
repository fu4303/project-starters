import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Forecasts = ({ forecasts }) => {
  return (
    <Grid container spacing={2}>
      {forecasts.map((forecast, i) => (
        <Grid item key={i}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" align="center">
                {forecast.day} {forecast.time}
              </Typography>
              <Typography variant="h6" align="center">
                <img src={forecast.icon} alt="weather icon"></img>
              </Typography>
              <Typography variant="h4" align="center">
                {forecast.temperature}°{}
              </Typography>
              <Typography variant="h6" align="center">
                {forecast.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecasts;

import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const City = ({ city }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LocationCityIcon style={{ fontSize: 100 }} />
          </Grid>
          <Grid item>
            <Typography variant="h2" noWrap>
              {city.name}
            </Typography>
            <Typography variant="h6" noWrap>
              {city.country}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            {city.population !== undefined && (
              <Typography variant="h6" noWrap>
                population {Number(city.population).toLocaleString()}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              href={city.googleUrl}
              underline="always"
              target="_blank"
              rel="noopener noreferrer"
            >
              map
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              href={city.wikiUrl}
              underline="always"
              target="_blank"
              rel="noopener noreferrer"
            >
              wiki
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default City;

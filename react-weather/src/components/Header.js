import React from "react";
import CloudIcon from "@material-ui/icons/Cloud";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Header = () => {
  return (
    <Grid container spacing={2} alignItems="flex-end">
      <Grid item>
        <CloudIcon color="primary" fontSize="large" />
      </Grid>
      <Grid item>
        <Typography variant="h6" noWrap>
          Weather Forecast
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;

import React from "react";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

const ErrorMessage = (props) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Grid container spacing={2} alignItems="flex-end">
      <Grid item>
        <Collapse in={open}>
          <Alert
            severity="error"
            onClose={() => {
              setOpen(false);
            }}
          >
            {props.errorMessage}
          </Alert>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;

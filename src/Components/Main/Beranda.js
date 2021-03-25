import React from "react";
import PropTypes from "prop-types";

import { Grid, Paper, withStyles } from "@material-ui/core";

const styled = withStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

class Beranda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>Beranda</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Beranda.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styled(Beranda);

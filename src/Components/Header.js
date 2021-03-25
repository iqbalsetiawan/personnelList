import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid } from "@material-ui/core";

const style = withStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    width: "100%",
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.normalTextfield,
    background: "white",
    zIndex: 2,
  },
  gridLeft: {
    paddingRight: 40,
    height: 80,
  },
}));

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid
            className={classes.gridLeft}
            item
            xs={12}
            container
            alignItems="center"
            justify="flex-end"
          />
        </Grid>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default style(Header);

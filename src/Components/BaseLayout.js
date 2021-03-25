import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

import Header from "./Header";
import Sidebar from "./Sidebar";

const style = {
  root: {
    display: "flex",
  },
  sidebarWrapper: {
    display: "flex",
    height: "100vh",
  },
  contentWrapperWithoutSettings: {
    width: "100%",
  },
  contentWrapper: {
    display: "inline-block",
    maxHeight: "100vh",
    overflow: "auto",
  },
};

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.sidebarWrapper}>
          <Sidebar />
        </div>
        <div
          className={`${classes.contentWrapper} ${classes.contentWrapperWithoutSettings}`}
        >
          <Header />
          {children}
        </div>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(BaseLayout);

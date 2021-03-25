import React from "react";
import PropTypes from "prop-types";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Button, withStyles } from "@material-ui/core";

const actionsStyles = (theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  left: {
    marginLeft: 10,
  },
});

class CustomTablePagination extends React.Component {
  handleBackButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = (event) => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <Button disabled={page === 0} onClick={this.handleBackButtonClick}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Previous Page
        </Button>
        <Button
          onClick={this.handleNextButtonClick}
          className={classes.left}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          Next Page
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </div>
    );
  }
}

CustomTablePagination.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(actionsStyles, {
  withTheme: true,
})(CustomTablePagination);

import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  Grid,
  Paper,
  Typography,
  withStyles,
  TextField,
  InputAdornment,
  Button,
  Divider,
  TablePagination,
  CircularProgress,
  Hidden,
} from "@material-ui/core";
import { Add, Search, MoreHoriz } from "@material-ui/icons";

import CustomTablePagination from "../CustomTablePagination";

import NotFound from "../../Assets/NotFound.jpg";

const formatWord = (word) =>
  word.length > 10 ? `${word.slice(0, 8)}...` : word;

const formatDate = (date) => {
  const options = { month: "long" };
  const day = date.getDate();
  const month = Intl.DateTimeFormat("en-US", options).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const styled = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: "1em",
  },
  paperUser: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: "1em",
    height: "auto",
    width: 280,
  },
  buttonAdd: {
    backgroundColor: "rgba(21,194,192,255)",
    color: "#ffffff",
    marginLeft: 10,
  },
  blue: {
    color: "rgba(21,194,192,255)",
  },
  image: {
    width: "50%",
    marginTop: 10,
    borderRadius: 60,
  },
}));

class PersonnelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      isFetching: false,
      searchData: "",
      page: 0,
      rowsPerPage: 4,
    };
  }

  componentDidMount() {
    const dataLocal = window.localStorage.getItem("userData");
    if (dataLocal === null) {
      this.populateData();
    } else {
      this.setState({
        userData: JSON.parse(dataLocal),
      });
    }
  }

  populateData = () => {
    this.setState({ isFetching: true });
    axios
      .get("https://randomuser.me/api/?results=28")
      .then((res) => {
        window.localStorage.setItem(
          "userData",
          JSON.stringify(res.data.results)
        );
        this.setState({
          userData: res.data.results,
          isFetching: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isFetching: false,
        });
      });
  };

  handleChange = (event) => {
    const dataLocal = window.localStorage.getItem("userData");
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const fil = this.state.userData.filter((dt) =>
          dt.name.first.toLowerCase().includes(event.target.value.toLowerCase())
        );
        if (event.target.value === "") {
          this.setState({
            userData: JSON.parse(dataLocal),
          });
        } else {
          this.setState({
            userData: fil,
          });
        }
      }
    );
  };

  handleChangePaginationPage = (event, page) => {
    window.scrollTo(0, 0);
    this.setState({ page });
  };

  render() {
    const { classes } = this.props;
    const { userData, searchData, page, rowsPerPage, isFetching } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Typography variant="h2" color="primary">
                PERSONNEL LIST
              </Typography>
              <Typography variant="h2">List of all personnels</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={9}
              lg={9}
              xl={9}
              justify="flex-end"
            >
              <TextField
                value={searchData}
                name="searchData"
                placeholder="Find Personnels"
                onChange={this.handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className={classes.blue} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" className={classes.buttonAdd}>
                Add Personnels &nbsp; <Add />
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid container item xs={12}>
          {isFetching ? (
            <Grid container item xs={12} justify="center">
              <CircularProgress size={40} />
            </Grid>
          ) : userData.length > 0 ? (
            userData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(($item, i) => (
                <Grid
                  key={i}
                  container
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  justify="center"
                >
                  <Paper className={classes.paperUser}>
                    <Grid container item xs={12}>
                      <Grid item xs={11}>
                        Personnel ID:{" "}
                        <Typography
                          variant="body2"
                          color="primary"
                          component="span"
                        >
                          {$item.id.value !== null
                            ? formatWord($item.id.value)
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid container item xs={1} justify="flex-end">
                        <MoreHoriz />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={12}
                      lg={12}
                      xl={6}
                      container
                      justify="center"
                    >
                      <img
                        alt="Profile"
                        src={$item.picture.thumbnail}
                        className={classes.image}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={12}
                      lg={12}
                      xl={6}
                      style={{ marginTop: 10 }}
                    >
                      <Typography
                        style={{ fontWeight: "bold" }}
                        variant="subtitle2"
                      >
                        Name
                      </Typography>
                      <Typography variant="body2" component="span">
                        {`${$item.name.title} ${$item.name.first} ${$item.name.last}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} lg={12} style={{ marginTop: 10 }}>
                      <Typography
                        style={{ fontWeight: "bold" }}
                        variant="subtitle2"
                      >
                        Telephone
                      </Typography>
                      <Typography variant="body2" component="span">
                        {$item.phone}
                      </Typography>
                    </Grid>
                    <Hidden smDown>
                      <Grid item xs={12} style={{ marginTop: 10 }}>
                        <Typography
                          style={{ fontWeight: "bold" }}
                          variant="subtitle2"
                        >
                          Birthday
                        </Typography>
                        <Typography variant="body2" component="span">
                          {formatDate(new Date($item.dob.date))}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: 10 }}>
                        <Typography
                          style={{ fontWeight: "bold" }}
                          variant="subtitle2"
                        >
                          Email
                        </Typography>
                        <Typography variant="body2" component="span">
                          {$item.email}
                        </Typography>
                      </Grid>
                    </Hidden>
                  </Paper>
                </Grid>
              ))
          ) : (
            <Grid container item xs={12} justify="center">
              <img alt="Not Found" src={NotFound} />
            </Grid>
          )}
          <Grid container item xs={12} justify="center">
            {!isFetching && userData.length > 0 && (
              <TablePagination
                count={userData.length}
                page={page}
                onChangePage={this.handleChangePaginationPage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this.handleChangePaginationRowsPerPage}
                rowsPerPageOptions={[4]}
                ActionsComponent={CustomTablePagination}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

PersonnelList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styled(PersonnelList);

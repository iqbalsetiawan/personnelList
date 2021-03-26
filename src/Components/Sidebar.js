import React from "react";
import PropTypes from "prop-types";

import {
  makeStyles,
  useTheme,
  CssBaseline,
  Drawer,
  Hidden,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Home, Menu, People, Today } from "@material-ui/icons";

import Gadjian from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  routeButton: {
    display: "flex",
    padding: "1em",
    "& img": {
      width: 35,
      height: 35,
    },
    color: "black",
  },
  routeButtonSelected: {
    color: "rgba(21,194,192,255)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  image: {
    width: "30%",
    marginLeft: "8%",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  abu2: {
    display: "flex",
    color: theme.palette.text.secondary,
  },
}));

const routes = [
  {
    link: "/beranda",
    label: "Beranda",
    icon: <Home />,
  },
  {
    link: "/personel",
    label: "Personnel List",
    icon: <People />,
  },
  {
    link: "/daily",
    label: "Daily Attendance",
    icon: <Today />,
  },
];

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img alt="Gadjian" src={Gadjian} className={classes.image} />
      </div>
      {routes.map((route) => (
        <Tooltip key={route.link} title={route.label} placement="right">
          <NavLink
            activeClassName={classes.routeButtonSelected}
            className={classes.routeButton}
            to={route.link}
          >
            {route.icon}
            <Typography style={{ marginLeft: 20 }} variant="body1">
              {route.label}
            </Typography>
          </NavLink>
        </Tooltip>
      ))}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Grid
            item
            container
            xs={12}
            justify="flex-end"
            className={classes.abu2}
          >
            <Typography variant="h2">Hallo, &nbsp;</Typography>
            <Typography variant="h2" color="primary">
              Gadjian User
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

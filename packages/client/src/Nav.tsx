import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";

import {
  useCommands,
  ROUTE_REGISTRY,
  COMMAND_REGISTRY,
  useLocalState,
  useUpdateLocalState,
} from "aspanUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  buttons: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const FAVORITE_FOLDER = ":favorite";
const HOME_FOLDER = "/";

export function Nav() {
  const classes = useStyles();
  const { loading: localStateLoading, data: localStateData } = useLocalState();
  const { loading: commandsLoading, data: commandsData } = useCommands();
  const updateLocalState = useUpdateLocalState();

  if (localStateLoading || commandsLoading) return null;
  const {
    id,
    prevDisplayComponent,
    prevId,
    prevScrollY,
    displayComponent,
  } = localStateData;

  const commands = {
    [COMMAND_REGISTRY.home]: {
      icon: <HomeIcon />,
      state: {
        displayComponent: ROUTE_REGISTRY.folder,
        prevDisplayComponent: displayComponent,
        id: HOME_FOLDER,
        prevId: id,
        scrollY: 0,
        prevScrollY: window.scrollY,
      },
    },
    [COMMAND_REGISTRY.meta]: {
      icon: <AssignmentIcon />,
      state: {
        displayComponent: ROUTE_REGISTRY.meta,
        id,
        prevDisplayComponent: displayComponent,
        prevId: id,
        scrollY: 0,
        prevScrollY: window.scrollY,
      },
    },
    [COMMAND_REGISTRY.back]: {
      icon: <ArrowBackIcon />,
      state: {
        displayComponent: prevDisplayComponent,
        prevDisplayComponent: displayComponent,
        id: prevId,
        prevId: id,
        scrollY: prevScrollY,
        prevScrollY: window.scrollY,
      },
    },
    [COMMAND_REGISTRY.favorite]: {
      icon: <FavoriteIcon />,
      state: {
        displayComponent: ROUTE_REGISTRY.folder,
        id: FAVORITE_FOLDER,
        scrollY: 0,
        prevDisplayComponent: displayComponent,
        prevId: id,
        prevScrollY: window.scrollY,
      },
    },
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.buttons}>
            <>
              {commandsData &&
                commandsData.map((command: COMMAND_REGISTRY) => (
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                      updateLocalState(commands[command].state);
                    }}
                  >
                    {commands[command].icon}
                  </IconButton>
                ))}
            </>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

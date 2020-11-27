import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Library from "@material-ui/icons/LocalLibrary";

import {signOutAction, userState } from "@redux/userSlice";
import clsx from "clsx";
import api from "@helpers/auth"

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(userState);

  const redirect = (path) => {
    router.push(path);
  };

  const logOut = () => {
    dispatch(signOutAction());
    api.deleteToken();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          LA CLASSE
        </Typography>
        <Link href="/">
          <IconButton style={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        </Link>
        {!loggedIn && (
          <Link href="/signin">
            <Button className={clsx([classes.button, classes.link])}>
              Sign In
            </Button>
          </Link>
        )}
        {loggedIn && (
          <>
            {user.instructor && (
              <Link href={`/teach/courses/${user._id}`}>
                <Button className={clsx([classes.button, classes.link])}>
                  <Library /> Teach
                </Button>
              </Link>
            )}
            <Link href="/users">
              <Button className={clsx([classes.button, classes.link])}>
                users
              </Button>
            </Link>

            <Link href={`/user/${user._id}`}>
            <Button className={clsx([classes.button, classes.link])}>
                  Profile</Button>
            </Link>

            <Button
              className={classes.link}
              onClick={() => {
                logOut();
                redirect("/");
              }}
            >
              Sign out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

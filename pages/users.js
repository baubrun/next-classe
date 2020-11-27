import { useState, useEffect } from "react";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";

import Header from "@components/Header";
// import dbConnect from "@utils/db";
import auth from "@helpers/auth"

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Users = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props && !props.error) {
      setUsers(props.users);
    } else {
      setError("Users did not load!");
    }
  }, []);

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <>
      <Header />
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          All Users
        </Typography>
        <List dense>
          {users.map((user, idx) => {
            return (
              <Link href={"user/" + user._id} key={idx}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={user.name} />

                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default Users;

export const getStaticProps = async (ctx) => {
  const token = auth.isAuthenticated();
  let req = await fetch(`http://localhost:3000/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await req.text();

  if (res) {
    return {
      props: {
        users: JSON.parse(res),
      },
    };
  }
  return {
    props: { error: true },
  };
};

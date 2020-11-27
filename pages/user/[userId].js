/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";

import { userState } from "@redux/userSlice";
import DeleteUser from "@components/DeleteUser";
import Header from "@components/Header";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { loggedIn, user } = useSelector(userState);
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    if (props && !props.error)
    setProfile(props.userId)
  }, [props.userId]);


  if (redirect) {
    return router.push("/signin");
  }

  return (
    <>
      <Header />
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={profile.name} secondary={profile.email} />
            {loggedIn && (
              //   auth &&
              <ListItemSecondaryAction>
                <Link href={`/user/edit/${profile._id}`}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={profile._id} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"Joined: " + new Date(profile.created).toDateString()}
            />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default Profile;


export const getServerSideProps = async (ctx) => {
  const id = ctx.params.userId
  let req = await fetch(`http://localhost:3000/api/users/${id}`);
  const res = await req.text();

  if (res && !res.error) {
    return {
      props: {
        userId: JSON.parse(res),
      },
    };
  }
  return {
    props: { error: res.error },
  };
};

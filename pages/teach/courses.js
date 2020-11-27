import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {useRouter} from 'next/router';
import Link from 'next/link';

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import api from "../../api/course";

import { userState } from "@redux/userSlice";

const useStyles = makeStyles((theme) => ({
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  avatar: {
    borderRadius: 0,
    width: 65,
    height: 40,
  },
  listText: {
    marginLeft: 16,
  },
  link: {
    color: "#1b0000 !important",
    textDecoration: "none",
  },
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "32px",
  },
}));

const MyCourses = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useSelector(userState);
  const [courses, setCourses] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const getCourses = (data) => {
    if (data) {
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    }
  };


//   const getCourses = async () => {
//     const data = await api.listCourseByInstructor(user._id);
//     if (data) {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setCourses(data);
//       }
//     }
//   };

  useEffect(() => {
    getCourses(props.courses);
  }, []);

  if (redirect) {
    return router.push("/signin")
  }

  if (error) {
    return (
      <>
        <Typography color="error" variant="h6" component="p">
          {error}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Courses
          <span className={classes.addButton}>
            <Link href="/teach/course/new">
              <Button  className={classes.link} color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon> New Course
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {courses && courses.map((course, idx) => {
            return (
              <Link
                href={"/teach/course/" + course._id}
                key={idx}
              >
                <ListItem
                className={classes.link}
                button>
                  <ListItemAvatar>
                    <Avatar
                      src={`/images/${course.image}`}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={course.name}
                    secondary={course.description}
                    className={classes.listText}
                  />
                </ListItem>
                <Divider />
              </Link>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default MyCourses;

// export const getServerSideProps = async (ctx) => {
//     // await dbConnect();
  
//     const id = ctx.params.userId
//     let req = await fetch(`http://localhost:3000/api/courses/by/${id}`);
//     const res = await req.text();
  
//     if (res && !res.error) {
//       return {
//         props: {
//           courses: JSON.parse(res),
//         },
//       };
//     }
//     return {
//       props: { error: res.error },
//     };
//   };
  
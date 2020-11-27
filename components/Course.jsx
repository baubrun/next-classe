import { useState, useEffect } from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CompletedIcon from "@material-ui/icons/VerifiedUser";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// import api from "../../api/course";
import {isAuthenticated} from "@helpers/auth";

import { userState } from "@redux/userSlice";

import NewLesson from "@components/NewLesson"

const useStyles = makeStyles((theme) => ({
  action: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "8px",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "2px",
    marginTop: 5,
  },
  card: {
    padding: "24px 40px 40px",
  },
  details: {
    margin: "16px",
  },
  enroll: {
    float: "right",
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  icon: {
    verticalAlign: "sub",
  },
  media: {
    height: 190,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  statSpan: {
    margin: "7px 10px 0 10px",
    alignItems: "center",
    color: "#616161",
    display: "inline-flex",
    "& svg": {
      marginRight: 10,
      color: "#b6ab9a",
    },
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
}));

const Course = (props) => {
  const classes = useStyles();
  const router = useRouter()
  const { loggedIn, user } = useSelector(userState);
  const [course, setCourse] = useState({ instructor: {} });
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({
    error: "",
    redirect: false,
  });

  const courseUrl = ""

  const imageUrl = course.image
    ? course.image
    : ""

  const getCourse = async () => {
    console.log('props :>> ', props);
    // const data = await api.read(courseUrl);
    // // console.log("data :>> ", data);
    // if (data) {
    //   if (data.error) {
    //     setValues({
    //       ...values,
    //       error: data.error,
    //     });
    //   } else {
    //     setCourse(data);
    //   }
    // }
  };

  useEffect(() => {
    getCourse();
  }, [courseUrl]);


  const addLesson = (course) => {
    setCourse(course);
  };



  if (values.redirect) {
    return router.push("/teach/courses")
  }


  return (
    <div>course page</div>

    // <Box className={classes.root}>
    //   <Card className={classes.card}>
    //     <CardHeader
    //       title={course.name}
    //       subheader={
    //         <Box>
    //           <Link
    //             href={`/user/${course.instructor._id}`}
    //           >
    //             <a className={classes.sub}>By {course.instructor.name}</a>
    //           </Link>
    //           <span className={classes.category}>{course.category}</span>
    //         </Box>
    //       }
    //       action={
    //         <>
    //           {loggedIn 
    //         //   && isAuthenticated(user._id, course.instructor._id) 
    //           && 
    //           (
    //             <span className={classes.action}>
    //               <Link href={`/teach/course/edit/${course._id}`}>
    //                 <IconButton color="secondary">
    //                   <Edit />
    //                 </IconButton>
    //               </Link>
    //               {!course.published ? (
    //                 <>
    //                   <Button
    //                     color="secondary"
    //                     variant="outlined"
    //                   >
    //                     {course.lesson && course.lessons.length === 0
    //                       ? "Add atleast 1 lesson to publish"
    //                       : "Publish"}
    //                   </Button>
    //                   delete course here
    //                 </>
    //               ) : (
    //                 <Button color="primary" variant="outlined">
    //                   Published
    //                 </Button>
    //               )}
    //             </span>
    //           )}
    //           {course.published && (
    //             <Box>
    //               <span className={classes.statSpan}>
    //                 <PeopleIcon />
    //                enroll stats here
    //               </span>
    //               <span className={classes.statSpan}>
    //                 <CompletedIcon />
    //                completed info here
    //               </span>
    //             </Box>
    //           )}
    //         </>
    //       }
    //     />

    //     <Box className={classes.flex}>
    //       <CardMedia
    //         className={classes.media}
    //         image={imageUrl}
    //         title={course.name}
    //       />
    //       <Box className={classes.details}>
    //         <Typography variant="body1" className={classes.subheading}>
    //           {course.description}
    //           <br />
    //         </Typography>

    //         {course.published && (
    //           <Box className={classes.enroll}>
    //             enroll here
    //           </Box>
    //         )}
    //       </Box>
    //     </Box>

    //     <Divider />
    //     <Box>
    //       <CardHeader
    //         title={
    //           <Typography variant="h6" className={classes.subheading}>
    //             Lessons
    //           </Typography>
    //         }
    //         subheader={
    //           <Typography variant="body1" className={classes.subheading}>
    //             {course.lessons && course.lessons.length} lessons
    //           </Typography>
    //         }
    //         action={
    //           loggedIn &&
    //           isAuthenticated() &&
    //           !course.published && (
    //             <span className={classes.action}>
    //               <NewLesson 
    //               courseId={course._id} 
    //               addLesson={addLesson} 
    //               />
    //             </span>
    //           )
    //         }
    //       />
    //       <List>
    //         {course.lessons &&
    //           course.lessons.map((lesson, idx) => {
    //             return (
    //               <span key={idx}>
    //                 <ListItem>
    //                   <ListItemAvatar>
    //                     <Avatar>{idx + 1}</Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText primary={lesson.title} />
    //                 </ListItem>
    //                 <Divider variant="inset" component="li" />
    //               </span>
    //             );
    //           })}
    //       </List>
    //     </Box>
    //   </Card>

    //   <Dialog
    //     open={openDialog}
    //     onClose={() => setOpenDialog(false)}
    //     aria-labelledby="form-dialog-title"
    //   >
    //     <DialogTitle id="form-dialog-title">Publish Course</DialogTitle>
    //     <DialogContent>
    //       <Typography variant="body1">
    //        Publish msg here
    //       </Typography>
    //       <Typography variant="body1">
    //         note here
    //       </Typography>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button
    //         color="primary"
    //         onClick={() => setOpenDialog(false)}
    //         variant="contained"
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         color="primary"
    //         variant="contained"
    //       >
    //         Publish
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </Box>
  );
};

export default Course;
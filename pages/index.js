import Head from "next/head";
import {useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Header from "@components/Header";
import dbConnect from "@utils/db"


const classroomImg = "/images/classroom.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  media: {
    minHeight: 400,
  },

  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Home = (props) => {
  const classes = useStyles();


    useEffect(() => {
      if (!props.data.success){
        throw Error("DB connect error!")
      }
    }, [])


  return (
    <>
      <Head>
        <title> LA CLASSE </title> <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Card className={classes.card}>
        <Typography className={classes.title} variant="h6">
          Home Page{" "}
        </Typography>
        <CardMedia
          className={classes.media}
          title="classroom"
          image={classroomImg}
        />
        <CardContent>
          <Typography variant="body1" component="p">
            Welcome to LA CLASSE{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </Card>
    </>
  );
};

export default Home;


export const getStaticProps = async (ctx) => {
  const db = await dbConnect()
  
  return {
    props:{
      data: {
        success: db.isConnected == 1 ? true :  false
      }
    }
  }
}
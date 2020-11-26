import axios from "axios";
import { domain, coursePath } from "./utils";
import auth from "@api/auth"


const createCourse = async (data, id = "") => {
  const token = auth.isAuthenticated();
  try {
    const res = await axios.post(
      `${domain}/${coursePath}/${id}`,
      data
      // {
      // course: data
      // }, {
      //   headers: {
      //     "x-auth-token": token
      //   }
      // }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export { createCourse };

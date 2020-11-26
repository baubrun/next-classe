import auth from "@api/auth"

const readUser = async (id) => {
  const token = auth.isAuthenticated();
  try {
      let req = await fetch(
          `/api/users/${id}`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          })
      const res = await req.text()
      return JSON.parse(res)
  } catch (error) {
      return {
          error: error.message
      };
  }
}


const signIn = async (data) => {
  try {
    const req = await fetch("api/auth/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data),
    });
    const res = await req.text();
    return JSON.parse(res);
  } catch (error) {
    return {
      error: error.message
    };
  }
};

const updateUser = async (data, id) => {
  const token = isAuthenticated();
  // try {
  //   const res = await axios.patch(
  //     `${domain}/${path}/${id}`, {
  //       user: data,
  //     }, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   return res.data;
  // } catch (error) {
  //   return {
  //     error: error.response.data.error
  //   };
  // }
  try {
    const req = await fetch(`api/user/${id}`, {
      method: "PATCH",
      headers: {
        // "Accept": "application/json",
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify(data),
    });
    const res = await req.text();
    return JSON.parse(res);
  } catch (error) {
    return {
      error: error.message
    };
  }

};



export default {
  signIn,
  readUser,
  updateUser,
}
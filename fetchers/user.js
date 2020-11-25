const signIn = async (data) => {
    try {
      const req = await fetch("api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await req.text();
      return JSON.parse(res);
    } catch (error) {
      return { error: error.message };
    }
  };



  export default {
    signIn,
  }


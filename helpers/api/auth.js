const deleteToken = () => {
  localStorage.removeItem("jwt")
};


const isAuthenticated = () => {
  if (typeof window == "undefined")
    return false

  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"))
  else
    return false
};


const setToken = (jwt, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  cb();
};





export default {
  deleteToken,
  isAuthenticated,
  setToken,
};
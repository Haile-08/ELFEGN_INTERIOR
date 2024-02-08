import axiosBaseURL from "../config/axios";

//taken
export const logout = async () => {
  const auth = await axiosBaseURL
    .get("/v1/auth/logout")
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData);
    })
    .catch(function (err) {
      console.log(err);
    });
  return auth;
};

//taken
export const signupUser = async (user: object) => {
  const userdata = await axiosBaseURL
    .post("/v1/auth/signup", user)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return userdata;
};

//taken
export const loginUser = async (user: object) => {
  const data = await axiosBaseURL
    .post("/v1/auth/login", user, { withCredentials: true })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

    return data;
};

//taken
export const requestReset = async (email: string) => {
  await axiosBaseURL
    .post("/v1/auth/requestResetPassword", { email })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

//taken
export const reset = async (user: object) => {
  await axiosBaseURL
    .post("/v1/auth/resetPassword", user)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

import axiosBaseURL from "../config/axios";

//taken
export const postUserImage = async ({ data, token }: any) => {
  const user = await axiosBaseURL
    .post("/v1/user/upload", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.user;
    })
    .catch(function (err) {
      console.log(err);
    });

  return user;
};

//taken
export const postUserUpdate = async ({ data, token }: any) => {
  console.log(data)
  const user = await axiosBaseURL
    /*@ts-ignore */
    .put(`/v1/user/update/${data.id}`, data.info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.user;
    })
    .catch(function (err) {
      console.log(err);
    });

  return user;
};

//taken
export const getUser = async (id: string | null) => {
  const user = await axiosBaseURL
    .get(`/v1/user/get/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data.user;
    })
    .catch(function (err) {
      console.log(err);
    });
  return user;
};

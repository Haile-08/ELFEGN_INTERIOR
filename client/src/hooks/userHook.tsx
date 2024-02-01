import axiosBaseURL from "../config/axios";

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

export const posSellertUserImage = async ({ data, token }: any) => {
  const user = await axiosBaseURL
    .post("/v1/user/upload/seller", data, {
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

export const postUserUpdate = async ({ data, token }: any) => {
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

export const postSellerUserUpdate = async ({ data, token }: any) => {
  const user = await axiosBaseURL
    /*@ts-ignore */
    .put(`/v1/user/update/seller/${data.id}`, data.info, {
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

export const getChatSenderImage = async (id: string) => {
  console.log(id);
  console.log("get sender image");
  const image = await axiosBaseURL
    .get(`/v1/chat/image/${id}`)
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
  return image;
};

export const getChatReceiverImage = async (id: string) => {
  console.log(id);
  console.log("get reciver image");
  const image = await axiosBaseURL
    .get(`/v1/chat/image/${id}`)
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
  return image;
};

export const setUserType = async (data: object) => {
  const user = await axiosBaseURL
    .post("/v1/user/user/type", data)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return user;
};

export const getuserinfo = async (id: any) => {
  console.log(id);
  const data = await axiosBaseURL
    .get(`/v1/auth/user/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data.auser;
    })
    .catch(function (err) {
      console.log(err);
    });
  console.log(data);
  return data;
};
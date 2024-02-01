import axiosBaseURL from "../config/axios";

export const retrieveBankList = async () => {
  const banks = await axiosBaseURL
    .get("/v1/withdraw/banklist")
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log("response");
      console.log(resData.data.bank);
      return resData.data.bank;
    })
    .catch(function (err) {
      console.log(err);
    });

  return banks;
};

export const requestWithdraw = async ({ data, token }: any) => {
  console.log(data);
  const banks = await axiosBaseURL
    .post(`/v1/withdraw/requestwithdraw`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return banks;
};

export const getWithdrawRequests = async ({ id, token }: any) => {
  const requests = await axiosBaseURL
    .get(`/v1/withdraw/requestlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.request;
    })
    .catch(function (err) {
      console.log(err);
    });

  return requests;
};

export const acceptWithdraw = async ({ data, token }: any) => {
  const status = await axiosBaseURL
    .post(`/v1/withdraw/accept`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return status;
};

export const verifyWithdraw = async (data: object) => {
  const status = await axiosBaseURL
    .post(`/v1/withdraw/verify`, data)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return status;
};

export const getUserBalance = async ({ id, token }: any) => {
  console.log("user balance");
  const balance = await axiosBaseURL
    .get(`/v1/withdraw/balance/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data);
      return resData.data.balance;
    })
    .catch(function (err) {
      console.log(err);
    });

  return balance;
};
import axiosBaseURL from "../config/axios";

//taken
export const Order = async (data: object) => {
  const order = await axiosBaseURL
    .post(`/v1/order/create`, data)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return order;
};

//taken
export const getOrder = async () => {
  const order = await axiosBaseURL
    .get(`/v1/order/get`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.order;
    })
    .catch(function (err) {
      console.log(err);
    });

  return order;
};

//taken
export const getOrderPaginate = async ({page, id, token}: any) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/order/getpagenated/?page=${page}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  return order;
};



//taken
export const verifyPayment = async ({tx_ref}: any) => {
  const order = await axiosBaseURL
    .post(`/v1/order/verify`, {tx_ref})
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log("order data", resData.data)
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return order;
};

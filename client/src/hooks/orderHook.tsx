import axiosBaseURL from "../config/axios";

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

export const getOrderPaginate = async (data: object) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/order/getpagenated/?page=${data?.page}&id=${data?.id}`)
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

export const getPendingOrderPaginate = async (data: object) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/order/getpendingpagenated/?page=${data?.page}`)
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

export const getDeliveredOrderPaginate = async (data: object) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/order/getdeliveredpagenated/?page=${data?.page}`)
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

export const verifyPayment = async (data: object) => {
  console.log(data);
  const order = await axiosBaseURL
    .post(`/v1/order/verify`, data)
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

export const ApproveDelivery = async (id: string) => {
  const order = await axiosBaseURL
    .get(`/v1/order/deliver/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data)
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return order;
};
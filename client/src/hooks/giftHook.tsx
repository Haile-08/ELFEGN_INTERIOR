import axiosBaseURL from "../config/axios";

export const postGift = async ({ data, token }: any) => {
  const gift = await axiosBaseURL
    .post(`/v1/gift/post`, data, {
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

  return gift;
};

export const updateGiftRating = async ({ data, token }: any) => {
  const rating = await axiosBaseURL
    .post(`/v1/gift/rating`, data, {
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

  return rating;
};

export const getGifts = async (page: number) => {
  const gift = await axiosBaseURL
    .get(`/v1/gift/get/?page=${page}`)
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
  return gift;
};

export const getAllGifts = async () => {
  const gift = await axiosBaseURL
    .get(`/v1/gift/get/all`)
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
  return gift;
};

export const getAGift = async (id: string) => {
  const gift = await axiosBaseURL
    .get(`/v1/gift/get/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.gift;
    })
    .catch(function (err) {
      console.log(err);
    });

  return gift;
};

export const deleteGift = async ({ id, token }: any) => {
  const order = await axiosBaseURL
    .delete(`/v1/gift/delete/${id}`, {
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
  return order;
};
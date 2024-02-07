import axiosBaseURL from "../config/axios";

export const getAllProduct = async () => {
    const product = await axiosBaseURL
      .get(`/v1/product/get`)
      .then(function (res) {
        return res;
      })
      .then(function (resData) {
        console.log("all product",resData.data.product);
        return resData.data.product;
      })
      .catch(function (err) {
        console.log(err);
      });
    return product;
};

export const getAProduct = async (id: string) => {
  const product = await axiosBaseURL
    .get(`/v1/product/get/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log("a product", resData.data.product)
      return resData.data.product;
    })
    .catch(function (err) {
      console.log(err);
    });

  return product;
};

export const updateProductRating = async ({ data, token }: any) => {
  const rating = await axiosBaseURL
    .post(`/v1/product/rating`, data /*,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }*/)
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
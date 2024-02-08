import axiosBaseURL from "../config/axios";


//Taken
export const loginAdmin = async (user: object) => {
  const data = await axiosBaseURL
    .post("/v1/admin/auth/login", user, { withCredentials: true })
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
export const postAProduct = async ({ data, token }: any) => {
  console.log(token);
  console.log(data)
  const gift = await axiosBaseURL
    .post(`/v1/admin/product/post`, data, {
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

//taken
export const retrieveProducts = async ({page, token}: any) => {
  const product = await axiosBaseURL
    .get(`/v1/admin/products?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data.blog);
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return product;
};


//taken
export const removeAProduct = async ({ id, token }: any) => {
  const product = await axiosBaseURL
    .delete(`/v1/admin/delete/${id}`, {
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
  return product;
};

// taken
export const postBlog = async ({ data, token }: any) => {
  const blog = await axiosBaseURL
    .post(`/v1/admin/blog/post`, data, {
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

  return blog;
};

//taken
export const retrieveAdminBlogs = async (token: string, page: number) => {
  const blog = await axiosBaseURL
    .get(`/v1/admin/blog/get?page=${page}`, {
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
  return blog;
};

//taken
export const removeABlog = async ({ id, token }: any) => {
  const blog = await axiosBaseURL
    .delete(`/v1/admin/blog/delete/${id}`, {
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

  return blog;
};

//taken
export const retrieveAnAdminComment = async ({ id, token }: any) => {
  const blog = await axiosBaseURL
    .get(`/v1/admin/blog/get/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.comment;
    })
    .catch(function (err) {
      console.log(err);
    });
  return blog;
};

//taken
export const deleteComment = async ({ id, token }: any) => {
  const comment = await axiosBaseURL
    .delete(`/v1/admin/blog/delete/comment/${id}`, {
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
  return comment;
};

//taken
export const getAllCount = async (token: string) => {
  const count = await axiosBaseURL
    .get(`/v1/admin/count`, {
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
  return count;
};


//taken
export const verifyPayment = async ({tx_ref}: any) => {
  const order = await axiosBaseURL
    .post(`/v1/admin/verify`, {tx_ref})
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


//taken
export const getDeliveredOrderPaginate = async ({ page, token }: any) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/admin/getdeliveredpagenated/?page=${page}`, {
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
export const ApproveDelivery = async ({id,token}:any) => {
  const order = await axiosBaseURL
    .get(`/v1/admin/deliver/${id}` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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


//taken
export const getPendingOrderPaginate = async ({page, token}:any) => {
  const order = await axiosBaseURL
    /*@ts-ignore */
    .get(`/v1/admin/getpendingpagenated/?page=${page}`,{
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
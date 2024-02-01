import axiosBaseURL from "../config/axios";


//Auth
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


//product
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

export const retrieveProducts = async (page: number) => {
  const product = await axiosBaseURL
    .get(`/v1/admin/products?page=${page}`)
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

// blog
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

//Orders

export const getAllGifts = async (token: string) => {
  const gift = await axiosBaseURL
    .get(`/v1/admin/gift/get/all`, {
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

export const removeAGift = async ({ id, token }: any) => {
  const gift = await axiosBaseURL
    .delete(`/v1/admin/gift/delete/${id}`, {
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

export const getAllOrders = async (token: string) => {
  const order = await axiosBaseURL
    .get(`/v1/admin/order/get/all`, {
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

export const removeAOrder = async ({ id, token }: any) => {
  const order = await axiosBaseURL
    .delete(`/v1/admin/order/delete/${id}`, {
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

export const getAllWithdraw = async (token: string) => {
  const order = await axiosBaseURL
    .get(`/v1/admin/withdraw/get/all`, {
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

export const ApproveWithdraw = async ({ data, token }: any) => {
  const approve = await axiosBaseURL
    .post(`/v1/admin/withdraw/approve`, data, {
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

  return approve;
};

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


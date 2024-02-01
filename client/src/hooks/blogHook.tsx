import axiosBaseURL from "../config/axios";

export const retrieveBlogs = async (page: number) => {
  const blog = await axiosBaseURL
    .get(`/v1/blog/posts/?page=${page}`)
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

  console.log(blog);
  return blog;
};

export const retrieveABlog = async (id: string) => {
  const blog = await axiosBaseURL
    .get(`/v1/blog/post/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.blog;
    })
    .catch(function (err) {
      console.log(err);
    });

  console.log(blog);
  return blog;
};

export const postComment = async (data: object) => {
  console.log();
  await axiosBaseURL
    .post(`/v1/blog/comment`, data)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

export const retrieveAComment = async (id: string) => {
  console.log(id);
  const blog = await axiosBaseURL
    .get(`/v1/blog/comment/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.comment;
    })
    .catch(function (err) {
      console.log(err);
    });
  console.log(blog);
  return blog;
};
export const removeAComment = async (id: string) => {
  const blog = await axiosBaseURL
    .delete(`/v1/blog/comment/${id}`)
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
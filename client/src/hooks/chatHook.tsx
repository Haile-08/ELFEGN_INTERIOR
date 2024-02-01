import axiosBaseURL from "../config/axios";

export const retrieveRooms = async () => {
  const room = await axiosBaseURL
    .get("/v1/chat/rooms")
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      console.log(resData.data.blog);
      return resData.data.room;
    })
    .catch(function (err) {
      console.log(err);
    });

  return room;
};


export const getMessages = async (id: any) => {
  const message = await axiosBaseURL
    .get(`/v1/chat/message/${id}`)
    .then(function (res) {
      return res;
    })
    .then(function (resData) {
      return resData.data.messages;
    })
    .catch(function (err) {
      console.log(err);
    });

  return message;
};
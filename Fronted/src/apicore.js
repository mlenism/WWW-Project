import axios from 'axios';

export const addUsuario = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/usuarios`, data)
    .then((res) => {
      console.log(data);
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

export const getUsuario = (id) =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/usuarios/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const getUsuarios = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/usuarios`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

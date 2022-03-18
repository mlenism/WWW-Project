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

export const addPublicidad = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/publicidad`, data)
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

export const login = (credentials) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/login`, credentials)
    .then((res) => {
      console.log(credentials);
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

export const getTurnos = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/turno`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const addTurno = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/turno`, data)
    .then((res) => {
      console.log(data);
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

export const asignarTurno = (data) =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/turno/${data}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(data);
      console.log(err);
      return err.response;
    });

export const getCajas = () =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/caja`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const confirmarTurno = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/confirmarturno`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(data);

      console.log(err);
      return err.response;
    });

export const saltarTurno = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/saltarturno`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err.response;
      });

export const addPersona = (data) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/persona`, data)
    .then((res) => {
      console.log(data);
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

export const getPersona = (cc) =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/persona/${cc}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

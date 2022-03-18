import axios from 'axios';

const API = 'https://bankticketmanagerb.herokuapp.com';

export const addUsuario = (data) =>
  axios
    .post(`${API}/usuarios`, data)
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
    .post(`${API}/publicidad`, data)
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
    .get(`${API}/usuarios/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const getUsuarios = () =>
  axios
    .get(`${API}/usuarios`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const login = (credentials) =>
  axios
    .post(`${API}/login`, credentials)
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
    .get(`${API}/turno`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const addTurno = (data) =>
  axios
    .post(`${API}/turno`, data)
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
    .get(`${API}/turno/${data}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(data);
      console.log(err);
      return err.response;
    });

export const getCajas = () =>
  axios
    .get(`${API}/caja`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const confirmarTurno = (data) =>
  axios
    .post(`${API}/confirmarturno`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(data);

      console.log(err);
      return err.response;
    });

export const saltarTurno = (data) =>
  axios
    .post(`${API}/saltarturno`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err.response;
    });

export const addPersona = (data) =>
  axios
    .post(`${API}/persona`, data)
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
    .get(`${API}/persona/${cc}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

export const getEstadisticas = () =>
  axios
    .get(`${API}/estadisticas`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

import { getRequest, postRequest, putRequest } from "../fetchHandler";

const createNewSign = (body) =>
  postRequest(`http://localhost:3001/api/docs/create`, body);

const sendForSign = (data) =>
  postRequest(`http://localhost:3001/api/docs/send/${data.id}`, data.body);

const sign = (body) => putRequest(`http://localhost:3001/api/docs/sign`, body);

const requestCreatedSign = (id) =>
  getRequest(`http://localhost:3001/api/docs/created/${id}`);

const requestSignForMe = (id) =>
  getRequest(`http://localhost:3001/api/docs/forsign/${id}`);

export const SignService = {
  createNewSign,
  sendForSign,
  sign,
  requestCreatedSign,
  requestSignForMe,
};

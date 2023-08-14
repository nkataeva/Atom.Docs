import { getRequest, postRequest, putRequest } from "../fetchHandler";

const createNewSign = (body) =>
  postRequest(`http://localhost:3001/api/docs/create`, body);

const sendForSign = (data) =>
  postRequest(`http://localhost:3001/api/docs/send/${data.id}`, data.body);

const sign = (body, id) => putRequest(`http://localhost:3001/api/docs/sign/${id}`, body);

const reject = (body, id) => putRequest(`http://localhost:3001/api/docs/decline/${id}`, body)

const requestCreatedSign = (id) =>
  getRequest(`http://localhost:3001/api/docs/created/${id}`);

const requestSignForMe = (id) =>
  getRequest(`http://localhost:3001/api/docs/forsign/${id}`);

const requestSignInfo = (id) =>
  getRequest(`http://localhost:3001/api/docs/get/${id}`);

export const SignService = {
  createNewSign,
  sendForSign,
  sign,
  reject,
  requestCreatedSign,
  requestSignForMe,
  requestSignInfo,
};

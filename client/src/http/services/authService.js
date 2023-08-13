import { getRequest, postRequest } from "../fetchHandler";

const requestLogin = (body) =>
  postRequest(`http://localhost:3001/api/auth/login`, body);

const registerUser = (body) =>
  postRequest(`http://localhost:3001/api/users/register`, body);

const requestUser = () => getRequest(`http://localhost:3001/api/users/logon`);

const requestAllUser = () => getRequest(`http://localhost:3001/api/users/all`);

const requestLogout = () => getRequest(`http://localhost:3001/api/auth/logout`);

export const AuthService = {
  requestLogin,
  registerUser,
  requestUser,
  requestAllUser,
  requestLogout,
};

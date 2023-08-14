import { makeObservable, action, observable, runInAction } from "mobx";
import { AuthService } from "../http/services/authService";

class User {
  user = null;
  isUserAuth = false;
  users = [];
  loading = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      isUserAuth: observable,
      users: observable,
      loading: observable,
      createUser: action,
      logOut: action,
      authUser: action,
      getAuthUser: action,
      getAllUser: action,
      setAuthUser: action,
    });
  }

  setAuthUser = () => {
    this.isUserAuth = true;
  };

  createUser = async (user) => {
    try {
      await AuthService.registerUser(user);
      runInAction(() => {
        this.isUserAuth = true;
      });
    } catch (error) {
      console.log(error, "Ошибка создания пользователя");
    }
  };

  authUser = async (user) => {
    try {
      await AuthService.requestLogin(user);
      runInAction(() => {
        this.isUserAuth = true;
      });
    } catch (error) {
      console.log(error, "Ошибка авторизации");
    }
  };

  getAuthUser = async () => {
    try {
      const user = await AuthService.requestUser();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error, "Ошибка загрузки данных пользователя");
    }
  };

  getAllUser = async () => {
    try {
      this.loading = true;
      const users = await AuthService.requestAllUser();
      runInAction(() => {
        this.users = users.users;
      });
    } catch (error) {
      console.error(error, "Ошибка получения пользователя");
    }
  };

  logOut = async () => {
    try {
      await AuthService.requestLogout();
      runInAction(() => {
        this.user = null;
        this.isUserAuth = false;
      });
    } catch (error) {
      console.error(error, "Ошибка выхода из учётной записи");
    }
  };
}

const userStore = new User();

export default userStore;

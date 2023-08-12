import { makeObservable, action, observable, computed } from "mobx";

class User {
  user = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      fetchUser: action,
      getUser: computed,
      createUser: action,
      deleteUser: action,
    });
  }

  fetchUser = async () => {
    try {
      const response = await fetch("/api/users/all");

      if (response.ok) {
        const data = await response.json();
        this.user = data;
        console.log(data);
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error("Ошибка получения пользователя:", error);
    }
  };

  get getUser() {
    return this.user;
  }

  createUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        this.user = user;
        console.log(response);
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error("Ошибка создания пользователя:", error);
    }
  };

  deleteUser() {
    this.user = null;
  }
}

export default User;

import React, { useEffect, useState } from "react";
import styles from "./sign-in.module.scss";
import userStore from "../../stores/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { APPRoute } from "../../const";
import { observer } from "mobx-react-lite";

const SignIn = () => {
  const { isUserAuth, authUser } = userStore;
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuth) {
      localStorage.setItem("userAuth", "true");
      navigate(APPRoute.MAIN);
    }
  }, [isUserAuth, navigate]);

  const handleInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    authUser(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.header}>Авторизация</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="login"
          placeholder="Введите логин"
          required
          onChange={handleInputChange}
          value={formData.login}
        />
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          required
          onChange={handleInputChange}
          value={formData.password}
        />
      </div>
      <div className={styles.btnContainer}>
        <button type="submit">Войти</button>
        <Link to={APPRoute.REGISTRATION}>
          <button type="button">Регистрация</button>
        </Link>
      </div>
    </form>
  );
};

export default observer(SignIn);

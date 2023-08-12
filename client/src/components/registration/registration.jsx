import React, { useEffect, useState } from "react";
import styles from "./registration.module.scss";
import { useNavigate } from "react-router-dom";
import { APPRoute } from "../../const";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

const Registration = () => {
  const { createUser, isUserAuth } = userStore;
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    fio: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuth) {
      navigate(APPRoute.MAIN);
    }
  }, [isUserAuth, navigate]);

  const handleInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    createUser(formData); //добавление польз в стор
    localStorage.setItem("userAuth", "true");
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.header}>Регистрация</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          required
          onChange={handleInputChange}
          value={formData.login}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          onChange={handleInputChange}
          value={formData.password}
        />
        <input
          type="text"
          name="fio"
          placeholder="ФИО"
          required
          onChange={handleInputChange}
          value={formData.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Почта"
          required
          onChange={handleInputChange}
          value={formData.email}
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
};

export default observer(Registration);

import React from "react";
import styles from "./sign-in.module.scss";
import withLayout from "../../hocs/with-layout";

const SignIn = () => {
    return (
        <form className={styles.form}>
            <div className={styles.header}>Авторизация</div>
            <input type="text" placeholder="Введите логин" required/>
            <input type="password" placeholder="Введите пароль" required/>
            <button type="submit" >Войти</button>
        </form>
    )
}

export default withLayout(SignIn);
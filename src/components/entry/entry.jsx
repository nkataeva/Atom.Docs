import React from "react";
import {Link} from "react-router-dom";
import styles from "./entry.module.scss";
import { APPRoute } from "../../const";
import withLayout from "../../hocs/with-layout";

const Entry = () => {
    return (
        <div className={styles.form}>
            <Link to={APPRoute.REGISTRATION}>
                <button type="button">Регистрация</button>
            </Link>
            <Link to={APPRoute.SIGN_IN}>
                <button type="button">Авторизация</button>
            </Link>
        </div>
    )
}

export default withLayout(Entry);